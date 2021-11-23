using SCHOOL_RETRY.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.ViewModels
{
    public class ViewApplicationUser
    {
        public string Id { get; set; }

        [Required]
        public string UserName { get; set; }
        [Required]
        [MaxLength(40)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(40)]
        public string LastName { get; set; }

        [MaxLength(60)]
        public string Patronymic { get; set; }

        [Required]
        public string Gender { get; set; }

        [StringLength(16, MinimumLength = 6)]
        public string UniqId { get; set; }

        public int Age { get; set; }

        public IList<string> Roles { get; set; }
        public string Email { get; set; }

        public string Belongings { get; set; }
       
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime Created { get; set; }

        public string IdentityId { get; set; }

    }
    public class ViewApp
    {
        public string id {get; set;}

        public string name { get; set; }

    }

}
