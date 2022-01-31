using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Core;
using Domain.Core.Common;
using Domain.Core.PhotoAccessor;
using Domain.Core.UserAccessor;
using Domain.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class AccountsService
    {
        private readonly IMapper _mapper;
        private readonly Utilities _utilities;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly Config _config;
        private readonly IUserAccessor _userAccessor;
        private readonly IPhotoAccessor _photoAccessor;

        public AccountsService(IMapper mapper, Utilities utilities, Config config, IUserAccessor userAccessor, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService, IPhotoAccessor photoAccessor)
        {
            _mapper = mapper;
            _utilities = utilities;
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _photoAccessor = photoAccessor;
            _config = config;
            _userAccessor = userAccessor;
        }

        public async Task<AppUser> LoginAsync(UserLoginRequest userLoginRequest)
        {
            var user = await _userManager.FindByEmailAsync(userLoginRequest.Email);
            if (user == null)
            {
                throw new BadHttpRequestException("Email not found");
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, userLoginRequest.Password, false);
            if (!signInResult.Succeeded)
            {
                throw new BadHttpRequestException("Wrong password");
            }

            user.Token = _tokenService.CreateToken(user);
            return user;
        }

        public async Task<AppUser> RegisterAsync(UserRegisterRequest userRegisterRequest)
        {
            var userNameExists = await _userManager.Users.AnyAsync(p => p.UserName.ToLower().Equals(userRegisterRequest.Username.ToLower()));
            if (userNameExists)
            {
                throw new BadHttpRequestException("Username is already taken");
            }

            var emailExists = await _userManager.Users.AnyAsync(p => p.Email.ToLower().Equals(userRegisterRequest.Email.ToLower()));
            if (emailExists)
            {
                throw new BadHttpRequestException("Email is already taken");
            }

            var user = new AppUser
            {
                UserName = userRegisterRequest.Username.ToLower(),
                Email = userRegisterRequest.Email.ToLower(),
                DisplayName = userRegisterRequest.DisplayName,
            };
            var result = await _userManager.CreateAsync(user, userRegisterRequest.Password);

            if (!result.Succeeded)
            {
                throw new Exception("Errors while creating user: " + result.Errors);
            }
            return user;
        }

        public async Task<AppUser> GetUserInfoAsync()
        {
            return await _userManager.Users.FirstAsync(p => p.Id == _userAccessor.GetCurrentUser().Id);
        }

        public async Task<AppUser> SelectMainImageAsync(SelectMainImageRequest selectMainImageRequest)
        {
            var userId = _userAccessor.GetCurrentUser().Id;
            var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userId);

            var imageName = selectMainImageRequest.ImageName;
            var photosPath = _config.AWS.S3.UsersPhotosPath;
            var key = $@"{photosPath}/{userId}/{imageName}";
            user.Thumbnail = _utilities.ResolveS3ObjectUrlFromKey(key);

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception(@$"Errors while updating user {userId}: " + result.Errors);
            }
            return user;
        }

        public async Task DeleteUserPhotoAsync(string fileName)
        {
            var currentUser = _userAccessor.GetCurrentUser();
            var key = _utilities.ResolveS3ObjectKeyFromFileName(currentUser.Id, fileName);
            var url = _utilities.ResolveS3ObjectUrlFromKey(key);

            var isThumbnail = await _userManager.Users.AnyAsync(p => p.Id == currentUser.Id && p.Thumbnail == url);
            if (isThumbnail)
            {
                throw new BadHttpRequestException("You cannot delete profile thumbnail");
            }

            await _photoAccessor.DeletePhotoAsync(key);
        }

        public async Task<bool> UserExists(Guid id)
        {
            return await _userManager.Users.AnyAsync(p => p.Id == id);
        }

        public async Task<UserDetails> GetUserDetailsAsync(Guid id)
        {
            var userExists = await this.UserExists(id);
            if (!userExists)
            {
                throw new BadHttpRequestException("User not found");
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == id);
            var userDetails = _mapper.Map<UserDetails>(user);

            string prefix = @$"{_config.AWS.S3.UsersPhotosPath}/{id}";
            var photos = await _photoAccessor.GetUserPhotosByPrefixAsync(prefix);

            userDetails.Photos = photos;
            return userDetails;
        }
    }
}