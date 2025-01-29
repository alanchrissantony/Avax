import axiosInstance from "./config";
import { LoginData } from '@/types/user';


export const apiLoginAdmin = async(data: LoginData)=>{
    try {
        const response = await axiosInstance.post('auth/token/', data)
        return response.data
    } catch (error: any) {
        console.log('Error in apiLoginAdmin:', error.response?.data);
        throw error;
    }
}

export const apiFetchArtists = async()=>{
    try {
        const response = await axiosInstance.get('artists/')
        return response.data
    } catch (error: any) {
        console.log('Error in apiFetchArtists:', error.response?.data);
        throw error;
    }
}

export const apiVerifyArtist = async(email: string)=>{
    try {
        const response = await axiosInstance.patch('artists/verify/', email)
        return response.data
    } catch (error: any) {
        console.log('Error in apiVerifyArtist:', error.response?.data);
        throw error;
    }
}