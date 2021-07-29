using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Activities;
using Microsoft.AspNetCore.Identity;

namespace Domain.Users
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public ICollection<Activity> Activities { get; set; }
        public List<ActivityAttendee.ActivityAttendee> ActivityAttendees { get; set; }
    }
}
