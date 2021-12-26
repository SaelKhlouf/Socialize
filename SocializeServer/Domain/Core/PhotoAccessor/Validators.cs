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
                .NotEmpty()
                .Must(p => Enum.GetNames(typeof(Enums.ProfilePictureExtension)).ToList().Contains(p.ToLower()))
                    .WithMessage("Image extension provided is not supported");
        }
    }
}
