namespace Milo.Messaging.Events
{
    public class SubscriptionCreatedEvent
    {
        public Guid UserSubscriptionId { get; set; }
        public Guid UserId { get; set; }
        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public DateTime RenewalDate { get; set; }
        public string Period { get; set; }
    }
}
