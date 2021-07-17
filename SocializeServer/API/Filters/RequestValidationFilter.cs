using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Filters
{
    public class RequestValidationFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {

                var errors = context.ModelState
                    .Values
                    .SelectMany(x => x.Errors.Select(e => e.ErrorMessage))
                    .ToList();
                context.Result = new BadRequestObjectResult(
                    new ValidationErrorsModel
                    {
                        Errors = errors,
                        Message = "Validation Errors"
                    });
                return;
            }

            await next();
        }
    }
}


