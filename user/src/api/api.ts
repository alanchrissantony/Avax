import axiosInstance from "./config";
import { RegisterData, LoginData, VerifyData, ResetData } from '@/types/user';

export const apiRegisterUser = async(data: RegisterData)=>{
    const response = await axiosInstance.post('register/', data)
    return response.data
}

export const apiVerifyUser = async(data: VerifyData)=>{
    const response = await axiosInstance.post('verify/', data)
    return response.data
}

export const apiLoginUser = async(data: LoginData)=>{
    const response = await axiosInstance.post('token/', data)
    return response.data
}

export const apiResetPassUser = async(data: ResetData)=>{
    const response = await axiosInstance.post('reset/', data)
    return response.data
}