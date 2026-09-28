using MassTransit;
using Microsoft.EntityFrameworkCore;
using Milo.Messaging.Events;
using Milo.Notification.API.Context;
using Milo.Notification.API.Entities;
using Milo.Notification.API.Services.MailServices;

namespace Milo.Notification.API.Consumers
{
    public class RenewalReminderConsumer : IConsumer<RenewalReminderEvent>
    {
        private readonly NotificationDbContext _context;
        private readonly IMailService _mailService;

        public RenewalReminderConsumer(NotificationDbContext context, IMailService mailService)
        {
            _context = context;
            _mailService = mailService;
        }

        public async Task Consume(ConsumeContext<RenewalReminderEvent> context)
        {
            var message = context.Message;

            var notification = new UserNotification
            {
                UserNotificationId = Guid.NewGuid(),
                UserId = message.UserId,
                Title = "Yenileme Hatırlatması",
                Message = $"{message.PlatformName} aboneliğin {message.DaysLeft} gün sonra " + $"yenilenecek ve hesabından, {message.Price}₺ çekilecek.",
                IsRead = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.UserNotifications.Add(notification);
            await _context.SaveChangesAsync();

            //Find User email
            var userEmail = await _context.UserEmails.FirstOrDefaultAsync(x => x.UserId == message.UserId);

            if (userEmail is not null)
            {
                var subject = "Milo — Yenileme Hatırlatması 🔔";

                var body = $@"
<!DOCTYPE html>
<html>
<body style='margin:0; padding:0; background-color:#09090b; font-family:-apple-system, Segoe UI, Roboto, Arial, sans-serif;'>
  <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='background-color:#09090b; padding:40px 20px;'>
    <tr>
      <td align='center'>
        <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='max-width:480px; background-color:#18181b; border:1px solid #27272a; border-radius:16px; overflow:hidden;'>

          <!-- Üst şerit -->
          <tr>
            <td style='background:linear-gradient(135deg, #2563eb, #06b6d4); padding:28px 32px; text-align:center;'>
              <div style='font-size:22px; font-weight:700; color:#ffffff;'>🐧 Milo</div>
              <div style='font-size:13px; color:rgba(255,255,255,0.8); margin-top:4px;'>Yenileme Hatırlatması</div>
            </td>
          </tr>

          <!-- İçerik -->
          <tr>
            <td style='padding:32px;'>
              <p style='font-size:16px; color:#fafafa; margin:0 0 20px;'>Merhaba 👋</p>

              <p style='font-size:15px; color:#a1a1aa; line-height:1.6; margin:0 0 24px;'>
                <strong style='color:#fafafa;'>{message.PlatformName}</strong> aboneliğin
                <strong style='color:#60a5fa;'>{message.DaysLeft} gün</strong> sonra yenilenecek.
              </p>

              <!-- Tutar kutusu -->
              <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='background-color:#09090b; border:1px solid #27272a; border-radius:12px; margin-bottom:24px;'>
                <tr>
                  <td style='padding:20px; text-align:center;'>
                    <div style='font-size:13px; color:#71717a; margin-bottom:6px;'>Yenileme Tutarı</div>
                    <div style='font-size:28px; font-weight:700; color:#fafafa;'>{message.Price}₺</div>
                  </td>
                </tr>
              </table>

              <p style='font-size:14px; color:#71717a; line-height:1.6; margin:0;'>
                Harcamalarını kontrol altında tutmak için Milo'ya göz at.
                Yenilemek istemiyorsan aboneliğini iptal etmeyi unutma.
              </p>
            </td>
          </tr>

          <!-- Alt -->
          <tr>
            <td style='padding:20px 32px; border-top:1px solid #27272a; text-align:center;'>
              <div style='font-size:12px; color:#52525b;'>
                Bu e-posta Milo tarafından otomatik gönderildi.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

                await _mailService.SendAsync(userEmail.Email, subject, body);
            }
        }
    }
}
