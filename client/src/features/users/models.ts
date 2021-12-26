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
    ImageName: string;
}

export interface UploadUserImageParameters {
    base64: string;
    publicRead: boolean;
}