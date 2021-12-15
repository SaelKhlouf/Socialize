using System;
using Domain.Users;
using Microsoft.AspNetCore.Http;

namespace Domain.Core.UserAccessor
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
            var claimsPrincipal = _httpContextAccessor?.HttpContext?.User;
            var email = claimsPrincipal?.FindFirst(p => p.Type.Equals("email"))?.Value;
            var id = claimsPrincipal?.FindFirst(p => p.Type.Equals("id"))?.Value;
            var name = claimsPrincipal?.FindFirst(p => p.Type.Equals("userName"))?.Value;

            return new CurrentUser
            {
                Email = email,
                Id = new Guid(id),
                UserName = name
            };
        }
    }
}
