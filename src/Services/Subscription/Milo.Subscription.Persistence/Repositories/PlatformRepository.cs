using Microsoft.EntityFrameworkCore;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Domain.Entities;
using Milo.Subscription.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Persistence.Repositories
{
    public class PlatformRepository : IPlatformRepository
    {
        private readonly SubscriptionDbContext _context;

        public PlatformRepository(SubscriptionDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Platform platform)
        {
            await _context.Platforms.AddAsync(platform);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid platformId)
        {
            var value = await _context.Platforms.FindAsync(platformId);

            if (value != null)
            {
                _context.Platforms.Remove(value);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Platform>> GetAllAsync()
        {
            return await _context.Platforms.AsNoTracking().Include(x => x.Category).ToListAsync();
        }

        public async Task<Platform?> GetByIdAsync(Guid platformId)
        {
            return await _context.Platforms.Include(x => x.Category).FirstOrDefaultAsync(y => y.PlatformId == platformId);
        }

        public async Task UpdateAsync(Platform platform)
        {
            _context.Platforms.Update(platform);
            await _context.SaveChangesAsync();
        }
    }
}
