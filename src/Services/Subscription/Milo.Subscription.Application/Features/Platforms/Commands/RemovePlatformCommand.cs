using MediatR;

namespace Milo.Subscription.Application.Features.Platforms.Commands
{
    public class RemovePlatformCommand : IRequest
    {
        public Guid PlatformId { get; set; }

        public RemovePlatformCommand(Guid platformId)
        {
            PlatformId = platformId;
        }
    }
}
