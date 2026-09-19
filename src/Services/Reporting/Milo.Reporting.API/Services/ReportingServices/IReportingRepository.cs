using Milo.Reporting.API.DTOs;
using Milo.Reporting.API.Entities;

namespace Milo.Reporting.API.Services.ReportingServices
{
    public interface IReportingRepository
    {
        Task AddAsync(ReportingSubscription reportingSubscription); 
        Task<decimal> GetMonthlyTotalAsync(Guid userId);
        Task<List<CategorySpendResult>> GetSpendByCategoryAsync(Guid userId);
    }
}
