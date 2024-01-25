import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay) // resolve func được pass vào as a argument, và được thực thi sau delay miliseconds
    })
}

// baseURL, còn chi tiết là gì thì tý nữa mới thêm
axios.defaults.baseURL = 'http://localhost:5000/api'


// Thiết lập interceptor khi mà response nhận được. Truyền vào trong use một callback function
// Tức là khi response được nhận thì cái hàm đó sẽ được thực hiện
// Ở đây là sleep rồi return response
// ìf an error occurs during the delay, it catches the error.
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000)
        return response
    } catch (error) {
        console.log(error)
        return await Promise.reject(error)
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)

}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'), // cứ hiểu rằng list ở đây là một cái hàm nặc danh ;
    // return axios.get('/activities').then(responseBody)
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>(`/activities`, activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

const agent = {
    Activities
}
export default agent;