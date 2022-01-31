import { AWSApis, BaseApis } from "../../app/api/agent";
import { UploadUserImageParameters } from "./models";

export const UploadUserImageService = async ({blob, publicRead}: UploadUserImageParameters) => {
    const file = new File(
        [blob],
        '',
        { type: 'image/png' }
    );

    const extension = file.type.replace("image/", "");
    const headers = {
        'Content-Type': file.type,
        'X-AMZ-Tagging': `public=${publicRead}`,
    };

    const {url, fileName} = await BaseApis.generateUploadPresignedUrl({
        FileExtension: extension,
        ContentLength: file.size
    });
    await AWSApis.putS3BucketObject(url, file, headers);
    
    return {
        image: fileName
    };
}