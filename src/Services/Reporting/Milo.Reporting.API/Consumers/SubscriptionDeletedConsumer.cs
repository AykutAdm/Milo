using MassTransit;
using Microsoft.EntityFrameworkCore;
using Milo.Messaging.Events;
using Milo.Reporting.API.Context;

namespace Milo.Reporting.API.Consumers
{
    public class SubscriptionDeletedConsumer : IConsumer<SubscriptionDeletedEvent>
    {
        private readonly ReportingDbContext _context;

        public SubscriptionDeletedConsumer(ReportingDbContext context)
        {
            _context = context;
        }

        public async Task Consume(ConsumeContext<SubscriptionDeletedEvent> context)
        {
            var subscriptionId = context.Message.UserSubscriptionId;

            var value = await _context.ReportingSubscriptions.FirstOrDefaultAsync(x => x.UserSubscriptionId == subscriptionId);

            if (value is not null)
            {
                _context.ReportingSubscriptions.Remove(value);
                await _context.SaveChangesAsync();
            }
        }
    }
}
