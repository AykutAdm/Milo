using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Messaging.Events
{
    public class SubscriptionDeletedEvent
    {
        public Guid UserSubscriptionId { get; set; }
    }
}
