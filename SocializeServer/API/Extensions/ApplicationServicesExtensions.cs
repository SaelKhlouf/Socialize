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
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(config.GetConnectionString("SocializeDb")));
            services.AddScoped<ActivitiesRepository>();
            services.AddScoped<ActivitiesService>();
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        }
    }
}
