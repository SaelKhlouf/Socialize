using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Activities;
using Domain.ActivityAttendee;
using Domain.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ActivityAttendee>()
                .HasKey(p => new { p.ActivityId, p.AppUserId });

            modelBuilder
                .Entity<ActivityAttendee>()
                .HasOne(p => p.User)
                .WithMany(p => p.ActivityAttendees)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder
                .Entity<ActivityAttendee>()
                .HasOne(p => p.Activity)
                .WithMany(p => p.ActivityAttendees)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Activity>()
                .HasOne(p => p.Host);

        }

        public DbSet<Activity> Activities { get; set; }
    }
}
