using Milo.Subscription.Application.Interfaces.Services;
using System.Security.Claims;

namespace Milo.Subscription.API.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public Guid GetUserId()
        {
            var userIdString = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdString))
            {
                throw new UnauthorizedAccessException("Kullanıcı kimliği bulunamadı.");
            }
              
            return Guid.Parse(userIdString);
        }
    }
}
