using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Core.UserAccessor;

namespace Domain.Core.Common
{
    public class Utilities
    {
        private readonly Config _config;
        private readonly IUserAccessor _userAccessor;

        public Utilities(Config config, IUserAccessor userAccessor)
        {
            _config = config;
            _userAccessor = userAccessor;
        }
        public string ResolveS3ObjectUrlFromKey(string key)
        {
            var region = _config.AWS.S3.Region;
            var bucketName = _config.AWS.S3.BucketName;
            return @$"https://{bucketName}.s3.{region}.amazonaws.com/{key}";
        }

        public string ResolveS3ObjectKeyFromFileName(Guid userId, string fileName)
        {
            return $@"{_config.AWS.S3.UsersPhotosPath}/{userId}/{fileName}";
        }
    }
}
