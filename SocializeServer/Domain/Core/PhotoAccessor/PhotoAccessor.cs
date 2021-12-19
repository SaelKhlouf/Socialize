using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Linq;
using Amazon.Runtime;
using Domain.Core.UserAccessor;
using Microsoft.AspNetCore.Http;

namespace Domain.Core.PhotoAccessor
{
    public class PhotoAccessor: IPhotoAccessor
    {
        private readonly IAmazonS3 _s3Client;
        private readonly Config _config;
        private readonly IUserAccessor _userAccessor;

        public PhotoAccessor(Config config, IUserAccessor userAccessor)
        {
            _config = config;
            _userAccessor = userAccessor;

            var awsCredentials = new BasicAWSCredentials(_config.AWS.AccessKey, _config.AWS.SecretKey);
            var bucketRegion = RegionEndpoint.EnumerableAllRegions.FirstOrDefault(p => p.SystemName.ToLower() == _config.AWS.S3.Region);
            _s3Client = new AmazonS3Client(awsCredentials, bucketRegion);
        }

        public string GeneratePreSignedUrl(Enums.ProfilePictureExtension extension, long contentLength)
        {
            var maxContentLength = _config.FileUpload.UserProfilePicture.MaxFileUploadSizeInMB * 1000000;
            if (contentLength > maxContentLength)
            {
                throw new BadHttpRequestException($"Content length exceeded max file size to upload: {_config.FileUpload.UserProfilePicture.MaxFileUploadSizeInMB} MBs.");
            }

            var currentUser = _userAccessor.GetCurrentUser();
            GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
            {
                BucketName = _config.AWS.S3.BucketName,
                Key =  $@"${currentUser.Id}.${extension}",
                Expires = DateTime.UtcNow.AddMinutes(_config.FileUpload.UserProfilePicture.PreSignedUrlDurationInMinutes),
                Verb = HttpVerb.PUT,
                Headers = {ContentLength = contentLength}
            };
            return _s3Client.GetPreSignedURL(request);
        }
    }
}
