using Microsoft.EntityFrameworkCore;
using Milo.Subscription.Application.Interfaces.Repositories;
using Milo.Subscription.Domain.Entities;
using Milo.Subscription.Persistence.Context;

namespace Milo.Subscription.Persistence.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly SubscriptionDbContext _context;

        public CategoryRepository(SubscriptionDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid categoryId)
        {
            var value = await _context.Categories.FindAsync(categoryId);

            if (value != null)
            {
                _context.Categories.Remove(value);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.AsNoTracking().ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid categoryId)
        {
            return await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == categoryId);
        }

        public async Task UpdateAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }
    }
}
