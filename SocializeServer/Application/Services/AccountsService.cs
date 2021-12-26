using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Core;
using Domain.Core.UserAccessor;
using Domain.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    public class AccountsService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly Config _config;
        private readonly IUserAccessor _userAccessor;

        public AccountsService(IMapper mapper, Config config, IUserAccessor userAccessor, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
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
                DisplayName = userRegisterRequest.Displayname,
            };
            var result = await _userManager.CreateAsync(user, userRegisterRequest.Password);

            if (!result.Succeeded)
            {
                throw new Exception("Errors while creating user: " + result.Errors);
            }
            return user;
        }

        public async Task<AppUser> SelectMainImageAsync(SelectMainImageRequest selectMainImageRequest)
        {
            var userId = _userAccessor.GetCurrentUser().Id;
            var user = await _userManager.Users.FirstOrDefaultAsync(p => p.Id == userId);

            var imageName = selectMainImageRequest.ImageName;
            var region = _config.AWS.S3.Region;
            var bucketName = _config.AWS.S3.BucketName;
            var photosPath = _config.AWS.S3.UsersPhotosPath;

            user.MainImageUrl = @$"https://{bucketName}.s3.{region}.amazonaws.com/{photosPath}/{userId}/{imageName}";

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                throw new Exception(@$"Errors while updating user {userId}: " + result.Errors);
            }
            return user;
        }
    }
}