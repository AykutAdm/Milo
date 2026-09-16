using MediatR;

namespace Milo.Subscription.Application.Features.Platforms.Commands
{
    public class UpdatePlatformCommand : IRequest
    {
        public Guid PlatformId { get; set; }
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }

        public Guid CategoryId { get; set; }

    }
}
