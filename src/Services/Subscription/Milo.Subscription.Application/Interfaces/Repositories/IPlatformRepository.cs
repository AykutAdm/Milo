using Milo.Subscription.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Interfaces.Repositories
{
    public interface IPlatformRepository
    {
        Task<List<Platform>> GetAllAsync();
        Task<Platform?> GetByIdAsync(Guid platformId);
        Task AddAsync(Platform platform);
        Task UpdateAsync(Platform platform);
        Task DeleteAsync(Guid platformId);
    }
}
