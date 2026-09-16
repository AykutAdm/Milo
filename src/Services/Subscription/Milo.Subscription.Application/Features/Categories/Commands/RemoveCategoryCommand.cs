using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Commands
{
    public class RemoveCategoryCommand : IRequest
    {
        public Guid CategoryId { get; set; }

        public RemoveCategoryCommand(Guid categoryId)
        {
            CategoryId = categoryId;
        }
    }
}
