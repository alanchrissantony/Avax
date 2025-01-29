"use client"

import '@/components/sidebar/sidebar.css'
import Image from 'next/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch } from 'react-redux'
import { logout } from "@/slices/authSlice";
import { AppDispatch } from "@/store/store";
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import HomeIcon from '@/components/svg/home'
import RecentIcon from '@/components/svg/recent'
import ArtistsIcon from '@/components/svg/artists'
import AlbumsIcon from '@/components/svg/albums'
import SongsIcon from '@/components/svg/songs'
import UserIcon from '@/components/svg/user'
import MenuIcon from '@/components/svg/menu'
import { DownArrowIcon, UpArrowIcon, FilledUpArrow } from '@/components/svg/arrows'
import AppIcon from '@/components/svg/app'
import AddIcon from '@/components/svg/add'
import Link from 'next/link'
import { useState } from 'react'
import SearchIcon from '@/components/svg/search'



export default function Sidebar() {

    const pathname = usePathname();
    const isActive = (route: string) => pathname === route;

    const menuItems = [
        { name: 'Home', icon: HomeIcon, route: '/' },
        { name: 'Search', icon: SearchIcon, route: '/search' },
        { name: 'Recently Added', icon: RecentIcon, route: '/recently' },
        { name: 'Artists', icon: ArtistsIcon, route: '/artists' },
        { name: 'Albums', icon: AlbumsIcon, route: '/albums' },
        { name: 'Songs', icon: SongsIcon, route: '/songs' },
        { name: 'Made for you', icon: UserIcon, route: '/madeforyou' },
    ];

    const [isVisible, setIsVisible] = useState(true);

    const togglePlaylist = () => {
        setIsVisible(!isVisible);
    };

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const handleLogout = () => {
        try {
            dispatch(logout());
            router.push('/login')
        } catch (err) {
            toast.error('Logout failed. Please try again.');

        }
    }


    return (
        <div className="w-full hidden md:inline">
            <div className="header-container">
                <div className="header">
                    <div className="logoSection hidden lg:inline">
                        <h1 className="logo">Avax</h1>
                        <span>All Music</span>
                    </div>
                    <div className="MenuSection">
                        <button className="menu">
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="body-container">
                    {menuItems.map(({ name, icon: Icon, route }) => (
                        <Link key={name} href={route}>
                            <div className={`menu-items ${isActive(route) ? 'active' : ''} cursor-pointer`}>
                                <Icon />
                                <span className="hidden lg:inline">&nbsp;&nbsp;{name}</span>
                            </div>
                        </Link>
                    ))}
                    <div className="playlistContainer">
                        {/* Title with click handler */}
                        <div className="playlistTitle cursor-pointer" onClick={togglePlaylist}>
                            <h3 className="hidden lg:inline">Playlist</h3>
                            {isVisible? <UpArrowIcon /> : <DownArrowIcon/>}
                        </div>

                        {/* Playlists with transition */}
                        <div
                            className={`playlistContentContainer ${isVisible ? "visible" : ""
                                }`}
                        >
                            <div className="playlist-content">
                                <AppIcon />
                                <span className="hidden lg:inline">&nbsp;&nbsp;All Playlists</span>
                            </div>
                            <div className="playlist-content">
                                <Image
                                    src="/img/goodvibes.jpg"
                                    width={32}
                                    height={32}
                                    alt="Good Vibes Only"
                                    className="image-rounded"
                                />
                                <span className="hidden lg:inline">&nbsp;&nbsp;Good Vibes Only</span>
                            </div>
                            <div className="playlist-content">
                                <Image
                                    src="/img/tomorrowland.jpg"
                                    width={32}
                                    height={32}
                                    alt="Tomorrowland"
                                    className="image-rounded"
                                />
                                <span className="hidden lg:inline">&nbsp;&nbsp;Tomorrowland</span>
                            </div>
                            <div className="playlist-content">
                                <Image
                                    src="/img/edm.jpg"
                                    width={32}
                                    height={32}
                                    alt="Edm Playlist"
                                    className="image-rounded"
                                />
                                <span className="hidden lg:inline">&nbsp;&nbsp;Edm Playlist</span>
                            </div>
                            <div className="playlist-content">
                                <Image
                                    src="/img/goodvibes.jpg"
                                    width={32}
                                    height={32}
                                    alt="Good Vibes Only"
                                    className="image-rounded"
                                />
                                <span className="hidden lg:inline">&nbsp;&nbsp;Good Vibes Only</span>
                            </div>
                            <div className="playlist-content">
                                <Image
                                    src="/img/tomorrowland.jpg"
                                    width={32}
                                    height={32}
                                    alt="Tomorrowland"
                                    className="image-rounded"
                                />
                                <span className="hidden lg:inline">&nbsp;&nbsp;Tomorrowland</span>
                            </div>
                            <div className="playlist-content">
                                <Image
                                    src="/img/edm.jpg"
                                    width={32}
                                    height={32}
                                    alt="Edm Playlist"
                                    className="image-rounded"
                                />
                                <span className="hidden lg:inline">&nbsp;&nbsp;Edm Playlist</span>
                            </div>
                            <div className="playlist-content">
                                <div className="addIcon">
                                    <AddIcon />
                                </div>
                                <span className="hidden lg:inline">&nbsp;&nbsp;Add Playlist</span>
                            </div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <div className="userSection">
                            <DropdownMenuTrigger>
                                <div className="userContainer">
                                    <div className="userTitle">
                                        <Image
                                            src="/img/profile.jpg"
                                            width={42}
                                            height={42}
                                            alt="Picture of the author"
                                            className='profile-rounded'
                                        />
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;Angel</span>
                                    </div>
                                    <FilledUpArrow />
                                </div>
                            </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Account</DropdownMenuItem>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}