﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Core.PhotoAccessor
{
    public interface IPhotoAccessor
    {
        public string GeneratePreSignedUrl(Enums.ProfilePictureExtension extension, long contentLength);
    }
}