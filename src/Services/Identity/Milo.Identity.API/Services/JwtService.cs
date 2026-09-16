using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Milo.Identity.Persistence.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Milo.Identity.API.Services
{
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;

        public JwtService(IConfiguration configuration, UserManager<AppUser> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }

        public async Task<string> GenerateToken(AppUser appUser)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var roles = await _userManager.GetRolesAsync(appUser);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, appUser.Id),
                new Claim(ClaimTypes.Email, appUser.Email!),
                new Claim(ClaimTypes.Name, appUser.FirstName),
                new Claim(ClaimTypes.Surname, appUser.LastName)
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(jwtSettings["ExpireMinutes"]!)),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
