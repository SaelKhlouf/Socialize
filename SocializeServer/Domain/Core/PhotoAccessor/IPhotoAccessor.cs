using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Core.PhotoAccessor
{
    public interface IPhotoAccessor
    {
        public PreSignedUrl GeneratePreSignedUrlForUpload(Enums.ProfilePictureExtension extension, long contentLength);
        public Task<IEnumerable<string>> GetUserPhotosByPrefixAsync(string prefix);
        public Task DeletePhotoAsync(string key);
    }
}
