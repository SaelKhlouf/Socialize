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
        }
    }
}
