using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Milo.Notification.API.Context;
using Milo.Notification.API.Services.UserServices;

namespace Milo.Notification.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotificationsController : ControllerBase
    {
        private readonly NotificationDbContext _context;
        private readonly ICurrentUserService _currentUser;

        public UserNotificationsController(NotificationDbContext context, ICurrentUserService currentUser)
        {
            _context = context;
            _currentUser = currentUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyNotifications()
        {
            var userId = _currentUser.GetUserId();

            var notifications = await _context.UserNotifications
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();

            return Ok(notifications);
        }
    }
}
