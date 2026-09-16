using MediatR;
using Milo.Subscription.Application.Features.AccountInfos.Results;

namespace Milo.Subscription.Application.Features.AccountInfos.Queries
{
    public class GetAccountInfoByIdQuery : IRequest<GetAccountInfoByIdQueryResult>
    {
        public Guid AccountInfoId { get; set; }

        public GetAccountInfoByIdQuery(Guid accountInfoId)
        {
            AccountInfoId = accountInfoId;
        }
    }
}
