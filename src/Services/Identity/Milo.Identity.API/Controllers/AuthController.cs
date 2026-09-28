using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Milo.Identity.API.DTOs;
using Milo.Identity.API.DTOs.ChangeSettingDtos;
using Milo.Identity.API.DTOs.QRDtos;
using Milo.Identity.API.Services;
using Milo.Identity.API.Services.QRServices;
using Milo.Identity.Persistence.Entities;
using Milo.Messaging.Events;
using System.Security.Claims;

namespace Milo.Identity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtService _jwtService;
        private readonly ITwoFactorService _twoFactorService;
        private readonly IPublishEndpoint _publishEndpoint;

        public AuthController(UserManager<AppUser> userManager, IJwtService jwtService, ITwoFactorService twoFactorService, IPublishEndpoint publishEndpoint)
        {
            _userManager = userManager;
            _jwtService = jwtService;
            _twoFactorService = twoFactorService;
            _publishEndpoint = publishEndpoint;
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

            await _publishEndpoint.Publish(new UserRegisteredEvent
            {
                UserId = Guid.Parse(user.Id),
                Email = user.Email
            });

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

            //If 2factor enabled, ask code
            if (user.TwoFactorEnabled)
            {
                return Ok(new LoginResponseDto
                {
                    RequiresTwoFactor = true,
                    UserId = user.Id
                });
            }

            var token = await _jwtService.GenerateToken(user);

            var response = new LoginResponseDto
            {
                RequiresTwoFactor = false,
                Token = token,
                UserId = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl
            };

            return Ok(response);
        }




        [Authorize]
        [HttpGet("2fa/setup")]
        public async Task<IActionResult> Setup2fa()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId!);

            if (user is null)
            {
                return Unauthorized();
            }

            var setup = await _twoFactorService.GenerateSetupAsync(user);

            return Ok(new
            {
                sharedKey = setup.SharedKey,
                qrCodeImage = setup.QrCodeImageBase64
            });
        }


        [Authorize]
        [HttpPost("2fa/enable")]
        public async Task<IActionResult> Enable2fa(Verify2faDto verify2FaDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByIdAsync(userId!);
            if (user is null)
            {
                return Unauthorized();
            }


            var isValid = await _twoFactorService.VerifyCodeAsync(user, verify2FaDto.Code);
            if (!isValid)
            {
                return BadRequest(new { message = "Kod hatalı. Tekrar deneyin." });
            }

            await _userManager.SetTwoFactorEnabledAsync(user, true);

            return Ok(new { message = "İki faktörlü doğrulama etkinleştirildi." });
        }


        [Authorize]
        [HttpPost("2fa/disable")]
        public async Task<IActionResult> Disable2fa()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId!);

            if (user is null)
            {
                return Unauthorized();
            }

            await _userManager.SetTwoFactorEnabledAsync(user, false);
            await _userManager.ResetAuthenticatorKeyAsync(user);

            return Ok(new { message = "İki faktörlü doğrulama kapatıldı." });
        }


        [HttpPost("login/2fa")]
        public async Task<IActionResult> LoginWith2fa(LoginTwoFactorDto dto)
        {
            var user = await _userManager.FindByIdAsync(dto.UserId);

            if (user is null)
            {
                return Unauthorized();
            }

            var isValid = await _twoFactorService.VerifyCodeAsync(user, dto.Code);
            if (!isValid)
            {
                return Unauthorized(new { message = "Kod hatalı." });
            }

            var token = await _jwtService.GenerateToken(user);

            var response = new LoginResponseDto
            {
                RequiresTwoFactor = false,
                Token = token,
                UserId = user.Id,
                Email = user.Email!,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ProfileImageUrl = user.ProfileImageUrl
            };

            return Ok(response);
        }


        [Authorize]
        [HttpGet("2fa/status")]
        public async Task<IActionResult> Get2faStatus()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
            {
                return Unauthorized();
            }

            var result = user.TwoFactorEnabled;

            return Ok(new { result });
        }

        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile(UpdateProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId!);

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "Profil güncellendi." });
        }


        [Authorize]
        [HttpPut("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId!);
            if (user is null)
            {
                return Unauthorized();
            }


            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok(new { message = "Şifre başarıyla değiştirildi." });
        }
    }
}
