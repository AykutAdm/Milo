namespace Milo.Subscription.Application.Features.Platforms.Results
{
    public class GetPlatformQueryResult
    {
        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }

        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}
