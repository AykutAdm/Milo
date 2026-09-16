using MediatR;

namespace Milo.Subscription.Application.Features.AccountInfos.Commands
{
    public class CreateAccountInfoCommand : IRequest
    {
        public Guid PlatformId { get; set; }
        public string? Email { get; set; }
        public string? Username { get; set; }
        public string Password { get; set; }
        public string? Description { get; set; }
    }
}
