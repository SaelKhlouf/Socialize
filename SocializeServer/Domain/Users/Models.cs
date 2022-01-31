using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    public class UserLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }

    public class UserRegisterRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Password { get; set; }
    }

    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Thumbnail { get; set; }
    }

    public class UserDetailsDto : UserDto
    {
        public IEnumerable<string> Photos { get; set; }
    }

    public class UserDetails : AppUser
    {
        public IEnumerable<string> Photos { get; set; }
    }

    public class CurrentUser
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
    }

    public class SelectMainImageRequest
    {
        public string ImageName { get; set; }
    }
}
