using SCHOOL_RETRY.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.ViewModels
{
    public class ViewApplicationRoles
    {
        [Required]
        public string Name;
        public IEnumerable<ApplicationRole> roles;
    }
}
