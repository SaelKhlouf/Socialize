using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Amazon.Runtime;
using Domain.Core.Common;
using Domain.Core.UserAccessor;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Domain.Core.PhotoAccessor
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly IAmazonS3 _s3Client;
        private readonly Config _config;
        private readonly IUserAccessor _userAccessor;
        private readonly ILogger<PhotoAccessor> _logger;
        private readonly Utilities _utilities;

        public PhotoAccessor(Config config, IUserAccessor userAccessor, ILogger<PhotoAccessor> logger, Utilities utilities)
        {
            _config = config;
            _userAccessor = userAccessor;
            _logger = logger;
            _utilities = utilities;

            var awsCredentials = new BasicAWSCredentials(_config.AWS.AccessKey, _config.AWS.SecretKey);
            var bucketRegion = RegionEndpoint.EnumerableAllRegions.FirstOrDefault(p => p.SystemName.ToLower() == _config.AWS.S3.Region);
            _s3Client = new AmazonS3Client(awsCredentials, bucketRegion);
        }

        public PreSignedUrl GeneratePreSignedUrlForUpload(Enums.ProfilePictureExtension extension, long contentLength)
        {
            var maxContentLength = _config.FileUpload.UserProfilePicture.MaxFileUploadSizeInMB * 1000000;
            if (contentLength > maxContentLength)
            {
                throw new BadHttpRequestException($"Content length exceeded max file size to upload: {_config.FileUpload.UserProfilePicture.MaxFileUploadSizeInMB} MBs.");
            }

            var currentUser = _userAccessor.GetCurrentUser();
            var fileName = $@"{DateTime.Now.ToString("s")}.{extension}";

            var key = _utilities.ResolveS3ObjectKeyFromFileName(currentUser.Id, fileName);
            var expiry =
                DateTime.UtcNow.AddMinutes(_config.FileUpload.UserProfilePicture.PreSignedUrlDurationInMinutes);

            GetPreSignedUrlRequest request = new GetPreSignedUrlRequest
            {
                BucketName = _config.AWS.S3.BucketName,
                Key = key,
                Expires = expiry,
                Verb = HttpVerb.PUT,
                Headers =
                {
                    ContentLength = contentLength,
                    ContentType = $@"image/{extension}"
                }
            };

            request.Headers["x-amz-tagging"] = "public=true";
            return new PreSignedUrl()
            {
                Url = _s3Client.GetPreSignedURL(request),
                FileName = fileName
            };
        }

        public async Task<IEnumerable<string>> GetUserPhotosByPrefixAsync(string prefix)
        {
            var listRequest = new ListObjectsV2Request
            {
                BucketName = _config.AWS.S3.BucketName,
                Prefix = prefix
            };

            var listResponse = await _s3Client.ListObjectsV2Async(listRequest);
            return listResponse.S3Objects.Select(p => _utilities.ResolveS3ObjectUrlFromKey(p.Key));
        }

        public async Task DeletePhotoAsync(string key)
        {
            var deleteRequest = new DeleteObjectRequest
            {
                BucketName = _config.AWS.S3.BucketName,
                Key = key
            };

            var deleteResponse = await _s3Client.DeleteObjectAsync(deleteRequest);

            if (deleteResponse.HttpStatusCode != HttpStatusCode.NoContent)
            {
                throw new Exception("Delete operation failed");
            }
        }
    }
}
