using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Authorization.Handlers;
using API.Authorization.Requirements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class RequirementsServicesExtensions
    {
        public static void AddRequirementsServices(this IServiceCollection services)
        {
            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsHost",
                    policy =>
                    {
                        policy.RequireAuthenticatedUser();
                        policy.Requirements.Add(new IsHostRequirement());
                    });
            });

            services.AddScoped<IAuthorizationHandler, IsHostHandler>();
        }
    }
}
