﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.ViewModels
{
    public class ViewRegisterModel
    {
        [Required]
        [EmailAddress]
        public string userName { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

    }
}
