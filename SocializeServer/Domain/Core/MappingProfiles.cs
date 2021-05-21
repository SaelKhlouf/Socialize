using AutoMapper;
using Domain.Activities;

namespace Domain.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ActivityRequest, Activity>();
            CreateMap<Activity, ActivityDto>().ReverseMap();
            CreateMap<DataList<Activity>, DataList<ActivityDto>>().ReverseMap();
        }
    }
}
