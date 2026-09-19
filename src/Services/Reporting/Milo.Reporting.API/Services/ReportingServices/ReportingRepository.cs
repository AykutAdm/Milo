using Microsoft.EntityFrameworkCore;
using Milo.Reporting.API.Context;
using Milo.Reporting.API.DTOs;
using Milo.Reporting.API.Entities;

namespace Milo.Reporting.API.Services.ReportingServices
{
    public class ReportingRepository : IReportingRepository
    {
        private readonly ReportingDbContext _context;

        public ReportingRepository(ReportingDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(ReportingSubscription reportingSubscription)
        {
            await _context.ReportingSubscriptions.AddAsync(reportingSubscription);
            await _context.SaveChangesAsync();
        }

        public async Task<decimal> GetMonthlyTotalAsync(Guid userId)
        {
            var values = await _context.ReportingSubscriptions.Where(x => x.UserId == userId).ToListAsync();
            return values.Sum(x => x.Period == "Yıllık" ? x.Price / 12 : x.Price);
        }

        public async Task<List<CategorySpendResult>> GetSpendByCategoryAsync(Guid userId)
        {
            var values = await _context.ReportingSubscriptions.Where(x => x.UserId == userId).ToListAsync();

            return values
                .GroupBy(x => x.CategoryName)
                .Select(y => new CategorySpendResult
                {
                    CategoryName = y.Key,
                    MonthlyTotal = y.Sum(x => x.Period == "Yıllık" ? x.Price / 12 : x.Price)
                }).ToList();
        }
    }
}
