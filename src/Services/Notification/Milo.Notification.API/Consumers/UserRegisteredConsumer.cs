using MassTransit;
using Milo.Messaging.Events;
using Milo.Notification.API.Context;
using Milo.Notification.API.Entities;

namespace Milo.Notification.API.Consumers
{
    public class UserRegisteredConsumer : IConsumer<UserRegisteredEvent>
    {
        private readonly NotificationDbContext _context;

        public UserRegisteredConsumer(NotificationDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<UserRegisteredEvent> context)
        {
            var message = context.Message;

            _context.UserEmails.Add(new UserEmail
            {
                Id = Guid.NewGuid(),
                UserId = message.UserId,
                Email = message.Email
            });

            await _context.SaveChangesAsync();
        }
    }
}
