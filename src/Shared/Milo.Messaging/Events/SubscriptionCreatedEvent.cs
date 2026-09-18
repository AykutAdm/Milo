using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Messaging.Events
{
    public class SubscriptionCreatedEvent
    {
        public Guid UserId { get; set; }
        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public DateTime RenewalDate { get; set; }
    }
}
