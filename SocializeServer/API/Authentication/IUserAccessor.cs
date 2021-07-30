using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Users;

namespace API.Authentication
{
    public interface IUserAccessor
    {
        public CurrentUser GetCurrentUser();
    }
}
