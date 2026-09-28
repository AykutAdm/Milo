namespace Milo.Identity.API.DTOs
{
    public class LoginResponseDto
    {
        public bool RequiresTwoFactor { get; set; }
        public string Token { get; set; }
        public string? UserId { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ProfileImageUrl { get; set; }
    }
}
