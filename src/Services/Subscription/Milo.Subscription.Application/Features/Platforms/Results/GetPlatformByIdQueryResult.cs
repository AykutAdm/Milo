using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Platforms.Results
{
    public class GetPlatformByIdQueryResult
    {
        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }

        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
