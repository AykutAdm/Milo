using Microsoft.EntityFrameworkCore;
using Milo.Notification.API.Entities;

namespace Milo.Notification.API.Context
{
    public class NotificationDbContext : DbContext
    {
        public NotificationDbContext(DbContextOptions<NotificationDbContext> options) : base(options)
        {
        }

        public DbSet<UserNotification> UserNotifications { get; set; }
    }
}
