using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Authentication;
using AutoMapper;
using Domain.Users;
using Microsoft.AspNetCore.Identity;

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

        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LoginDto), StatusCodes.Status200OK)]
        [Route("login")]
        public async Task<IActionResult> Login(UserLoginRequest userLoginRequest)
        {
            var user = await _userManager.FindByEmailAsync(userLoginRequest.Email);
            if (user == null)
            {
                return Unauthorized();
            }

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, userLoginRequest.Password, false);
            if (!signInResult.Succeeded)
            {
                return Unauthorized();
            }

            var token = _tokenService.CreateToken(user);

            var loginDto = _mapper.Map<LoginDto>(user);
            loginDto.Token = token;
            return Ok(loginDto);
        }
    }
}
