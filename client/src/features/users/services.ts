import { AWSApis, BaseApis } from "../../app/api/agent";

//@ts-ignore
import dataURLtoBlob from 'blueimp-canvas-to-blob';

export const UploadUserImageService = async (base64: string, publicRead: boolean) => {
    const blob: BlobPart = dataURLtoBlob(base64);
    const body = new File(
        [blob],
        '',
        { type: 'image/png' }
    );

    const extension = body.type.replace("image/", "");
    const headers = {
        'Content-Type': body.type,
        'X-AMZ-Tagging': `public=${publicRead}`,
    };

    const {url, fileName} = await BaseApis.generatePresignedUrl({
        FileExtension: extension,
        ContentLength: body.size
    });
    await AWSApis.putS3BucketObject(url, body, headers);
    return {
        fileName: fileName
    };
}