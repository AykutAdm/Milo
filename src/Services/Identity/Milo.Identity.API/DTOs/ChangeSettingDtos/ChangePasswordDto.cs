namespace Milo.Identity.API.DTOs.ChangeSettingDtos
{
    public class ChangePasswordDto
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
