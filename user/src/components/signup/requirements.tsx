import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import '@/components/components.css'


interface PasswordRequirementsProps {
    reqPassNum: boolean;
    reqPassSpecChar: boolean;
    reqMinLen: boolean;
    password: string;
    confirmPassword: string;
  }

export default function PasswordRequirements({
    reqPassNum,
    reqPassSpecChar,
    reqMinLen,
    password,
    confirmPassword,
  }:PasswordRequirementsProps) {
    return (
        <>
            <span className="text-dark text-xs col-span-1 flex justify-start">
                {reqPassNum ? <CheckCircleIcon style={{ fill: "#1DB954", fontSize: "18px" }}/> : <PanoramaFishEyeIcon style={{ fill: "#666", fontSize: "18px" }}/>}&nbsp;1 number
            </span>
            <span className="text-dark text-xs col-span-1 flex justify-start">
                {reqPassSpecChar ? <CheckCircleIcon style={{ fill: "#1DB954", fontSize: "18px" }}/> : <PanoramaFishEyeIcon style={{ fill: "#666", fontSize: "18px" }}/>}&nbsp;special character
            </span>
            <span className="text-dark text-xs col-span-1 flex justify-start">
                {reqMinLen ? <CheckCircleIcon style={{ fill: "#1DB954", fontSize: "18px" }}/> : <PanoramaFishEyeIcon style={{ fill: "#666", fontSize: "18px" }}/>}&nbsp;10 characters
            </span>
            <span className="text-dark text-xs col-span-1 flex justify-start">
                {password === confirmPassword && password.length > 0 ? <CheckCircleIcon style={{ fill: "#1DB954", fontSize: "18px" }}/> : <PanoramaFishEyeIcon style={{ fill: "#666", fontSize: "18px" }}/>}&nbsp;Confirm password
            </span>
        </>
    );
}