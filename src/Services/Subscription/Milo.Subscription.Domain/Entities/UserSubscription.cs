using Milo.Subscription.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Domain.Entities
{
    public class UserSubscription
    {
        public Guid UserSubscriptionId { get; set; }
        public Guid UserId { get; set; }

        public decimal Price { get; set; }
        public BillingPeriod Period { get; set; }
        public DateTime RenewalDate { get; set; }

        public UserSubscriptionStatus UserSubscriptionStatus { get; set; }

        public Guid PlatformId { get; set; }
        public Platform Platform { get; set; }
    }
}
