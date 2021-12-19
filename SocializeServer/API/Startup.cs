using API.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Filters;
using API.Middlewares;
using Domain.Activities;
using Domain.Core;
using FluentValidation.AspNetCore;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;
        private readonly string _myAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services

                .AddControllers(conf =>
                {
                    conf.Filters.Add<RequestValidationFilter>();
                })
                .AddFluentValidation(config =>
                {
                    config
                        .RegisterValidatorsFromAssemblyContaining<
                            ActivityValidator>(); // the assembly of ActivityValidator is the Domain project !, so all validators in Domain project will be registered.
                });

            services.AddSingleton(_configuration.Get<Config>());

            services.AddApplicationServices();
            services.AddIdentityServices();
            services.AddHttpContextAccessor();

            services.AddRequirementsServices();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            services.AddCors(options =>
            {
                options.AddPolicy(_myAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(_myAllowSpecificOrigins);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
