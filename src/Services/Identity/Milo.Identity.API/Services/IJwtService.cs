using Milo.Identity.Persistence.Entities;

namespace Milo.Identity.API.Services
{
    public interface IJwtService
    {
        Task<string> GenerateToken(AppUser appUser);
    }
}
