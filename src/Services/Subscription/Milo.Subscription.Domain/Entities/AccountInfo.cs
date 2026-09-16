using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Domain.Entities
{
    public class AccountInfo
    {
        public Guid AccountInfoId { get; set; }
        public Guid UserId { get; set; }

        public Guid PlatformId { get; set; }
        public Platform Platform { get; set; }

        public string? Email { get; set; }
        public string? Username { get; set; }
        public string Password { get; set; }
        public string? Description { get; set; }
    }
}
