import axios, { AxiosResponse } from "axios";
import { Activity, DataList } from "../models/activity";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
});

axios.interceptors.request.use(async request => {
    //just for testing purposes
    request.headers["Authorization"] = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIwMTA2ODM2Zi0zODQ1LTQ5MTEtYjVhZC0zZWJjOTA3ZWY0ZmEiLCJlbWFpbCI6InNhZWwua2hsb3VmM0BnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6InNhZWwzIiwibmJmIjoxNjM3NDQwNTE1LCJleHAiOjE2Mzc0ODM3MTUsImlhdCI6MTYzNzQ0MDUxNX0.wDcvpt6nGS3ThR7WTO6uit7LJZiTuCQJ3FIpZAJSk7Y8xQTu4L38oE87HpZkXQxOk0JkPJfVqCQ7k-hN8TCU0Q";
    return request;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

export const ActivitiesApis = {
    list: () => requests.get<DataList<Activity>>("/Activities"),
    details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
    create: (body: {}) => requests.post<Activity>("/Activities", body),
    update: (body: {}) => requests.put<Activity>("/Activities", body),
    delete: (id: string) => requests.delete<void>(`/Activities/${id}`),
}

//Sleep is to simulate real requests, so that we wait some seconds to the request to finish..
const sleep = (delay: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    })
}