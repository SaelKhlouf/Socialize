using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Activities;
using Domain.ActivityAttendee;
using Domain.Users;
using Microsoft.AspNetCore.Identity;

namespace Persistence.Seeds
{
    public class Seed
    {
        public static async Task SeedData(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            //Users
            var users = new List<AppUser>
            {
                new AppUser
                {
                    Id = new Guid("6b63030d-4b9c-4e03-b625-dc0ac446a444"),
                    UserName = "SaelK",
                    DisplayName = "Sael Khlouf",
                    Bio = "Computer Engineer",
                    Email = "sael.khlouf@gmail.com"
                },
                new AppUser
                {
                    Id = new Guid("2d3db3f3-71c9-4da7-92c0-cf79212ebf14"),
                    UserName = "Ahmad55",
                    DisplayName = "Ahmad Bro",
                    Bio = "Lawyer",
                    Email = "ahmad@gmail.com"
                }
            };

            if (!context.Users.Any())
            {
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd!");
                }
                await context.SaveChangesAsync();
            }

            //Activities
            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Past Activity 1",
                    Date = DateTime.Now.AddMonths(-2),
                    Description = "Activity 2 months ago",
                    Category = "drinks",
                    City = "London",
                    Venue = "Pub",
                    CreatedAt = DateTime.Now,
                    HostId = users[0].Id,
                    Status = Enums.ActivityState.Active,
                    ActivityAttendees = new List<ActivityAttendee>()
                    {
                        new ActivityAttendee()
                        {
                            AppUserId = users[0].Id
                        },
                        new ActivityAttendee()
                        {
                            AppUserId = users[1].Id
                        },
                    }
                },
                new Activity
                {
                    Title = "Past Activity 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "culture",
                    City = "Paris",
                    Venue = "Louvre",
                    CreatedAt = DateTime.Now,
                    HostId = users[0].Id,
                    Status = Enums.ActivityState.Active,
                    ActivityAttendees = new List<ActivityAttendee>()
                    {
                        new ActivityAttendee()
                        {
                            AppUserId = users[0].Id
                        },
                        new ActivityAttendee()
                        {
                            AppUserId = users[1].Id
                        },
                    }
                }
            };

            if (!context.Activities.Any())
            {
                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }


        }
    }
}
