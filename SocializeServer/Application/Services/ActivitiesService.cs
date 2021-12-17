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
using Domain.ActivityAttendee;
using Domain.Core;
using Domain.Core.UserAccessor;
using Domain.Users;
using Microsoft.AspNetCore.Http;

namespace Application.Services
{
    public class ActivitiesService
    {
        private readonly ActivitiesRepository _activitiesRepository;
        private readonly ActivitiesAttendeesRepository _activitiesAttendeesRepository;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public ActivitiesService(ActivitiesRepository activitiesRepository, ActivitiesAttendeesRepository activitiesAttendeesRepository, IMapper mapper, IUserAccessor userAccessor)
        {
            _activitiesRepository = activitiesRepository;
            _activitiesAttendeesRepository = activitiesAttendeesRepository;
            _mapper = mapper;
            _userAccessor = userAccessor;
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
            Activity activity = await _activitiesRepository.GetByIdAsync(id);
            if (activity == null)
            {
                throw new BadHttpRequestException("Activity not found");
            }
            return activity;
        }

        public async Task<Activity> PostAsync(ActivityRequest activityRequest)
        {
            Activity activity = _mapper.Map<Activity>(activityRequest);
            activity.Status = Enums.ActivityState.Active;

            return await _activitiesRepository.PostAsync(activity);
        }

        public async Task<Activity> UpdateAsync(Guid id, ActivityRequest activityRequest)
        {
            var activity = await GetByIdAsync(id);

            activity.Title = activityRequest.Title;
            activity.Date = activityRequest.Date;
            activity.Description = activityRequest.Description;
            activity.Category = activityRequest.Category;
            activity.City = activityRequest.City;
            activity.Venue = activityRequest.Venue;

            return await _activitiesRepository.UpdateAsync(activity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var activity = await GetByIdAsync(id);
            await _activitiesRepository.DeleteAsync(activity);
        }

        public async Task AttendActivity(Guid id)
        {
            var currentUser = _userAccessor.GetCurrentUser();
            var activity = await GetByIdAsync(id);
            var userAttendsActivity = await _activitiesRepository.UserAttendsActivity(currentUser.Id, id);
            if (userAttendsActivity)
            {
                throw new BadHttpRequestException("You are already attending to this activity");
            }

            activity.ActivityAttendees.Add(new ActivityAttendee()
            {
                AppUserId = currentUser.Id
            });
            await _activitiesRepository.UpdateAsync(activity);
        }

        public async Task CancelActivityAttendance(Guid id)
        {
            var currentUser = _userAccessor.GetCurrentUser();
            var activity = await GetByIdAsync(id);
            var userAttendsActivity = await _activitiesRepository.UserAttendsActivity(currentUser.Id, id);
            if (!userAttendsActivity)
            {
                throw new BadHttpRequestException("You are not attending to this activity");
            }

            var activityAttendee = activity.ActivityAttendees.FirstOrDefault(p => p.ActivityId == id && p.AppUserId == currentUser.Id);
            await _activitiesAttendeesRepository.DeleteAsync(activityAttendee);
        }

        public async Task CancelActivity(Guid id)
        {
            var activity = await GetByIdAsync(id);
            if (activity.Status == Enums.ActivityState.Cancelled)
                throw new BadHttpRequestException("This activity is already cancelled");

            activity.Status = Enums.ActivityState.Cancelled;
            await _activitiesRepository.UpdateAsync(activity);
        }

        public async Task<bool> IsActivityHostedByCurrentUser(Guid activityId)
        {
            var currentUser = _userAccessor.GetCurrentUser();
            return await _activitiesRepository.IsActivityHostedByUser(currentUser.Id, activityId);
        }
    }
}
