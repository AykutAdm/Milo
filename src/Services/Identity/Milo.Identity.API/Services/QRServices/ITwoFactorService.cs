using Milo.Identity.API.DTOs.QRDtos;
using Milo.Identity.Persistence.Entities;

namespace Milo.Identity.API.Services.QRServices
{
    public interface ITwoFactorService
    {
        Task<ResultTwoFactorSetupDto> GenerateSetupAsync(AppUser user);
        Task<bool> VerifyCodeAsync(AppUser user, string code);
    }
}
