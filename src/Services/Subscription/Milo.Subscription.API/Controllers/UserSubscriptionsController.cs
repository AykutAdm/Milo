using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milo.Subscription.Application.Features.UserSubscriptions.Commands;
using Milo.Subscription.Application.Features.UserSubscriptions.Queries;

namespace Milo.Subscription.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserSubscriptionsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserSubscriptionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserSubscriptions()
        {
            var result = await _mediator.Send(new GetUserSubscriptionQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserSubscriptionById(Guid id)
        {
            var result = await _mediator.Send(new GetUserSubscriptionByIdQuery(id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserSubscription(CreateUserSubscriptionCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Abonelik eklendi." });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserSubscription(UpdateUserSubscriptionCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Abonelik güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveUserSubscription(Guid id)
        {
            await _mediator.Send(new RemoveUserSubscriptionCommand(id));
            return Ok(new { message = "Abonelik silindi." });
        }
    }
}
