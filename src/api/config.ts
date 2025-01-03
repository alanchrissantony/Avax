import axios from 'axios';
import { getAccessToken } from '../utils/getToken'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/users/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config)=>{
        const token = getAccessToken()

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },(error)=>{
        return Promise.reject(error)
    }
)

export default axiosInstance