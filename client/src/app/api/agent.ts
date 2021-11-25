import axios, { AxiosResponse } from "axios";
import { Activity, DataList } from "../models/activity";

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
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