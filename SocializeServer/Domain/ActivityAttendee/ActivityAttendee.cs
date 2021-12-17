using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Activities;
using Domain.Core;
using Domain.Users;

namespace Domain.ActivityAttendee
{
    public class ActivityAttendee : TrackingEntity
    {
        public Guid AppUserId { get; set; }
        public AppUser User { get; set; }

        public Guid ActivityId { get; set; }
        public Activity Activity { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
