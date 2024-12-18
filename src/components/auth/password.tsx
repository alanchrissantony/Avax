export default function PasswordPage() {
    <>
        <div className="password">
            <label className="text-xs font-bold" htmlFor="password">Password</label>
            <input className="auth" type="password" placeholder="Password" required />
        </div>
        <div className="password">
            <label className="text-xs font-bold" htmlFor="password">Confirm password</label>
            <input className="auth" type="password" placeholder="Confirm password" required />
        </div>
    </>
}