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
            RuleFor(p => p.Displayname)
                .NotEmpty();
            RuleFor(p => p.Username)
                .NotEmpty();
        }
    }
}
