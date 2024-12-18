import Link from "next/link";
import "@/app/password-reset/password-reset.css";

export default function OtpPage() {
    return (
        <>
            <div className="container sm:10/12 md:w-6/12 grid-cols-1 m-auto text-center pt-10">
                <h1 className="text-3xl lg:text-4xl font-extrabold mb-5">Reset your password</h1>
                <span className="text-sm">Enter the OTP sent to your registered email to verify your account.</span>
                <div className="form mt-5 text-left">
                    <div className="email grid-cols-1">
                        <label className="text-xs font-bold" htmlFor="otp">One time password</label>
                        <input className="auth" type="text" placeholder="OTP" required />
                    </div>
                </div>

                <button className="signupBtn text-sm font-extrabold">Verify</button>


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
        </>
    )
}