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

        public async Task<Activity> GetByIdAsync(Guid id)
        {
            return await _context
                .Activities
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id.Equals(id));
        }
    }
}
