namespace Milo.Identity.API.DTOs.QRDtos
{
    public class ResultTwoFactorSetupDto
    {
        public string SharedKey { get; set; }
        public string QrCodeUri { get; set; }
        public string QrCodeImageBase64 { get; set; }
    }
}
