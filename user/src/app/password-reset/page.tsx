"use client"

import Link from "next/link";
import "@/app/password-reset/password-reset.css";
import { useState } from "react";
import { registerUser, resetPassUser, verifyUser } from "@/reducer/authSlice";
import { AppDispatch, RootState } from "@/reducer/store";
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux'
import { toast } from "sonner"
import PasswordField from "@/components/auth/passwordField";
import PasswordRequirements from "@/components/signup/requirements";


export default function PasswordReset() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState<string>('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const [reqPassNum, setReqPassNum] = useState<boolean>(false);
    const [reqPassSpecChar, setReqPassSpecChar] = useState<boolean>(false);
    const [reqMinLen, setReqMinLen] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

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

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(resetPassUser({ email, password, otp }));
            router.push('/login')
        } catch (err) {
            toast.error('Action failed. Please try again.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(verifyUser({ email, registered: true }));
            setIsOtpSent(true)
        } catch (err) {
            toast.error("Varification failed", {
                description: "Please try again.",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            })

        }

    };

    return (
        <section className="md:flex justify-center items-center h-screen">
            <div className="signupSection lg:w-6/12 xl:5/12 m-auto">
                <div className="container sm:10/12 md:w-6/12 grid-cols-1 m-auto text-center pt-10">
                    {isOtpSent ?
                        <form onSubmit={handleReset}>
                            <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">Reset password</h1>
                            <span className="text-sm">Enter the OTP sent to your registered email to verify your account.</span>
                            <div className="form mt-5 text-left">
                                <div className="email grid-cols-1">
                                    <label className="text-xs font-bold" htmlFor="otp">One time password</label>
                                    <input className="auth" type="text" placeholder="OTP" value={otp} onChange={handleOtp} required />
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
                        : (<>
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">Reset your password</h1>
                                <span className="text-sm">Enter the email address or username linked to your Avax account and we'll send you an email.</span>
                                <div className="form mt-5 text-left">
                                    <div className="email grid-cols-1">
                                        <label className="text-xs font-bold" htmlFor="email">Email or username</label>
                                        <input className="auth" type="email" placeholder="Email or username" onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                </div>

                                <button className="signupBtn text-sm font-extrabold" type="submit">Continue</button>
                            </form>
                        </>)}
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