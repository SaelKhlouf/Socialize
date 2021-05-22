using Domain;
using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Activities;
using Domain.Core;

namespace Application.Services
{
    public class ActivitiesService
    {
        private readonly ActivitiesRepository _activitiesRepository;
        private readonly IMapper _mapper;

        public ActivitiesService(ActivitiesRepository activitiesRepository, IMapper mapper)
        {
            _activitiesRepository = activitiesRepository;
            _mapper = mapper;
        }

        public async Task<DataList<Activity>> ListAsync(PagingParams pagingParams)
        {
            int skip = 0, take = int.MaxValue;
            if (pagingParams.Skip > 0)
            {
                skip = pagingParams.Skip.Value;
            }
            if (pagingParams.Take > 0)
            {
                take = pagingParams.Take.Value;
            }

            return await _activitiesRepository.GetAsync(skip, take);
        }

        public async Task<Activity> GetByIdAsync(Guid id)
        {
            return await _activitiesRepository.GetByIdAsync(id);
        }

        public async Task<Activity> PostAsync(ActivityRequest activityRequest)
        {
            Activity activity = _mapper.Map<Activity>(activityRequest);
            return await _activitiesRepository.PostAsync(activity);
        }

        public async Task DeleteAsync(Guid id)
        {
            Activity activity = await _activitiesRepository.GetByIdAsync(id);
            await _activitiesRepository.DeleteAsync(activity);
        }
    }
}
