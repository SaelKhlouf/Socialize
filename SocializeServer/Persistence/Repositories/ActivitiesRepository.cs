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

            var count = await query
                .AsNoTracking()
                .CountAsync();

            var data = await query.AsNoTracking()
                .Skip(skip)
                .Take(take)
                .OrderBy(p => p.Title)
                .ToListAsync();

            return new DataList<Activity>
            {
                Count = count,
                Data = data
            };
        }

        public async Task<Activity> GetByIdAsync(Guid id)
        {
            return await _context
                .Activities
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id.Equals(id));
        }
    }
}
