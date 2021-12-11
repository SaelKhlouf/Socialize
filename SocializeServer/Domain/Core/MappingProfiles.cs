using AutoMapper;
using Domain.Activities;
using Domain.Users;

namespace Domain.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ActivityRequest, Activity>();
            CreateMap<Activity, ActivityDto>().ReverseMap();
            CreateMap<AppUser, LoginDto>();
            CreateMap<AppUser, UserDto>();
            CreateMap<DataList<Activity>, DataList<ActivityDto>>().ReverseMap();
        }
    }
}
