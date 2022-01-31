export interface UserLoginResult {
    token: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserRegisterRequest {
    userName: string;
    displayName: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    userName: string;
    displayName: string;
    email: string;
    thumbnail?: string;
    photos: string[];
}

export interface GeneratePresignedUrlRequest {
    FileExtension: string;
    ContentLength: number;
}

export interface GeneratePresignedUrlResult {
    url: string;
    fileName: string;
}

export interface SetUserThumbnailRequest {
    imageName: string;
}

export interface UploadUserImageParameters {
    blob: Blob;
    publicRead: boolean;
}

export interface DeleteUserImageRequest {
    imageName: string;
}