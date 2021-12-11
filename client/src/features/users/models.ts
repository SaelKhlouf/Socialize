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
}