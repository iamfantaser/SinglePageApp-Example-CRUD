﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SCHOOL_RETRY.Models;
using SCHOOL_RETRY.Services;
using SCHOOL_RETRY.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.Controllers
{
    [Authorize]
    public class AuthController : Controller
    {
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly SignInManager<AppIdentityUser> _signInManager;
        private readonly ILogger _logger;

        public AuthController(
            UserManager<AppIdentityUser> userManager,
            IOptions<IdentityOptions> identityOptions,
            SignInManager<AppIdentityUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _identityOptions = identityOptions;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<AuthController>();
        }

        [AllowAnonymous]
        [HttpPost("~/api/auth/login")]
        [Produces("application/json")]
        public async Task<IActionResult> Login(string username, string password)
        {
            // Ensure the username and password is valid.
            if (username == null || password == null)
                return BadRequest();
            var user = await _userManager.FindByNameAsync(username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return BadRequest(new
                {
                    error  = "", 
                    error_description = "The username or password is invalid."
                });
            }
            var result = await _signInManager.PasswordSignInAsync(username, password, false, false);
                    
            var role = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role[0])
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            _logger.LogInformation($"User logged in (id: {user.Id})");

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var a = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(jwt)
            };
            if (result.Succeeded)
                HttpContext.Response.Cookies.Append(".AspNetCore.Application.Id", a.token,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromMinutes(AuthOptions.LIFETIME)
                });

            return Ok(result);
        }
  
        [HttpPost("~/api/auth/logout")]
        [Produces("application/json")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            HttpContext.Response.Cookies.Delete(".AspNetCore.Application.Id");
            return Ok();
        }

       /* [AllowAnonymous]
        [HttpGet("~/api/auth/check")]
        [Produces("application/json")]
        public async Task<IActionResult> CheckisAuth(string keystring)
        {

        }*/

        [AllowAnonymous]
        [HttpGet("~/api/auth/confirm", Name = "ConfirmEmail")]
        public async Task<IActionResult> Confirm(string uid, string token)
        {
            var user = await _userManager.FindByIdAsync(uid);
            var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
            if (confirmResult.Succeeded)
            {
                return Redirect("/?confirmed=1");
            }
            else
            {
                return Redirect("/error/email-confirm");
            }
        }
    }
   }
