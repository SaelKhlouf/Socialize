using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Core.PhotoAccessor
{
    public class GeneratePreSignedUrRequest
    {
        public string FileExtension { get; set; }
        public long ContentLength { get; set; }
    }

    public class PreSignedUrl
    {
        public string Url { get; set; }
        public string FileName { get; set; }
    }

    public class PreSignedUrlDto
    {
        public string Url { get; set; }
        public string FileName { get; set; }
    }
}
