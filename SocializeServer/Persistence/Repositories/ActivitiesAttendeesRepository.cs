using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.ActivityAttendee;

namespace Persistence.Repositories
{

    public class ActivitiesAttendeesRepository : BaseRepository<ActivityAttendee>
    {
        public ActivitiesAttendeesRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}