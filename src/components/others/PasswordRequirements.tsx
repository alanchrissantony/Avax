import { cn } from "@/lib/utils";
import { CheckCircleIcon, CircleIcon } from "../svg/check";

export default function PasswordRequirements({
    password,
    re_password,
    className,
}: {
    password: string;
    re_password: string;
    className?: string;
}) {
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
    const hasMinLength = password?.length >= 8;
    const passwordsMatch = password === re_password && password?.length > 0;

    const getIcon = (condition: boolean) =>
        condition ? <CheckCircleIcon fill="#00AFF0" size="18px" /> : <CircleIcon fill="#666" size="18px" />;

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-3", className)}>
            <span className="text-[#666] text-xs flex items-center">
                {getIcon(hasNumber)}&nbsp;1 number
            </span>
            <span className="text-[#666] text-xs flex items-center">
                {getIcon(hasSpecialChar)}&nbsp;special character
            </span>
            <span className="text-[#666] text-xs flex items-center">
                {getIcon(hasMinLength)}&nbsp;8 characters
            </span>
            <span className="text-[#666] text-xs flex items-center">
                {getIcon(passwordsMatch)}&nbsp;Confirm password
            </span>
        </div>

    );
}
