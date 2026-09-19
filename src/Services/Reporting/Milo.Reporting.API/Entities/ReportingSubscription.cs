namespace Milo.Reporting.API.Entities
{
    public class ReportingSubscription
    {
        public Guid ReportingSubscriptionId { get; set; }
        public Guid UserId { get; set; }

        public string PlatformName { get; set; }
        public string CategoryName { get; set; }
        public decimal Price { get; set; }
        public string Period { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
