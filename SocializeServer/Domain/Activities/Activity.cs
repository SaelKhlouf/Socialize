using System;
using System.Collections.Generic;
using Domain.Core;
using Domain.Users;

namespace Domain.Activities
{
    public class Activity : BaseEntity
    {
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public ICollection<AppUser> Users { get; set; }
        public List<ActivityAttendee.ActivityAttendee> ActivityAttendees { get; set; }
    }
}
