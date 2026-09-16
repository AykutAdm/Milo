using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milo.Subscription.Application.Features.Categories.Commands;
using Milo.Subscription.Application.Features.Categories.Queries;

namespace Milo.Subscription.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            var result = await _mediator.Send(new GetCategoryQuery());
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var result = await _mediator.Send(new GetCategoryByIdQuery(id));
            return Ok(result);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateCategory(CreateCategoryCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Kategori eklendi." });
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateCategory(UpdateCategoryCommand command)
        {
            await _mediator.Send(command);
            return Ok(new { message = "Kategori güncellendi." });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveCategory(Guid id)
        {
            await _mediator.Send(new RemoveCategoryCommand(id));
            return Ok(new { message = "Kategori silindi." });
        }
    }
}
