using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.UserSubscriptions.Commands
{
    public class RemoveUserSubscriptionCommand : IRequest
    {
        public Guid UserSubscriptionId { get; set; }

        public RemoveUserSubscriptionCommand(Guid userSubscriptionId)
        {
            UserSubscriptionId = userSubscriptionId;
        }
    }
}
