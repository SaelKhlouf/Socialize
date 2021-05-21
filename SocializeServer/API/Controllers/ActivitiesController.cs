using Application.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Activities;
using Domain.Core;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly ActivitiesService _activitiesService;
        private readonly IMapper _mapper;

        public ActivitiesController(ActivitiesService activitiesService, IMapper mapper)
        {
            _activitiesService = activitiesService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PagingParams pagingParams)
        {
            var response = await _activitiesService.ListAsync(pagingParams);
            return Ok(_mapper.Map<DataList<ActivityDto>>(response));
        }

        [HttpGet(":id")]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            var response = await _activitiesService.GetByIdAsync(id);
            return Ok(_mapper.Map<ActivityDto>(response));
        }

        [HttpPost]
        public async Task<IActionResult> Post(ActivityRequest activity)
        {
            var response = await _activitiesService.PostAsync(activity);
            return Ok(_mapper.Map<ActivityDto>(response));
        }
    }
}
