using MassTransit;
using Microsoft.EntityFrameworkCore;
using Milo.Messaging.Events;
using Milo.Subscription.Persistence.Context;

namespace Milo.Subscription.API.Services
{
    public class RenewalJobService
    {
        private readonly SubscriptionDbContext _context;
        private readonly IPublishEndpoint _publishEndpoint;

        public RenewalJobService(SubscriptionDbContext context, IPublishEndpoint publishEndpoint)
        {
            _context = context;
            _publishEndpoint = publishEndpoint;
        }

        public async Task ProcessRenewalsAsync()
        {
            var today = DateTime.UtcNow.Date;


            var subscriptions = await _context.UserSubscriptions.Include(x => x.Platform).ToListAsync();

            foreach (var sub in subscriptions)
            {
                var daysLeft = (sub.RenewalDate.Date - today).Days;

                //Reminder before 3 days and 1 day
                if (daysLeft == 3 || daysLeft == 1)
                {
                    await _publishEndpoint.Publish(new RenewalReminderEvent
                    {
                        UserId = sub.UserId,
                        PlatformName = sub.Platform.PlatformName,
                        Price = sub.Price,
                        RenewalDate = sub.RenewalDate,
                        DaysLeft = daysLeft
                    });
                }

                //Move to other month
                if (sub.RenewalDate.Date < today)
                {
                    while (sub.RenewalDate.Date < today)
                    {
                        sub.RenewalDate = sub.Period == "Yıllık"
                            ? sub.RenewalDate.AddYears(1)
                            : sub.RenewalDate.AddMonths(1);
                    }
                }
            }

            await _context.SaveChangesAsync();
        }
    }
}
