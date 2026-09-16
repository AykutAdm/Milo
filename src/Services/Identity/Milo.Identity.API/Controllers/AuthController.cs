using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Milo.Identity.API.DTOs;
using Milo.Identity.API.Services;
using Milo.Identity.Persistence.Entities;

namespace Milo.Identity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtService _jwtService;

        public AuthController(UserManager<AppUser> userManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.Email,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "Kayıt başarılı." });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Email veya şifre hatalı." });
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, loginDto.Password);
            if (!isPasswordValid)
            {
                return Unauthorized(new { message = "Email veya şifre hatalı." });
            }

            var token = await _jwtService.GenerateToken(user);

            var response = new LoginResponseDto
            {
                Token = token,
                Id = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl
            };

            return Ok(response);
        }
    }
}
