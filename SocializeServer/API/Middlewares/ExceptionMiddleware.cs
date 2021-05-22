using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Domain.Core;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate requestDelegate, IWebHostEnvironment env,
            ILogger<ExceptionMiddleware> logger)
        {
            _next = requestDelegate;
            _env = env;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Call the next request delegate/middleware in the pipeline
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred");

                string message = ex.Message;
                string stackTrace = ex.StackTrace;
                int statusCode;

                if (ex is BadHttpRequestException)
                {
                    statusCode = (int)HttpStatusCode.BadRequest;
                }
                else
                {
                    statusCode = (int)HttpStatusCode.InternalServerError;
                }

                context.Response.StatusCode = statusCode;
                context.Response.ContentType = "application/json";

                var response = _env.IsDevelopment()
                    ? new AppException(statusCode, message, stackTrace)
                    : new AppException(statusCode, statusCode == (int)HttpStatusCode.InternalServerError ? "Internal Server Error" : message);

                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                string json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
