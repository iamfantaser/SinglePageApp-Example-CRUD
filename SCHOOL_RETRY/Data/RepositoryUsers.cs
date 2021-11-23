using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SCHOOL_RETRY.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.Data
{
    public class RepositoryUsers:IRepositoryUsers
    {
        private readonly AppDbContext _ctx;
        public RepositoryUsers(AppDbContext ctx)
        {
            _ctx = ctx;
        }
      
        public List<ApplicationUser> GetAllProfiles()
        {

            return _ctx.AppUsers.ToList();
        }
        public List<AppIdentityUser> GetAllIdentities()
        {
            return _ctx.Users.ToList();
        }
      
        public AppIdentityUser GetIdentity(string id)
        {
            return _ctx.Users.Include(i=>i.AppUser).FirstOrDefault(u => u.AppUser.ApplicationUserId == id);
        }

        public ApplicationUser GetProfile(string id)
        {
            var res = _ctx.AppUsers.Include(i => i.IdentityOfUser).FirstOrDefault(p => p.ApplicationUserId == id);
            return res;
        }
      
        public void UpdateProfile(ApplicationUser ApplicationUser)
        {
            try
            {
               var res = _ctx.AppUsers.Update(ApplicationUser);
               if (!res.IsKeySet)
                    Console.WriteLine("unset");
               else
                    _ctx.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public void UpdateIdentity(AppIdentityUser IdentityUser)
        {
            try
            {
                var res = _ctx.Users.Update(IdentityUser);
                if (!res.IsKeySet)
                    Console.WriteLine("unset");
                else
                    _ctx.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        
        public void RemoveUser(string id)
        {
            try
            {
                var res = _ctx.Users.Remove(GetIdentity(id));
                if (!res.IsKeySet)
                    Console.WriteLine("unset");
                else
                    _ctx.SaveChanges();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public async Task<bool> SaveChangesAsync()
        {
            if (await _ctx.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

    }
    public interface IRepositoryUsers
    {
        List<ApplicationUser> GetAllProfiles();
        List<AppIdentityUser> GetAllIdentities();

        AppIdentityUser GetIdentity(string id);

        ApplicationUser GetProfile(string id);

        void UpdateProfile(ApplicationUser ApplicationUser);
        void UpdateIdentity(AppIdentityUser IdentityUser);
        void RemoveUser(string id);
        Task<bool> SaveChangesAsync();
    }
}

