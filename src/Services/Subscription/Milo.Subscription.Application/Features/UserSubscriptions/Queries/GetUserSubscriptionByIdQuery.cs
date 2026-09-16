using MediatR;
using Milo.Subscription.Application.Features.UserSubscriptions.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Queries
{
    public class GetUserSubscriptionByIdQuery : IRequest<GetUserSubscriptionByIdQueryResult>
    {
        public Guid UserSubscriptionId { get; set; }

        public GetUserSubscriptionByIdQuery(Guid userSubscriptionId)
        {
            UserSubscriptionId = userSubscriptionId;
        }
    }
}
