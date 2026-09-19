using Milo.Subscription.Domain.Enums;

namespace Milo.Subscription.Domain.Entities
{
    public class UserSubscription
    {
        public Guid UserSubscriptionId { get; set; }
        public Guid UserId { get; set; }

        public decimal Price { get; set; }
        public string? Period { get; set; }
        public DateTime RenewalDate { get; set; }

        public UserSubscriptionStatus UserSubscriptionStatus { get; set; }

        public Guid PlatformId { get; set; }
        public Platform Platform { get; set; }
    }
}
