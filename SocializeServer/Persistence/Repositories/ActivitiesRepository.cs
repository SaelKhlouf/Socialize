using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Activities;
using Domain.Core;

namespace Persistence.Repositories
{
    public class ActivitiesRepository : BaseRepository<Activity>
    {
        public ActivitiesRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<DataList<Activity>> GetAsync(int skip, int take)
        {
            var query = _context.Set<Activity>().AsQueryable();

            query = query
                .Include(p => p.Host)
                .Include(p => p.ActivityAttendees)
                    .ThenInclude(x => x.User);

            var count = await query
                .AsNoTracking()
                .CountAsync();

            var data = await query.AsNoTracking()
                .Skip(skip)
                .Take(take)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();

            return new DataList<Activity>
            {
                Count = count,
                Data = data
            };
        }

        public async Task<Activity> GetByIdAsync(Guid id)
        {
            var query = _context
                .Activities
                .Include(p => p.Host)
                .Include(p => p.ActivityAttendees)
                    .ThenInclude(x => x.User);

            return await query.AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id.Equals(id));
        }

        public async Task<bool> UserAttendsActivity(Guid userId, Guid activityId)
        {
            return await _context
                .Activities
                .AsNoTracking()
                .AnyAsync(p => p.Id == activityId && p.ActivityAttendees.Any(x => x.AppUserId == userId));
        }

        public async Task<bool> IsActivityHostedByUser(Guid userId, Guid activityId)
        {
            return await _context.Activities.AnyAsync(p => p.Id == activityId && p.HostId == userId);
        }

    }
}
