namespace Milo.Notification.API.Entities
{
    public class UserNotification
    {
        public Guid UserNotificationId { get; set; }
        public Guid UserId { get; set; }

        public string Title { get; set; }
        public string Message { get; set; }

        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
