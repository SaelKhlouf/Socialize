using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        public Guid HostId { get; set; }
        public Enums.ActivityState Status { get; set; }
        public AppUser Host { get; set; }
        public ICollection<ActivityAttendee.ActivityAttendee> ActivityAttendees { get; set; }
    }
}
