using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Milo.Notification.API.Services.NotificationServices;

namespace Milo.Notification.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserNotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public UserNotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMyNotifications()
        {
            var result = await _notificationService.GetAllAsync();
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(Guid id)
        {
            await _notificationService.DeleteAsync(id);
            return Ok(new { message = "Bildirim silindi." });
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkNotificationAsRead(Guid id)
        {
            await _notificationService.MarkAsReadAsync(id);
            return Ok(new { message = "Okundu olarak işaretlendi." });
        }
    }
}
