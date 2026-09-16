using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Domain.Entities
{
    public class Platform
    {
        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }

        public Guid CategoryId { get; set; }
        public Category Category { get; set; }

        public List<UserSubscription> UserSubscriptions { get; set; }
    }
}
