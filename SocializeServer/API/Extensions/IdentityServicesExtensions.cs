using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Services;
using Domain.Core;
using Domain.Core.UserAccessor;
using Domain.Users;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServicesExtensions
    {
        public static void AddIdentityServices(this IServiceCollection services)
        {
            services.AddIdentityCore<AppUser>(opt =>
                {
                    opt.Password.RequiredLength = 8;
                    opt.Password.RequireNonAlphanumeric = false;
                })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            services.AddScoped<TokenService>();
            services.AddSingleton<IUserAccessor, UserAccessor>();

            using (var serviceProvider = services.BuildServiceProvider())
            {
                var config = serviceProvider.GetService<Config>();
                if (config == null)
                {
                    throw new Exception("AppSettings are not provided.");
                }

                var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.Jwt.JwtKey));
                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true, // validate if the token is actually was generated via IssuerSigningKey (JwtKey) "the public key"
                        IssuerSigningKey = jwtKey, // the public key JwtKey
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = true
                    };
                });
            }
        }
    }
}
