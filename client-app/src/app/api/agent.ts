import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';


const sleep = (deley: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, deley)
	})
}


axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async respone => {
	try {
		await sleep(1000)
		return respone
	} catch (error) {
		console.log(error);
		return await Promise.reject(error)
	}
})


const resposneBody = <T>(resposne: AxiosResponse<T>) => resposne.data;


const request = {
	get: <T>(url: string) => axios.get<T>(url).then(resposneBody),
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(resposneBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(resposneBody),
	del: <T>(url: string) => axios.delete<T>(url).then(resposneBody),
}

const Activities = {
	list: () => request.get<Activity[]>('/activities'),
	details: (id: string) => request.get<Activity>(`/activities/${id}`),
	create: (activity:Activity) => request.post<void>('/activities', activity),
	update: (activity:Activity,id: string) => request.put<void>(`/activities/${id}`, activity),
	delete: (id: string) => request.del<void>(`/activities/${id}`),
}


const agent = {
	Activities
}

export default agent