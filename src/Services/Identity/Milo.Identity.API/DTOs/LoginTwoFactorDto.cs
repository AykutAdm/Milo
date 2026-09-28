namespace Milo.Identity.API.DTOs
{
    public class LoginTwoFactorDto
    {
        public string UserId { get; set; }
        public string Code { get; set; }
    }
}
