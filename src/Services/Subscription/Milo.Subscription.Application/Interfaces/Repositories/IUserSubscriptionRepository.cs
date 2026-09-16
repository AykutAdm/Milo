using Milo.Subscription.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Application.Interfaces.Repositories
{
    public interface IUserSubscriptionRepository
    {
        Task<List<UserSubscription>> GetAllAsync();
        Task<UserSubscription?> GetByIdAsync(Guid userSubscriptionId);
        Task AddAsync(UserSubscription userSubscription);
        Task UpdateAsync(UserSubscription userSubscription);
        Task DeleteAsync(Guid userSubscriptionId);

        Task<List<UserSubscription>> GetAllByUserIdAsync(Guid userId);
    }
}
