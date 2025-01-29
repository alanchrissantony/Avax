import axios from 'axios';
import { getAccessToken } from '@/utils/getAccessToken'
import { getRefreshToken } from '@/utils/getRefreshToken'
import { setToken } from '@/reducer/helper';

const refreshAccessToken = async()=>{
    try {
        const refreshToken = await getRefreshToken()
        
        const response = await axios.post('http://127.0.0.1:8000/api/user/auth/token/refresh/', {
            refresh: refreshToken,
        });
        const { access } = response.data;
        await setToken(access);
        return access;
    } catch (error: any) {
        console.error('Failed to refresh access token', error);
        throw error;
    }
}

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/user/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config)=>{
        const token = await getAccessToken()
        
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },(error)=>{
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    }, async(error)=>{
        const originalRequest = error.config
        const refreshToken = await getRefreshToken()
        if(refreshToken && error.response.status == 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const newToken = await refreshAccessToken();

                if(newToken){
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                }
            }catch(refreshError){
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance