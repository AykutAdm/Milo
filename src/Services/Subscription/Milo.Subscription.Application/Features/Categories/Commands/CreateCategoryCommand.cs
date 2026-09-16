using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Commands
{
    public class CreateCategoryCommand : IRequest
    {
        public string CategoryName { get; set; }
    }
}
