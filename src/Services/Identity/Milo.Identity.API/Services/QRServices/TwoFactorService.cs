using Microsoft.AspNetCore.Identity;
using Milo.Identity.API.DTOs.QRDtos;
using Milo.Identity.Persistence.Entities;
using QRCoder;

namespace Milo.Identity.API.Services.QRServices
{
    public class TwoFactorService : ITwoFactorService
    {
        private readonly UserManager<AppUser> _userManager;

        public TwoFactorService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ResultTwoFactorSetupDto> GenerateSetupAsync(AppUser user)
        {
            var key = await _userManager.GetAuthenticatorKeyAsync(user);
            if (string.IsNullOrEmpty(key))
            {
                await _userManager.ResetAuthenticatorKeyAsync(user);
                key = await _userManager.GetAuthenticatorKeyAsync(user);
            }

            var email = await _userManager.GetEmailAsync(user);
            var uri = $"otpauth://totp/Milo:{email}?secret={key}&issuer=Milo&digits=6";


            using var generator = new QRCodeGenerator();
            using var data = generator.CreateQrCode(uri, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(data);
            var qrBytes = qrCode.GetGraphic(20);
            var qrBase64 = Convert.ToBase64String(qrBytes);

            return new ResultTwoFactorSetupDto
            {
                SharedKey = key!,
                QrCodeUri = uri,
                QrCodeImageBase64 = $"data:image/png;base64,{qrBase64}"
            };
        }

        public async Task<bool> VerifyCodeAsync(AppUser user, string code)
        {
            var cleanCode = code.Replace(" ", "").Replace("-", "");

            return await _userManager.VerifyTwoFactorTokenAsync(user, _userManager.Options.Tokens.AuthenticatorTokenProvider, cleanCode);
        }
    }
}
