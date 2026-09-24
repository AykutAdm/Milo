using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.AccountInfos.Results
{
    public class GetAccountInfoQueryResult
    {
        public Guid AccountInfoId { get; set; }
        public Guid PlatformId { get; set; }
        public string? PlatformName { get; set; }
        public string? PlatformIconUrl { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string? Description { get; set; }
    }
}
