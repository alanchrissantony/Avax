import Analytics from "@/components/svg/analytics";
import Artist from "@/components/svg/artists";
import Campaigns from "@/components/svg/campaigns";
import Dashboard from "@/components/svg/dashboard";
import Releases from "@/components/svg/releases";
import Users from "@/components/svg/users";
import Link from "next/link";
import '@/components/sidebar/sidebar.css'
import { usePathname } from "next/navigation";

export default function Taskbar() {

    const pathname = usePathname();
    const isActive = (route: string) => pathname === route;

    const menuItems = [
        { name: 'Dashboard', icon: Dashboard, route: '/' },
        { name: 'Releases', icon: Releases, route: '/releases' },
        { name: 'Analytics', icon: Analytics, route: '/analytics' },
        { name: 'Campaigns', icon: Campaigns, route: '/campaigns' },
        { name: 'Artists', icon: Artist, route: '/artists' },
        { name: 'Users', icon: Users, route: '/users' },
    ];

    return (
        <div className="taskbar w-full h-[3rem] flex justify-around items-center">
            {menuItems.map(({ name, icon: Icon, route }) => (
                <Link key={name} href={route}>
                    <div className={`menu-items ${isActive(route) ? 'active' : ''} cursor-pointer`}>
                        <Icon fill={isActive(route) ? 'white' : '#666'} />
                    </div>
                </Link>
            ))}
        </div>
    )
}