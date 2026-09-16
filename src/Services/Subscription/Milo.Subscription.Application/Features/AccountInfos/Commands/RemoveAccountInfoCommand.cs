using MediatR;

namespace Milo.Subscription.Application.Features.AccountInfos.Commands
{
    public class RemoveAccountInfoCommand : IRequest
    {
        public Guid AccountInfoId { get; set; }

        public RemoveAccountInfoCommand(Guid accountInfoId)
        {
            AccountInfoId = accountInfoId;
        }
    }
}
