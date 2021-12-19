using System;
using API.Authentication;
using API.Filters;
using Application.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;
using Persistence.Repositories;
using Domain.Core;
using Domain.Core.PhotoAccessor;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            using (var serviceProvider = services.BuildServiceProvider())
            {
                var config = serviceProvider.GetService<Config>();
                if (config == null)
                {
                    throw new Exception("AppSettings are not provided.");
                }
                services.AddDbContext<ApplicationDbContext>(options => options
                    .UseSqlServer(config.ConnectionStrings.SocializeDb)
                    .ConfigureWarnings(p => p.Ignore(CoreEventId.RowLimitingOperationWithoutOrderByWarning))
                );
            }

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            
            services.AddScoped<ActivitiesRepository>();
            services.AddScoped<ActivitiesAttendeesRepository>();
            
            services.AddScoped<ActivitiesService>();
            services.AddSingleton<IPhotoAccessor, PhotoAccessor>();
        }
    }
}
