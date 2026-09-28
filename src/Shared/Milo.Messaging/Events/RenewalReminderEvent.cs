using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Messaging.Events
{
    public class RenewalReminderEvent
    {
        public Guid UserId { get; set; }
        public string PlatformName { get; set; }
        public decimal Price { get; set; }
        public DateTime RenewalDate { get; set; }
        public int DaysLeft { get; set; }
    }
}
