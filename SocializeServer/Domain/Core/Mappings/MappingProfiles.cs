using System.Linq;
using AutoMapper;
using Domain.Activities;
using Domain.Core.PhotoAccessor;
using Domain.Users;

namespace Domain.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ActivityRequest, Activity>();

            CreateMap<AppUser, UserDto>();

            CreateMap<AppUser, LoginDto>();

            CreateMap<PreSignedUrl, PreSignedUrlDto>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(dest => dest.Host, opt => opt.MapFrom(src => src.Host))
                .ForMember(dest => dest.Users, opt => opt.MapFrom(src => src.ActivityAttendees.Select(x => x.User)));

            CreateMap<DataList<Activity>, DataList<ActivityDto>>();
        }
    }
}
