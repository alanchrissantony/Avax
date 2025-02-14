import "@/components/navbar/navbar.css"
import { logout } from "@/slices/authSlice";
import { AppDispatch } from "@/store/store";
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { MenuListIcon, MenuVerticalIcon } from "@/components/svg/menu";
import Link from "next/link";
import NotificationIcon from "@/components/svg/notification";


export default function Navbar() {

    const navItems = [
        { name: 'Dashboard', route: '/dashboard' },
        { name: 'Releases', route: '/releases' },
        { name: 'Audience', route: '/audience' },
        { name: 'Analytics', route: '/analytics' },
    ];

    const pathname = usePathname();
    const isActive = (route: string) => pathname === route;

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
        <nav className="w-full h-[4rem] flex items-center">
            <div className="flex justify-between items-center h-full cursor-pointer">
                <MenuVerticalIcon />
            </div>
            <div className="flex justify-between items-center cursor-pointer" onClick={handleLogout}>
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
            <div className="flex justify-around items-center w-6/12 lg:w-4/12 mx-auto">
                {navItems.map(({ name, route }) => (
                    <Link key={name} href={route}>
                        <span className={`${isActive(route)? "text-white" : "text-gray-500"} cursor-pointer`}>{name}</span>
                    </Link>
                ))}
            </div>

            <div className="notificationSection my-auto cursor-pointer flex justify-around items-center gap-6">
                <div className="notificationContainer">
                    <NotificationIcon />
                    <span></span>
                </div>
            </div>
        </nav>
    )
}