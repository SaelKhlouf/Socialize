using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Activities;
using Microsoft.AspNetCore.Identity;

namespace Domain.Users
{
    public class AppUser : IdentityUser<Guid>
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Token { get; set; }
        public string Thumbnail { get; set; }
        public ICollection<ActivityAttendee.ActivityAttendee> ActivityAttendees { get; set; }
    }
}
