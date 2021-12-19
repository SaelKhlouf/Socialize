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

        public BaseController(IPhotoAccessor photoAccessor)
        {
            _photoAccessor = photoAccessor;
        }

        [HttpPost]
        [ProducesResponseType(typeof(PreSignedUrlDto), StatusCodes.Status200OK)]
        [Route("generate-presigned-url")]
        [Authorize]
        public IActionResult GeneratePreSignedUrl(GeneratePreSignedUrRequest generatePreSignedUrRequest)
        {
            var data = new PreSignedUrlDto()
            {
                Url = _photoAccessor.GeneratePreSignedUrl(generatePreSignedUrRequest.FileExtension, generatePreSignedUrRequest.ContentLength)
            };
            return Ok(data);
        }
    }
}
