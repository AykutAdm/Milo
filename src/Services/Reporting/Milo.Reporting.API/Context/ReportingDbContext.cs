using Microsoft.EntityFrameworkCore;
using Milo.Reporting.API.Entities;

namespace Milo.Reporting.API.Context
{
    public class ReportingDbContext : DbContext
    {
        public ReportingDbContext(DbContextOptions<ReportingDbContext> options) : base(options)
        {
        }
        public DbSet<ReportingSubscription> ReportingSubscriptions { get; set; }
    }
}
