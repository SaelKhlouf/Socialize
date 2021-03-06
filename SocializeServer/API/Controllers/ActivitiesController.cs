using Application.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Filters;
using AutoMapper;
using Domain.Activities;
using Domain.Core;
using Domain.Core.UserAccessor;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

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
        [ProducesResponseType(typeof(DataList<ActivityDto>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get([FromQuery] PagingParams pagingParams)
        {
            var data = await _activitiesService.ListAsync(pagingParams);
            return Ok(_mapper.Map<DataList<ActivityDto>>(data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            var data = await _activitiesService.GetByIdAsync(id);
            return Ok(_mapper.Map<ActivityDto>(data));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status201Created)]
        public async Task<IActionResult> Post(ActivityRequest activity)
        {
            var data = await _activitiesService.PostAsync(activity);
            return CreatedAtAction(nameof(GetActivityById), new { id = data.Id }, _mapper.Map<ActivityDto>(data));
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status200OK)]
        [Authorize(Policy = "IsHost")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ActivityRequest activity)
        {
            var data = await _activitiesService.UpdateAsync(id, activity);
            return Ok(_mapper.Map<ActivityDto>(data));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Authorize(Policy = "IsHost")]
        public async Task<IActionResult> DeleteActivityById(Guid id)
        {
            await _activitiesService.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("{id}/attend")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status204NoContent)]
        [Authorize]
        public async Task<IActionResult> AttendActivity(Guid id)
        {
            await _activitiesService.AttendActivity(id);
            return NoContent();
        }

        [HttpPost("{id}/un-attend")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status204NoContent)]
        [Authorize]
        public async Task<IActionResult> CancelActivityAttendance(Guid id)
        {
            await _activitiesService.CancelActivityAttendance(id);
            return NoContent();
        }

        [HttpPost("{id}/cancel")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status204NoContent)]
        [Authorize(Policy = "IsHost")]
        public async Task<IActionResult> CancelActivity(Guid id)
        {
            await _activitiesService.CancelActivity(id);
            return NoContent();
        }
    }
}