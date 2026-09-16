using MediatR;
using Milo.Subscription.Application.Features.Categories.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Queries
{
    public class GetCategoryByIdQuery : IRequest<GetCategoryByIdQueryResult>
    {
        public Guid CategoryId { get; set; }

        public GetCategoryByIdQuery(Guid categoryId)
        {
            CategoryId = categoryId;
        }
    }
}
