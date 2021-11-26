using Application.Services;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Authentication;
using API.Filters;
using AutoMapper;
using Domain.Activities;
using Domain.Core;
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
            var response = await _activitiesService.ListAsync(pagingParams);
            return Ok(_mapper.Map<DataList<ActivityDto>>(response));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetActivityById(Guid id)
        {
            var response = await _activitiesService.GetByIdAsync(id);
            return Ok(_mapper.Map<ActivityDto>(response));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status201Created)]
        [Authorize]
        public async Task<IActionResult> Post(ActivityRequest activity)
        {
            var response = await _activitiesService.PostAsync(activity);
            return CreatedAtAction(nameof(GetActivityById), new { id = response.Id }, _mapper.Map<ActivityDto>(response));
        }


        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ActivityDto), StatusCodes.Status200OK)]
        [Authorize]
        public async Task<IActionResult> Update(Guid id, [FromBody] ActivityRequest activity)
        {
            var response = await _activitiesService.UpdateAsync(id, activity);
            return Ok(_mapper.Map<ActivityDto>(response));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [Authorize]
        public async Task<IActionResult> DeleteActivityById(Guid id)
        {
            await _activitiesService.DeleteAsync(id);
            return NoContent();
        }
    }
}