using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Services;
using AutoMapper;
using Domain.Core.PhotoAccessor;
using Domain.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly AccountsService _accountsService;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly TokenService _tokenService;
        private readonly IPhotoAccessor _photoAccessor;

        public AccountsController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, TokenService tokenService, IPhotoAccessor photoAccessor, AccountsService accountsService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _tokenService = tokenService;
            _photoAccessor = photoAccessor;
            _accountsService = accountsService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LoginDto), StatusCodes.Status200OK)]
        [Route("login")]
        public async Task<IActionResult> LoginAsync(UserLoginRequest userLoginRequest)
        {
            var user = await _accountsService.LoginAsync(userLoginRequest);
            return Ok(_mapper.Map<LoginDto>(user));
        }

        [HttpPost]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status201Created)]
        [Route("register")]
        public async Task<IActionResult> RegisterAsync(UserRegisterRequest userRegisterRequest)
        {
            var user = await _accountsService.RegisterAsync(userRegisterRequest);
            return Created("", _mapper.Map<UserDto>(user));
        }

        [HttpPut]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [Route("thumbnail")]
        [Authorize]
        public async Task<IActionResult> SelectMainImageAsync(SelectMainImageRequest selectMainImageRequest)
        {
            var user = await _accountsService.SelectMainImageAsync(selectMainImageRequest);
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpGet]
        [ProducesResponseType(typeof(UserDetailsDto), StatusCodes.Status200OK)]
        [Route("{id}/details")]
        [Authorize]
        public async Task<IActionResult> GetUserDetailsAsync(Guid id)
        {
            var user = await _accountsService.GetUserDetailsAsync(id);
            return Ok(_mapper.Map<UserDetailsDto>(user));
        }

        [HttpGet]
        [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
        [Route("info")]
        [Authorize]
        public async Task<IActionResult> GetUserInfoAsync()
        {
            var user = await _accountsService.GetUserInfoAsync();
            return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Route("photos/{fileName}")]
        [Authorize]
        public async Task<IActionResult> DeleteUserPhotoAsync(string fileName)
        {
            await _accountsService.DeleteUserPhotoAsync(fileName);
            return Ok();
        }
    }
}