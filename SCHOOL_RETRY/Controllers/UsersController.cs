using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SCHOOL_RETRY.Controllers.ControllerHelpers;
using SCHOOL_RETRY.Models;
using SCHOOL_RETRY.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using SCHOOL_RETRY.Data;
using System.Security.Claims;
using System.Reflection;
using SCHOOL_RETRY.Services;
using Microsoft.Extensions.Logging;

namespace SCHOOL_RETRY.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles ="Admin")]
    public class UsersController : Controller
    {
       
        private readonly IRepositoryUsers _repo;
        private readonly AppDbContext _ctx;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IEmailSender emailSender, ILoggerFactory loggerFactory, AppDbContext ctx, IRepositoryUsers repo, UserManager<AppIdentityUser> userMgr)
        {
            _repo = repo;
            _ctx = ctx;
            _userManager = userMgr;
            _emailSender = emailSender;
            _logger = loggerFactory.CreateLogger<UsersController>();
        }

        //GET api/users
        [HttpGet]
        public IEnumerable<ApplicationUser> Get()
        {
            
            var res = HttpContext.User.Claims;
            var sdf = HttpContext.Request.Headers;
            var users =  _repo.GetAllProfiles();
            return users;
        }

        //GET api/users/id
        
        [HttpGet("{id}", Name = "GetContact")]
        public async Task<ViewApplicationUser> GetUser(string id)
        {
            var  user =  _repo.GetProfile(id);
            if (user == null)
                return null;
            var valueUser = new ViewApplicationUser
            {
                Id = user.ApplicationUserId,
                UserName = user.IdentityOfUser.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic,
                Gender =user.Gender,
                UniqId =user.UniqId,
                Age = user.Age,
                Email = user.IdentityOfUser.Email,
                Belongings =user.Belongings              
                
            };
        
            IList<string> res = await _userManager.GetRolesAsync(user.IdentityOfUser);
            valueUser.Roles = res.ToArray();
            return valueUser;
        }

        // GET api/contacts/?=
        
        [HttpGet("search")]
        public IEnumerable<ApplicationUser> Search(string q)
        {
            return _ctx.AppUsers.
            Where((c) => c.LastName.ToLower().Contains(q.ToLower()) || c.FirstName.ToLower().Contains(q.ToLower())).
            OrderBy((o) => o.LastName);
        }

        //Post api/users
       
        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ViewApplicationUser vm)
        {

            var user = new AppIdentityUser
            {
                UserName = vm.UserName,
                Email = vm.Email,

            };
            Guid gu = Guid.NewGuid();
            string TempPass = Convert.ToBase64String(gu.ToByteArray());
            TempPass = TempPass.Replace("=", "");
            TempPass = TempPass.Replace("+", "");
            var appUser = new ApplicationUser
            {

                AppIdentityUserId = user.Id,
                FirstName = vm.FirstName,
                LastName = vm.LastName,
                Patronymic = vm.Patronymic,
                Gender = vm.Gender,
                Age = vm.Age,
                UniqId = vm.UniqId,

            };
            //if (!user.EmailConfirmed  )
            //{
            //    // Send email confirmation email
            //    var confirmToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            //    var emailConfirmUrl = Url.RouteUrl("ConfirmEmail", new { uid = user.Id, token = confirmToken }, this.Request.Scheme);
            //    await _emailSender.SendEmailAsync(user.Email, "Please confirm your account",
            //            $"Please confirm your account by clicking this <a href=\"{emailConfirmUrl}\">link</a>."
            //    );

            //    _logger.LogInformation($"Sent email confirmation email (id: {user.Id})");
            //}
            IdentityResult result = await _userManager.CreateAsync(user, TempPass);
            await _userManager.AddToRolesAsync(user, vm.Roles);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            var profile = await _ctx.AppUsers.AddAsync(appUser);
            await _ctx.SaveChangesAsync();
            return Ok();
        }

        // PUT api/contacts/5
       
        [HttpPut("{id}")]
        public  async Task<IActionResult> Edit(string id, [FromBody]ViewApplicationUser vm)
        {
            var currentIdentity = _repo.GetIdentity(id);

            if(currentIdentity == null)
            {
                var error = new { StatusText = "There is no item with this id" };
                return BadRequest(error);
            }

            var differencesIdentity = vm.DiffUpdateProperties(currentIdentity);
            ApplicationUser userRef = currentIdentity.AppUser;
            vm.UpdatePropsOfObject(ref userRef);
            IList<string> roles = await _userManager.GetRolesAsync(currentIdentity);
            List<string> arrayToAction = new List<string>();

            if (roles.Count < vm.Roles.Count)
            {
                for (int i = 0; i < vm.Roles.Count; i++)
                {
                    if (!roles.Contains(vm.Roles[i]))
                    {
                        arrayToAction.Add(vm.Roles[i]);
                    }
                }
                await _userManager.AddToRolesAsync(currentIdentity, arrayToAction);
            }
            else if(roles.Count > vm.Roles.Count)
            {
                for (int i = 0; i < roles.Count; i++)
                {
                    if (!vm.Roles.Contains(roles[i]))
                    {
                        arrayToAction.Add(vm.Roles[i]);
                    }
                }
                await _userManager.RemoveFromRolesAsync(currentIdentity
                    , arrayToAction);
            }
            else if (roles.Count == vm.Roles.Count)
            {
                for (int i = 0; i < roles.Count; i++)
                {
                    if (!vm.Roles.Contains(roles[i]))
                    {
                        await _userManager.RemoveFromRoleAsync(currentIdentity, roles[i]);
                    }
                    if (!roles.Contains(vm.Roles[i]))
                    {
                        await _userManager.AddToRoleAsync(currentIdentity, vm.Roles[i]);
                    }
                }
            }
            _repo.UpdateProfile(userRef);
            _repo.UpdateIdentity(differencesIdentity);
            return Ok();
        }

        // DELETE api/contacts/5
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(string id)
        {
            _repo.RemoveUser(id);
            await _repo.SaveChangesAsync();
            return Ok();
        }


       
    }

  
}
