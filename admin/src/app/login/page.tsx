"use client";

import Link from "next/link";
import '@/app/login/login.css'
import '@/components/auth/style.css'
import { useEffect, useState } from "react";
import PasswordField from "@/components/auth/passwordField";
import { useSelector, useDispatch } from 'react-redux'
import { loginAdmin } from "@/reducer/authSlice";
import { AppDispatch, RootState } from "@/reducer/store";
import { useRouter } from 'next/navigation';
import { toast } from "sonner"

export default function LoginPage() {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const authState = useSelector((state: RootState) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        if(authState.admin){
            router.push('/')
        }
    }, [])

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nePassword = e.target.value
        setPassword(nePassword)

    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginAdmin({email, password}));
            router.push('/')
        } catch (err) {
            toast.error('Login failed. Please try again.');

        }
    }
    return (
        <section className="md:flex justify-center items-center h-screen">
            <div className="authSection lg:w-6/12 xl:5/12 m-auto">
                <div className="container sm:10/12 md:w-6/12 grid-cols-1 m-auto text-center pt-10">
                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">Log in to Avax</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form mt-5 text-left">
                            <div className="email grid-cols-1">
                                <label className="text-xs font-bold" htmlFor="email">Email or username</label>
                                <input className="auth" type="email" name="email" placeholder="Email or username" onChange={(e)=>setEmail(e.target.value)} required />
                            </div>
                            <PasswordField
                                password={password}
                                handlePassword={handlePassword}
                                name={'Password'}
                            />
                            <div className="check flex">
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </label>
                                <p className="text-xs font-bold">Remember me</p>
                            </div>
                        </div>
                        <button className="authBtn text-sm font-extrabold" type="submit">Log in</button>
                    </form>
                    <br />
                    <Link href={'/password-reset'}><span className="text-sm link">Forgot Password?</span></Link>
                </div>
                <hr />
                <div className="footer">
                    <div className="end text-center">
                        <span className="text-xs">This site is protected by reCAPTCHA and includes the Google Privacy Policy and Terms of Service.</span>
                    </div>
                </div>
            </div>
        </section>
    )
}