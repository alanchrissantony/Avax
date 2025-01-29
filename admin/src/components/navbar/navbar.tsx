import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import "@/components/navbar/navbar.css"
import Notification from "../svg/notification";
import { toast } from "sonner";
import { logout } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function Navbar() {

    const dispatch = useDispatch<AppDispatch>();
        const router = useRouter()
    
        const handleLogout = () => {
            try {
                dispatch(logout())
                router.push('/login');
            } catch (err) {
                toast.error(err instanceof Error ? err.message : 'Logout failed. Please try again.');
            }
        }

    return (
        <div className="flex justify-between w-full h-20 p-5">
            <Input
                classNames={{
                    base: "w-2/3 lg:w-1/3 h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper:
                        "h-full font-normal text-default-500 bg-default-500/20 dark:bg-default-500/20",
                }}
                className="my-auto"
                placeholder="Search"
                size="sm"
                startContent={
                    <div className="mr-2">
                        <SearchIcon size={18} />
                    </div>
                }
            />
            <div className="flex w-2/4 sm:w-1/4 md:w-1/6 justify-around">
                <div className="notificationSection my-auto cursor-pointer">
                    <div className="notificationContainer">
                        <Notification />
                        <span></span>
                    </div>
                </div>

                <div className="userSection my-auto cursor-pointer" onClick={handleLogout}>
                    <div className="userContainer">
                        <div className="userTitle">
                            <Image
                                src="/img/profile.jpg"
                                width={42}
                                height={42}
                                alt="Picture of the author"
                                className='profile-rounded'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
