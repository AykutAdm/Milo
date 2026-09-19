using MassTransit;
using Milo.Messaging.Events;
using Milo.Reporting.API.Entities;
using Milo.Reporting.API.Services.ReportingServices;

namespace Milo.Reporting.API.Consumers
{
    public class SubscriptionCreatedConsumer : IConsumer<SubscriptionCreatedEvent>
    {
        private readonly IReportingRepository _repository;

        public SubscriptionCreatedConsumer(IReportingRepository repository)
        {
            _repository = repository;
        }

        public async Task Consume(ConsumeContext<SubscriptionCreatedEvent> context)
        {
            var message = context.Message;

            var reportingSubscription = new ReportingSubscription
            {
                ReportingSubscriptionId = Guid.NewGuid(),
                UserId = message.UserId,
                PlatformName = message.PlatformName,
                CategoryName = message.CategoryName,
                Price = message.Price,
                Period = message.Period,
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddAsync(reportingSubscription);
        }
    }
}
