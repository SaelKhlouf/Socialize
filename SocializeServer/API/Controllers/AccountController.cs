using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Authentication;
using AutoMapper;
using Domain.Core.PhotoAccessor;
using Domain.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly TokenService _tokenService;
        private readonly IPhotoAccessor _photoAccessor;

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, TokenService tokenService, IPhotoAccessor photoAccessor)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _photoAccessor = photoAccessor;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LoginDto), StatusCodes.Status200OK)]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginRequest userLoginRequest)
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

            var token = _tokenService.CreateToken(user);

            var loginDto = _mapper.Map<LoginDto>(user);
            loginDto.Token = token;
            return Ok(loginDto);
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status201Created)]
        [Route("register")]
        public async Task<IActionResult> Register(UserRegisterRequest userRegisterRequest)
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
            return Created("", _mapper.Map<UserDto>(user));
        }
    }
}