import "@/app/password-reset/password-reset.css";
import React from "react";

interface OtpPageProps {
    otp: string;
    handleOtp: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
}


const OtpPage: React.FC<OtpPageProps>  = ({ otp, handleOtp, handleRegister }) => {
    return (
        <form onSubmit={handleRegister}>
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">Verify your account</h1>
            <span className="text-sm">Enter the OTP sent to your registered email to verify your account.</span>
            <div className="form mt-5 text-left">
                <div className="email grid-cols-1">
                    <label className="text-xs font-bold" htmlFor="otp">One time password</label>
                    <input className="auth" type="text" placeholder="OTP" value={otp} onChange={handleOtp} required />
                </div>
            </div>

            <button type="submit" className="signupBtn text-sm font-extrabold">Verify</button>
        </form>
    )
}

export default OtpPage;