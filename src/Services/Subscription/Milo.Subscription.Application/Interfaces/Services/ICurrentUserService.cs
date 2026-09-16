using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Interfaces.Services
{
    public interface ICurrentUserService
    {
        Guid GetUserId();
    }
}
