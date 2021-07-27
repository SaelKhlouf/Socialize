using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    public class UserRegisterRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Displayname { get; set; }
        public string Password { get; set; }
    }
}
