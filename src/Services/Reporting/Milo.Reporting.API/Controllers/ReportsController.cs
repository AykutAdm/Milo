using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        public ReportsController(IReportingRepository repository, ICurrentUserService currentUser)
        {
            _repository = repository;
            _currentUser = currentUser;
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
    }
}
