using Milo.Subscription.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Interfaces.Repositories
{
    public interface IAccountInfoRepository
    {
        Task<List<AccountInfo>> GetAllAsync();
        Task<AccountInfo?> GetByIdAsync(Guid accountInfoId);
        Task AddAsync(AccountInfo accountInfo);
        Task UpdateAsync(AccountInfo accountInfo);
        Task DeleteAsync(Guid accountInfoId);
        Task<List<AccountInfo>> GetAllByUserIdAsync(Guid userId);
    }
}
