"use client";

import Link from "next/link";
import '@/app/(auth)/signup/signup.css';
import PasswordRequirements from "@/components/signup/requirements";
import PasswordField from "@/components/auth/passwordField";
import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from "react";
import { registerUser, verifyUser } from "@/slices/authSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from 'next/navigation';
import OtpPage from "@/components/auth/otp";
import { toast } from "sonner"


export default function SignupPage() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const authState = useSelector((state: RootState) => state.auth);


    const [email, setEmail] = useState('');
    const [reqPassNum, setReqPassNum] = useState<boolean>(false);
    const [reqPassSpecChar, setReqPassSpecChar] = useState<boolean>(false);
    const [reqMinLen, setReqMinLen] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');


    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setReqPassNum(/[0-9]/.test(newPassword));
        setReqPassSpecChar(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
        setReqMinLen(newPassword.length >= 10);
    };

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
    };

    const handleOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOtp = e.target.value;
        setOtp(newOtp);  
    }

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(registerUser({ email, password, otp })).unwrap();
            router.push('/login')
        } catch (err) {
            toast.error("Registration failed. Please try again.", {
                description: `${err}` || 'Registration failed.',
              })
        }

    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(verifyUser({ email, registered: false })).unwrap();
            setIsOtpSent(true)   
        } catch (err) {
            toast.error("Varification failed. Please try again.", {
                description: `${err}` || "Varification failed.",
              })
            
        }

    };

    return (
        <section className="md:flex justify-center items-center h-screen">
            <div className="signupSection lg:w-6/12 xl:5/12 m-auto">
                <div className="container sm:10/12 md:w-6/12 grid-cols-1 m-auto text-center pt-10">
                    {isOtpSent ? <OtpPage otp={otp} handleOtp={handleOtp} handleRegister={handleRegister}/> : (<>
                        <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">Sign up to <br />start listening</h1>
                        <form onSubmit={handleSubmit} className="signupForm">
                            <div className="form mt-5 text-left">
                                <div className="email grid-cols-1">
                                    <label className="text-xs font-bold" htmlFor="email">Email or username</label>
                                    <input className="auth" type="email" name="email" placeholder="Email or username" required onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <PasswordField
                                    password={password}
                                    handlePassword={handlePassword}
                                    name={'Password'}
                                />
                                <PasswordField
                                    password={confirmPassword}
                                    handlePassword={handleConfirmPassword}
                                    name={'Confirm password'}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 pt-3 gap-2">
                                    <PasswordRequirements
                                        reqPassNum={reqPassNum}
                                        reqPassSpecChar={reqPassSpecChar}
                                        reqMinLen={reqMinLen}
                                        password={password}
                                        confirmPassword={confirmPassword}
                                    />
                                </div>
                            </div>
                            <button
                                className={`signupBtn text-sm font-extrabold ${!(reqPassNum && reqPassSpecChar && reqMinLen && password === confirmPassword) ? "opacity-50 cursor-not-allowed" : ""}`}
                                disabled={!(reqPassNum && reqPassSpecChar && reqMinLen && password === confirmPassword)}
                            >
                                Continue
                            </button>
                        </form>
                    </>)}
                    {error && <p className="text-red-500">{error}</p>}
                    <span className="signup-split mb-5">or</span>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="google col-span-1">
                            <button className="signup-button text-sm font-bold items-center justify-center space-x-2 px-4 py-2">
                                <span className="flex items-center">
                                    <div className="social-auth"><span><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" ><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg></span></div>
                                </span>
                            </button>
                        </div>
                        <div className="facebook col-span-1">
                            <button className="signup-button text-sm font-bold items-center justify-center space-x-2 px-4 py-2">
                                <span className="flex items-center">
                                    <div className="social-auth"><span><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48" >
                                        <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                                    </svg></span></div>
                                </span>
                            </button>
                        </div>
                        <div className="apple col-span-1">
                            <button className="signup-button text-sm font-bold items-center justify-center space-x-2 px-4 py-2">
                                <span className="flex items-center">
                                    <div className="social-auth"><span><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50"
                                        style={{ fill: "#FFFFFF" }}>
                                        <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                                    </svg></span></div>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <hr className="hr-footer" />
                <div className="footer">
                    <div className="signup text-center text-sm">
                        <span>Already have an account? <Link href={"/login"}><span>Log in here</span></Link></span>
                    </div>
                    <div className="end text-center">
                        <span className="text-xs">This site is protected by reCAPTCHA and includes the Google Privacy Policy and Terms of Service.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}