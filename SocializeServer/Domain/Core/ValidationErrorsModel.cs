using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Core
{
    public class ValidationErrorsModel
    {
        public string Message { get; set; }
        public List<string> Errors { get; set; }
    }
}
