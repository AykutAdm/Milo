using Milo.Subscription.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Results
{
    public class GetUserSubscriptionQueryResult
    {
        public Guid UserSubscriptionId { get; set; }
        public decimal Price { get; set; }
        public string? Period { get; set; }
        public UserSubscriptionStatus UserSubscriptionStatus { get; set; }
        public DateTime RenewalDate { get; set; }

        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }
        public string CategoryName { get; set; }
    }
}
