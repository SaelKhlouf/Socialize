using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Users;
using Microsoft.AspNetCore.Identity;
using Persistence.Seeds;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            IHost host = CreateHostBuilder(args).Build();
            using IServiceScope scope = host.Services.CreateScope();
            // 'using' with IServiceScope will dispose the object and instances that were fetched from the IoC container, once this method is finished.
            var services = scope.ServiceProvider; //IServiceProvider

            try
            {
                var context = services.GetRequiredService<ApplicationDbContext>(); // Service locator pattern
                await context.Database.MigrateAsync();

                var userManager = services.GetRequiredService<UserManager<AppUser>>();
                await Seed.SeedData(context, userManager);
            }
            catch (Exception ex)
            {
                ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during migration");
            }
            await host.RunAsync(); // Run the application
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
