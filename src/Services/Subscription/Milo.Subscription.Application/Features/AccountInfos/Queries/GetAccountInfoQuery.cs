using MediatR;
using Milo.Subscription.Application.Features.AccountInfos.Results;

namespace Milo.Subscription.Application.Features.AccountInfos.Queries
{
    public class GetAccountInfoQuery : IRequest<List<GetAccountInfoQueryResult>>
    {
    }
}
