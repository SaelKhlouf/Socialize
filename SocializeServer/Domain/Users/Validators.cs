using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace Domain.Users
{
    public class UserLoginRequestValidator : AbstractValidator<UserLoginRequest>
    {
        public UserLoginRequestValidator()
        {
            RuleFor(p => p.Email)
                .NotEmpty();
            RuleFor(p => p.Password)
                .NotEmpty();
        }
    }

    public class UserRegisterRequestValidator : AbstractValidator<UserRegisterRequest>
    {
        public UserRegisterRequestValidator()
        {
            RuleFor(p => p.Email)
                .NotEmpty();
            RuleFor(p => p.Password)
                .NotEmpty();
            RuleFor(p => p.DisplayName)
                .NotEmpty();
            RuleFor(p => p.Username)
                .NotEmpty();
        }
    }

    public class UserChooseMainImageRequestValidator : AbstractValidator<SelectMainImageRequest>
    {
        public UserChooseMainImageRequestValidator()
        {
            RuleFor(p => p.ImageName)
                .NotEmpty();
        }
    }
}
