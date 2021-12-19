using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Domain.Activities
{
    public class ActivityValidator : AbstractValidator<ActivityRequest>
    {
        public ActivityValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty();
            RuleFor(p => p.Category)
                .NotEmpty();
            RuleFor(p => p.City)
                .NotEmpty();
            RuleFor(p => p.Date)
                .NotEmpty();
            RuleFor(p => p.Description)
                .NotEmpty();
            RuleFor(p => p.Venue)
                .NotEmpty();
        }
    }
}
