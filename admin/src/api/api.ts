import axiosInstance from "./config";
import { LoginData } from '@/types/user';


export const apiLoginAdmin = async(data: LoginData)=>{
    try {
        const response = await axiosInstance.post('token/', data)
        return response.data
    } catch (error: any) {
        console.log('Error in apiLoginAdmin:', error.response?.data);
        throw error;
    }
}