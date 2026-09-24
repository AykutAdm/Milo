using Microsoft.EntityFrameworkCore;
using Milo.Notification.API.Context;
using Milo.Notification.API.Entities;
using Milo.Notification.API.Services.UserServices;

namespace Milo.Notification.API.Services.NotificationServices
{
    public class NotificationService : INotificationService
    {
        private readonly NotificationDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public NotificationService(NotificationDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<List<UserNotification>> GetAllAsync()
        {
            var userId = _currentUserService.GetUserId();

            return await _context.UserNotifications
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }

        public async Task DeleteAsync(Guid notificationId)
        {
            var userId = _currentUserService.GetUserId();
            var value = await _context.UserNotifications.FirstOrDefaultAsync(x => x.UserNotificationId == notificationId);

            if (value.UserId != userId)
            {
                throw new Exception("Bu bildirime erişim yetkiniz yok.");
            }


            _context.UserNotifications.Remove(value);
            await _context.SaveChangesAsync();
        }



        public async Task MarkAsReadAsync(Guid notificationId)
        {
            var userId = _currentUserService.GetUserId();

            var value = await _context.UserNotifications.FirstOrDefaultAsync(x => x.UserNotificationId == notificationId);

            if (value.UserId != userId)
            {
                throw new Exception("Bu bildirime erişim yetkiniz yok.");
            }

            value.IsRead = true;
            await _context.SaveChangesAsync();

        }
    }
}
