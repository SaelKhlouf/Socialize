using System;
using API.Extensions;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain.Core.PhotoAccessor;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private readonly IPhotoAccessor _photoAccessor;
        private readonly IMapper _mapper;

        public BaseController(IPhotoAccessor photoAccessor, IMapper mapper)
        {
            _photoAccessor = photoAccessor;
            _mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(typeof(PreSignedUrlDto), StatusCodes.Status200OK)]
        [Route("generate-presigned-url")]
        [Authorize]
        public IActionResult GeneratePreSignedUrl(GeneratePreSignedUrRequest generatePreSignedUrRequest)
        {
            var data = _photoAccessor.GeneratePreSignedUrl(
                generatePreSignedUrRequest.FileExtension.ParseEnum<Enums.ProfilePictureExtension>(),
                generatePreSignedUrRequest.ContentLength);
            return Ok(_mapper.Map<PreSignedUrlDto>(data));
        }
    }
}
