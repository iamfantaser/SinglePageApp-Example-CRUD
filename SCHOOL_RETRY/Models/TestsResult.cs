using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SCHOOL_RETRY.Models
{
    public class TestsResult
    {
        public string Id { get; set; }
        public int Result { get; set; }
        public string Wrong { get; set; }
        public string Correct { get; set; }
        public string Answers { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string TestId { get; set; }
        public Test Test { get; set; }
    }
}
