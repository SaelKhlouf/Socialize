using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Core.PhotoAccessor
{
    public class GeneratePreSignedUrRequest
    {
        public Enums.ProfilePictureExtension FileExtension { get; set; }
        public long ContentLength { get; set; }
    }

    public class PreSignedUrlDto
    {
        public string Url { get; set; }
    }
}
