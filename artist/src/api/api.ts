import axiosInstance from "./config";
import { RegisterData, LoginData, VerifyData, ResetData } from '@/types/user';

export const apiRegisterUser = async(data: RegisterData)=>{
    try {
        const response = await axiosInstance.post('auth/register/', data)
        return response.data
    } catch (error: any) {
        console.log('Error in apiRegisterUser:', error.response?.data);
        throw error;
    }
}

export const apiVerifyUser = async(data: VerifyData)=>{
    try {
        const response = await axiosInstance.post('auth/verify/', data)
        return response.data
    } catch (error: any) {
        console.log('Error in apiVerifyUser:', error.response?.data);
        throw error;
    }
}

export const apiLoginUser = async(data: LoginData)=>{
    try {
        const response = await axiosInstance.post('auth/token/', data)
        return response.data
    } catch (error: any) {
        console.log('Error in apiLoginUser:', error.response?.data);
        throw error;
    }
}

export const apiResetPassUser = async(data: ResetData)=>{
    try {
        const response = await axiosInstance.post('auth/reset/', data)
        return response.data
    } catch (error: any) {
        console.log('Error in apiResetPassUser:', error.response?.data);
        throw error;
    }
}