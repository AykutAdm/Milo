using Microsoft.EntityFrameworkCore;
using Milo.Subscription.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Persistence.Context
{
    public class SubscriptionDbContext : DbContext
    {

        public SubscriptionDbContext(DbContextOptions<SubscriptionDbContext> options) : base(options)
        {
        }


        public DbSet<UserSubscription> UserSubscriptions { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<AccountInfo> AccountInfos { get; set; }
    }
}
