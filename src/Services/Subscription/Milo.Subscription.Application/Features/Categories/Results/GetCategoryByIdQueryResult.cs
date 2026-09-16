using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Features.Categories.Results
{
    public class GetCategoryByIdQueryResult
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
