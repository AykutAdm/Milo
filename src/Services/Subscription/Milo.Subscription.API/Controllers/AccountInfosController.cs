using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milo.Subscription.Application.Features.AccountInfos.Commands;
using Milo.Subscription.Application.Features.AccountInfos.Queries;

namespace Milo.Subscription.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountInfosController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AccountInfosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAccountInfos()
        {
            var result = await _mediator.Send(new GetAccountInfoQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountInfoById(Guid id)
        {
            var result = await _mediator.Send(new GetAccountInfoByIdQuery(id));
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccountInfo(CreateAccountInfoCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Hesap bilgisi eklendi." });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAccountInfo(UpdateAccountInfoCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Hesap bilgisi güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveAccountInfo(Guid id)
        {
            await _mediator.Send(new RemoveAccountInfoCommand(id));
            return Ok(new { message = "Hesap bilgisi silindi." });
        }
    }
}
