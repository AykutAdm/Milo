using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Domain.Entities
{
    public class Category
    {
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }

        public List<Platform> Platforms { get; set; }
    }
}
