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
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Activity>()
                .HasMany(p => p.Users)
                .WithMany(p => p.Activities)
                .UsingEntity<ActivityAttendee>(
                    p => p
                    .HasOne(a => a.User)
                    .WithMany(a => a.ActivityAttendees)
                    .HasForeignKey(a => a.AppUserId),

                    p => p
                    .HasOne(a => a.Activity)
                    .WithMany(a => a.ActivityAttendees)
                    .HasForeignKey(a => a.ActivityId),

                    p =>
                    {
                        p.HasKey(a => new { a.ActivityId, a.AppUserId });
                    }
                );

            modelBuilder.Entity<ActivityAttendee>()
                .HasKey(p => new { p.ActivityId, p.AppUserId });

            modelBuilder.Entity<ActivityAttendee>()
                .HasOne(p => p.User)
                .WithMany(p => p.ActivityAttendees)
                .HasForeignKey(p => p.AppUserId);

            modelBuilder.Entity<ActivityAttendee>()
                .HasOne(p => p.Activity)
                .WithMany(p => p.ActivityAttendees)
                .HasForeignKey(p => p.ActivityId);
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }
    }
}
