using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milo.Reporting.API.Services.AIServices;
using Milo.Reporting.API.Services.ReportingServices;
using Milo.Reporting.API.Services.UserServices;

namespace Milo.Reporting.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportingRepository _repository;
        private readonly ICurrentUserService _currentUser;
        private readonly IAiSuggestionService _aiSuggestionService;

        public ReportsController(IReportingRepository repository, ICurrentUserService currentUser, IAiSuggestionService aiSuggestionService)
        {
            _repository = repository;
            _currentUser = currentUser;
            _aiSuggestionService = aiSuggestionService;
        }

        [HttpGet("monthly-total")]
        public async Task<IActionResult> GetMonthlyTotal()
        {
            var userId = _currentUser.GetUserId();
            var total = await _repository.GetMonthlyTotalAsync(userId);
            return Ok(new { monthlyTotal = total });
        }

        [HttpGet("spend-by-category")]
        public async Task<IActionResult> GetSpendByCategory()
        {
            var userId = _currentUser.GetUserId();
            var result = await _repository.GetSpendByCategoryAsync(userId);
            return Ok(result);
        }

        [HttpGet("ai-suggestion")]
        public async Task<IActionResult> GetAiSuggestion()
        {
            var userId = _currentUser.GetUserId();
            var suggestion = await _aiSuggestionService.GetSuggestionAsync(userId);
            return Ok(new { suggestion });
        }

    }
}
