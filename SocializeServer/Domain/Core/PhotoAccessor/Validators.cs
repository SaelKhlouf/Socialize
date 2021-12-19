using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Domain.Core.PhotoAccessor
{
    public class GeneratePreSignedUrRequestValidator : AbstractValidator<GeneratePreSignedUrRequest>
    {
        public GeneratePreSignedUrRequestValidator()
        {
            RuleFor(p => p.ContentLength)
                .NotEmpty();
            RuleFor(p => p.FileExtension)
                .IsInEnum()
                    .WithMessage("Extension provided is not supported");
        }
    }
}
