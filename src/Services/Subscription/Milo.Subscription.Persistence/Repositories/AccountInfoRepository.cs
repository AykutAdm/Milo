using Microsoft.EntityFrameworkCore;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Domain.Entities;
using Milo.Subscription.Persistence.Context;

namespace Milo.Subscription.Persistence.Repositories
{
    public class AccountInfoRepository : IAccountInfoRepository
    {
        private readonly SubscriptionDbContext _context;

        public AccountInfoRepository(SubscriptionDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(AccountInfo accountInfo)
        {
            await _context.AccountInfos.AddAsync(accountInfo);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid accountInfoId)
        {
            var value = await _context.AccountInfos.FindAsync(accountInfoId);

            if (value != null)
            {
                _context.AccountInfos.Remove(value);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<AccountInfo>> GetAllAsync()
        {
            return await _context.AccountInfos.AsNoTracking().Include(x => x.Platform).ToListAsync();
        }

        public async Task<List<AccountInfo>> GetAllByUserIdAsync(Guid userId)
        {
            return await _context.AccountInfos.AsNoTracking().Include(x => x.Platform).Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<AccountInfo?> GetByIdAsync(Guid accountInfoId)
        {
            return await _context.AccountInfos.Include(x => x.Platform).FirstOrDefaultAsync(y => y.AccountInfoId == accountInfoId);
        }

        public async Task UpdateAsync(AccountInfo accountInfo)
        {
            _context.AccountInfos.Update(accountInfo);
            await _context.SaveChangesAsync();
        }
    }
}
