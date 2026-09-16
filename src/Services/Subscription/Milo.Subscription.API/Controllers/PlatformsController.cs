using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milo.Subscription.Application.Features.Platforms.Commands;
using Milo.Subscription.Application.Features.Platforms.Queries;

namespace Milo.Subscription.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlatformsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public PlatformsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetPlatforms()
        {
            var result = await _mediator.Send(new GetPlatformQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlatformById(Guid id)
        {
            var result = await _mediator.Send(new GetPlatformByIdQuery(id));
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreatePlatform(CreatePlatformCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Platform eklendi." });
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdatePlatform(UpdatePlatformCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Platform güncellendi." });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemovePlatform(Guid id)
        {
            await _mediator.Send(new RemovePlatformCommand(id));
            return Ok(new { message = "Platform silindi." });
        }
    }
}
