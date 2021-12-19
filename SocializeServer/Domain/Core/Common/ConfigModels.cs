using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Core
{
    public class Config
    {
        public Logging Logging { get; set; }
        public ConnectionStrings ConnectionStrings { get; set; }
        public Jwt Jwt { get; set; }
        public AWS AWS { get; set; }
        public FileUpload FileUpload { get; set; }
    }

    public class Logging
    {
        public LogLevel LogLevel { get; set; }
    }

    public class LogLevel
    {
        public string Default { get; set; }
        public string Microsoft { get; set; }
        public string MicrosoftHostingLifetime { get; set; }
    }

    public class ConnectionStrings
    {
        public string SocializeDb { get; set; }
    }

    public class Jwt
    {
        public string JwtKey { get; set; }
        public string JwtExpiryInHours { get; set; }
    }

    public class AWS
    {
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public S3 S3 { get; set; }
    }

    public class S3
    {
        public string BucketName { get; set; }
        public string Region { get; set; }
    }

    public class UserProfilePicture
    {
        public long MaxFileUploadSizeInMB { get; set; }
        public long PreSignedUrlDurationInMinutes { get; set; }
    }

    public class FileUpload
    {
        public UserProfilePicture UserProfilePicture { get; set; }
    }
}
