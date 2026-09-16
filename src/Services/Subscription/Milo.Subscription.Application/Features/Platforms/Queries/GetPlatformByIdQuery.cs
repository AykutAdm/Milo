using MediatR;
using Milo.Subscription.Application.Features.Platforms.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Platforms.Queries
{
    public class GetPlatformByIdQuery : IRequest<GetPlatformByIdQueryResult>
    {
        public Guid PlatformId { get; set; }

        public GetPlatformByIdQuery(Guid platformId)
        {
            PlatformId = platformId;
        }
    }
}
