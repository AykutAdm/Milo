using Milo.Notification.API.Entities;

namespace Milo.Notification.API.Services.NotificationServices
{
    public interface INotificationService
    {
        Task<List<UserNotification>> GetAllAsync();
        Task DeleteAsync(Guid notificationId);

        Task MarkAsReadAsync(Guid notificationId);
    }
}
