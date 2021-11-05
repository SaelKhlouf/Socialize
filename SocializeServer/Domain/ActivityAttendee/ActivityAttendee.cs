using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Activities;
using Domain.Users;

namespace Domain.ActivityAttendee
{
    public class ActivityAttendee
    {
        public string AppUserId { get; set; }
        public AppUser User { get; set; }

        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
    }
}
