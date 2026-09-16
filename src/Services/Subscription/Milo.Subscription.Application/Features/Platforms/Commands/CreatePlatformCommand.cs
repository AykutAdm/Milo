using MediatR;

namespace Milo.Subscription.Application.Features.Platforms.Commands
{
    public class CreatePlatformCommand : IRequest
    {
        public string PlatformName { get; set; }
        public string PlatformIconUrl { get; set; }

        public Guid CategoryId { get; set; }

    }
}
