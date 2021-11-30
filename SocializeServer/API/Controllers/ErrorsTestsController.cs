using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorsTestsController : ControllerBase
    {
        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is an internal server error from API");
        }

        [HttpGet("bad-request")]
        public IActionResult GetBadRequestError()
        {
            throw new BadHttpRequestException("This is a bad request error from API");
        }

        [HttpGet("authenticate-error")]
        [Authorize]
        public IActionResult GetAuthenticateError()
        {
            return Ok();
        }

        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }
    }
}
