"use client"

import '@/components/sidebar/sidebar.css'
import { useRouter, usePathname } from 'next/navigation';
import Artist from '@/components/svg/artists'
import Menu from '@/components/svg/menu'
import Users from '@/components/svg/users'
import Campaigns from '@/components/svg/campaigns'
import Dashboard from '@/components/svg/dashboard'
import Releases from '@/components/svg/releases'
import Analytics from '@/components/svg/analytics'
import Settings from '@/components/svg/settings'
import Link from "next/link";


export default function Sidebar() {


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
        <div className="w-full hidden md:inline">
            <div className="header-container">
                <div className="header">
                    <div className="logoSection hidden lg:inline">
                        <h1 className="logo">Avax</h1>
                        <span>Admin</span>
                    </div>
                    <div className="MenuSection">
                        <button className="menu">
                            <Menu />
                        </button>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="body-container">
                    <div className="body">
                        {menuItems.map(({ name, icon: Icon, route }) => (
                            <Link key={name} href={route}>
                                <div className={`menu-items ${isActive(route) ? 'active' : ''} cursor-pointer`}>
                                    <Icon fill={isActive(route) ? 'white' : '#666'} />
                                    <span className="hidden lg:inline">&nbsp;&nbsp;{name}</span>
                                </div>
                            </Link>
                        ))}
                        <span className='settings'>
                            <Link href="/settings">
                                <div className={`menu-items ${isActive('/settings') ? 'active' : ''} cursor-pointer`}>
                                    <Settings fill={isActive('/settings') ? 'white' : '#666'} />
                                    <span className='hidden lg:inline'>&nbsp;&nbsp;Settings</span>
                                </div>
                            </Link>
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}