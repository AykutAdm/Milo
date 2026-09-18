using MassTransit;
using Milo.Messaging.Events;
using Milo.Notification.API.Context;
using Milo.Notification.API.Entities;

namespace Milo.Notification.API.Consumers
{
    public class SubscriptionCreatedConsumer : IConsumer<SubscriptionCreatedEvent>
    {
        private readonly NotificationDbContext _context;

        public SubscriptionCreatedConsumer(NotificationDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<SubscriptionCreatedEvent> context)
        {
            var message = context.Message;

            var notification = new UserNotification
            {
                UserNotificationId = Guid.NewGuid(),
                UserId = message.UserId,
                Title = "Yeni abonelik",
                Message = $"{message.PlatformName} aboneliğiniz eklendi, " +
                         $"{message.RenewalDate:dd.MM.yyyy} tarihinde yenilenecek.",
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.UserNotifications.Add(notification);
            await _context.SaveChangesAsync();


        }
    }
}
