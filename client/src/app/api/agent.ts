import axios, { AxiosError, AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";
import { DataList } from "../../common/models";
import { Activity, CreateActivityModel, EditActivityModel } from "../../features/activities/models";
import { GeneratePresignedUrlRequest, GeneratePresignedUrlResult, SetUserThumbnailRequest, User, UserLoginRequest, UserLoginResult, UserRegisterRequest } from "../../features/users/models";
import { URLS } from "./constants";

axios.interceptors.request.use(async (request) => {
    switch(request.baseURL){
        case URLS.BASE_API:
            const jwt = window.localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);
            request.headers['authorization'] = `Bearer ${jwt}`;
            break;

        default:
    }
    return request;
});

//First parameter is when success, second is when fail (error thrown)
axios.interceptors.response.use(async (response) => {
    await sleep(1000);
    return response;
},async (error: AxiosError) => {
    return Promise.reject(error);
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const baseApiConfig = {
    baseURL: URLS.BASE_API
}

export const Requests = {
    get: <T>(url: string) => axios.get<T>(url, baseApiConfig).then(responseBody),
    post: <T>(url: string, body?: {}) => axios.post<T>(url, body, baseApiConfig).then(responseBody),
    put: <T>(url: string, body?: {}) => axios.put<T>(url, body, baseApiConfig).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url, baseApiConfig).then(responseBody),
}

export const ActivitiesApis = {
    list: () => Requests.get<DataList<Activity>>("/Activities"),
    details: (id: string) => Requests.get<Activity>(`/Activities/${id}`),
    create: (body: CreateActivityModel) => Requests.post<Activity>("/Activities", body),
    update: (body: EditActivityModel) => Requests.put<Activity>(`/Activities/${body.id}`, body),
    delete: async (id: string) => {
        await Requests.delete<void>(`/Activities/${id}`);
        return id;
    },
    attend: (id: string) => {
        Requests.post<void>(`/Activities/${id}/attend`);
        return id;
    },
    unattend: (id: string) => {
        Requests.post<void>(`/Activities/${id}/un-attend`);
        return id;
    },
}

export const UsersApis = {
    login: (body: UserLoginRequest) => Requests.post<UserLoginResult>("/Accounts/login", body),
    register: (body: UserRegisterRequest) => Requests.post<User>("/Accounts/register", body),
    setThumbnail: (body: SetUserThumbnailRequest) => Requests.put<User>("/Accounts/thumbnail", body),
}

export const BaseApis = {
    generatePresignedUrl: (body: GeneratePresignedUrlRequest) => Requests.post<GeneratePresignedUrlResult>("/generate-presigned-url", body),
}

//External

const ExternalRequests = {
    put: <T>(url: string, body?: any, headers?: any) => axios.put<T>(url, body, {
        baseURL: URLS.AWS_S3_PRESIGNED,
        headers
    }).then(responseBody),
}

export const AWSApis = {
    putS3BucketObject: async (url: string, body: any, headers?: any) => await ExternalRequests.put<void>(url, body, headers)
}


//Sleep is to simulate real requests, so that we wait some seconds to the request to finish..
const sleep = (delay: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    })
}