using Domain.Users;

namespace Domain.Core.UserAccessor
{
    public interface IUserAccessor
    {
        public CurrentUser GetCurrentUser();
    }
}
