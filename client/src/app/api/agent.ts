import axios, { AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";
import { DataList } from "../../common/models";
import { Activity } from "../../features/activities/models";
import { User, UserLoginResult } from "../../features/users/models";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use(async (request) => {
    const jwt = window.localStorage.getItem(LOCAL_STORAGE_KEYS.JWT);
    request.headers['authorization'] = `Bearer ${jwt}`;
    return request;
});

//First parameter is when success, second is when fail (error thrown)
axios.interceptors.response.use(async (response) => {
    await sleep(1000);
    return response;


// , async (error: AxiosError) => {
//     const status = error.response?.status!;

//     switch(status){
//         case 500:
//             toast.error('Internal server error.');
//             break;
//         case 400:
//             if(error.response?.data.errors){
//                 toast.error('Validation errors.');
//             } else {
//                 toast.error('Bad request error.');
//             }
//             break;
//         case 401:
//             toast.error('Authentication error.');
//             break;
//         case 404:
//             toast.error('Not found.');
//             break;
//     }

//     return Promise.reject(error);


});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const Requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body?: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body?: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

export const ActivitiesApis = {
    list: () => Requests.get<DataList<Activity>>("/Activities"),
    details: (id: string) => Requests.get<Activity>(`/Activities/${id}`),
    create: (body: {}) => Requests.post<Activity>("/Activities", body),
    update: ({id, body}: {id: string, body: {}}) => Requests.put<Activity>(`/Activities/${id}`, body),
    delete: async (id: string) => {
        await Requests.delete<void>(`/Activities/${id}`)
        return id;
    },
}

export const UsersApis = {
    login: (body: {}) => Requests.post<UserLoginResult>("/Account/login", body),
    register: (body: {}) => Requests.post<User>("/Account/register", body),
}

//Sleep is to simulate real requests, so that we wait some seconds to the request to finish..
const sleep = (delay: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    })
}