using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Results
{
    public class GetUpcomingRenewalsQueryResult
    {
        public Guid UserSubscriptionId { get; set; }
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }
        public decimal Price { get; set; }
        public DateTime RenewalDate { get; set; }
    }
}
