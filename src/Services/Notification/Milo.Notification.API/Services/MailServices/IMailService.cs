namespace Milo.Notification.API.Services.MailServices
{
    public interface IMailService
    {
        Task SendAsync(string toEmail, string subject, string body);
    }
}
