export interface LoginResult {
    token: string;
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface User {
    username: string;
    displayName: string;
    email: string;
}