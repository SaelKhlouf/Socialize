using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace API.Authentication
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public CurrentUser GetCurrentUser()
        {
            var claimsPrincipal = _httpContextAccessor.HttpContext.User;
            var email = claimsPrincipal.FindFirst(p => p.Type.Equals(ClaimTypes.Email)).Value;
            var id = claimsPrincipal.FindFirst(p => p.Type.Equals(ClaimTypes.NameIdentifier)).Value;
            var name = claimsPrincipal.FindFirst(p => p.Type.Equals(ClaimTypes.Name)).Value;

            return new CurrentUser
            {
                Email = email,
                Id = id,
                UserName = name
            };
        }
    }
}
