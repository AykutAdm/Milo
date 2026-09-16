namespace Milo.Identity.API.DTOs
{
    public class LoginResponseDto
    {
        public string Token { get; set; } = null!;
        public string Id { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ProfileImageUrl { get; set; }
    }
}
