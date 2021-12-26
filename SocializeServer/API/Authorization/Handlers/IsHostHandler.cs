using System;
using System.Linq;
using System.Threading.Tasks;
using API.Authorization.Requirements;
using Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace API.Authorization.Handlers
{
    public class IsHostHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ActivitiesService _activitiesService;

        public IsHostHandler(IHttpContextAccessor httpUserAccessor, ActivitiesService activitiesService)
        {
            _httpContextAccessor = httpUserAccessor;
            _activitiesService = activitiesService;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            //This is a workaround to solve the behaviour of skipping the authentication of the JWT Bearer.
            if (context.User.Identity?.IsAuthenticated == false)
                return;

            if (_httpContextAccessor?.HttpContext?.Request.RouteValues.FirstOrDefault(p => p.Key == "id").Value is string activityId)
            {
                var isHost = await _activitiesService.IsActivityHostedByCurrentUser(new Guid(activityId));
                if (isHost)
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}
