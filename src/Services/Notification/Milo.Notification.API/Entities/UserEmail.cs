namespace Milo.Notification.API.Entities
{
    public class UserEmail
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Email { get; set; }
    }
}
