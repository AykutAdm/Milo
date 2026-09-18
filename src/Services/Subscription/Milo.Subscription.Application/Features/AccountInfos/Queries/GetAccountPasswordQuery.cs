using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.AccountInfos.Queries
{
    public class GetAccountPasswordQuery : IRequest<string>
    {
        public Guid AccountInfoId { get; set; }

        public GetAccountPasswordQuery(Guid accountInfoId)
        {
            AccountInfoId = accountInfoId;
        }
    }
}
