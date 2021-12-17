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
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(config.GetConnectionString("SocializeDb")).ConfigureWarnings(p => p.Ignore(CoreEventId.RowLimitingOperationWithoutOrderByWarning)));
            services.AddScoped<ActivitiesRepository>();
            services.AddScoped<ActivitiesAttendeesRepository>();
            services.AddScoped<ActivitiesService>();
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        }
    }
}
