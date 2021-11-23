using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.Models
{
    public class AppIdentityUser:IdentityUser
    {
        
        public ApplicationUser AppUser { get; set; }
    }
}
