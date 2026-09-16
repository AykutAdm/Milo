using Microsoft.EntityFrameworkCore;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Domain.Entities;
using Milo.Subscription.Persistence.Context;

namespace Milo.Subscription.Persistence.Repositories
{
    public class UserSubscriptionRepository : IUserSubscriptionRepository
    {
        private readonly SubscriptionDbContext _context;

        public UserSubscriptionRepository(SubscriptionDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UserSubscription userSubscription)
        {
            await _context.UserSubscriptions.AddAsync(userSubscription);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid userSubscriptionId)
        {
            var value = await _context.UserSubscriptions.FindAsync(userSubscriptionId);

            if (value != null)
            {
                _context.UserSubscriptions.Remove(value);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<UserSubscription>> GetAllAsync()
        {
            return await _context.UserSubscriptions.AsNoTracking().Include(x => x.Platform).ThenInclude(y => y.Category).ToListAsync();
        }

        public async Task<List<UserSubscription>> GetAllByUserIdAsync(Guid userId)
        {
            return await _context.UserSubscriptions.AsNoTracking().Include(x => x.Platform).ThenInclude(y => y.Category).Where(z => z.UserId == userId).ToListAsync();
        }

        public async Task<UserSubscription?> GetByIdAsync(Guid userSubscriptionId)
        {
            return await _context.UserSubscriptions.Include(x => x.Platform).ThenInclude(y => y.Category).FirstOrDefaultAsync(z => z.UserSubscriptionId == userSubscriptionId);
        }

        public async Task UpdateAsync(UserSubscription userSubscription)
        {
            _context.UserSubscriptions.Update(userSubscription);
            await _context.SaveChangesAsync();
        }
    }
}
