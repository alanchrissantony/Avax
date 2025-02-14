import SearchComponent from "@/components/search";
import { TrackAddIcon } from "@/components/svg/add";
import ExplicitIcon from "@/components/svg/explicit";
import { MenuHorizontalIcon } from "@/components/svg/menu";
import ShareIcon from "@/components/svg/share";
import SortIcon from "@/components/svg/sort";
import Image from "next/image";
import Link from "next/link";

export default function ReleasesPage() {

    const description = `Hey everyone, it's Roby Fayer here. I'm all about making music that hits you in the feels - 
        whether it's indie vibes or something more aggressive. Can't wait to share more heartfelt tunes with you all soon!`;
    return (
        <main className="flex">
            <section className="w-full lg:w-9/12">
                <div className="w-11/12 m-auto pt-5">
                    <div className="flex justify-between">
                        <p className="text-lg font-bold pb-5">Recently released</p>
                        <div className="flex justify-between gap-x-4">
                            <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full">
                                <SearchComponent />
                            </div>
                            <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#333]">
                                <Link href={'/releases/add'}><TrackAddIcon size="20px" fill="#808080" /></Link>
                            </div>
                            <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full bg-[#333]">
                                <SortIcon size="20px" fill="#808080" />
                            </div>
                        </div>
                    </div>


                    <table className="w-full table-auto">
                        <tbody>
                            <tr className="odd:bg-[#303030] hover:bg-[#404040] cursor-pointer">
                                <td className="px-4 py-2 flex items-center gap-x-2">
                                    <Image
                                        src="/img/indie.jpg"
                                        width={48}
                                        height={48}
                                        alt="Edm Playlist"
                                        className="rounded-md"
                                    />
                                    <div className="flex items-center gap-2">
                                        <ExplicitIcon />
                                        <span>Freak Me</span>
                                    </div>
                                </td>
                                <td></td>
                                <td className="px-4 py-2 text-center">6,146,935</td>
                                <td className="px-4 py-2 text-center">03:15</td>
                                <td className="px-4 py-2 text-right">
                                    <MenuHorizontalIcon fill="#1DB954" size="24px" />
                                </td>
                            </tr>
                            <tr className="odd:bg-[#303030] hover:bg-[#404040]">
                                <td className="px-4 py-2 flex items-center gap-x-2">
                                    <Image
                                        src="/img/edm.jpg"
                                        width={48}
                                        height={48}
                                        alt="Edm Playlist"
                                        className="rounded-md"
                                    />
                                    <div className="flex items-center gap-2">
                                        <ExplicitIcon />
                                        <span>Freak Me</span>
                                    </div>
                                </td>
                                <td></td>
                                <td className="px-4 py-2 text-center">6,146,935</td>
                                <td className="px-4 py-2 text-center">03:15</td>
                                <td className="px-4 py-2 text-right">
                                    <MenuHorizontalIcon fill="#1DB954" size="24px" />
                                </td>
                            </tr>
                            <tr className="odd:bg-[#303030] hover:bg-[#404040]">
                                <td className="px-4 py-2 flex items-center gap-x-2">
                                    <Image
                                        src="/img/tomorrowland.jpg"
                                        width={48}
                                        height={48}
                                        alt="Edm Playlist"
                                        className="rounded-md"
                                    />
                                    <div className="flex items-center gap-2">
                                        <ExplicitIcon />
                                        <span>Freak Me</span>
                                    </div>
                                </td>
                                <td></td>
                                <td className="px-4 py-2 text-center">6,146,935</td>
                                <td className="px-4 py-2 text-center">03:15</td>
                                <td className="px-4 py-2 text-right">
                                    <MenuHorizontalIcon fill="#1DB954" size="24px" />
                                </td>
                            </tr>
                            <tr className="odd:bg-[#303030] hover:bg-[#404040]">
                                <td className="px-4 py-2 flex items-center gap-x-2">
                                    <Image
                                        src="/img/goodvibes.jpg"
                                        width={48}
                                        height={48}
                                        alt="Edm Playlist"
                                        className="rounded-md"
                                    />
                                    <div className="flex items-center gap-2">
                                        <ExplicitIcon />
                                        <span>Freak Me</span>
                                    </div>
                                </td>
                                <td></td>
                                <td className="px-4 py-2 text-center">6,146,935</td>
                                <td className="px-4 py-2 text-center">03:15</td>
                                <td className="px-4 py-2 text-right">
                                    <MenuHorizontalIcon fill="#1DB954" size="24px" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <aside className="hidden md:inline w-3/12 top-16 h-[calc(100vh-4rem)] sticky  bg-[#111]">
                <div className="w-full m-auto">
                    <div className="relative">
                        <Image
                            src="/img/tomorrowland.jpg"
                            width={300}
                            height={300}
                            alt="Edm Playlist"
                            className="rounded-md"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-5">
                            <div className="group flex justify-between items-center w-full">
                                <div>
                                    <p className="text-md font-bold text-white">That's So True</p>
                                    <p className="text-sm text-gray-300">Gracie Abrams</p>
                                </div>
                                <div className="cursor-pointer transition-all duration-300 ease-in-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                    <ShareIcon size="24px" fill="#808080" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-10/12 m-auto pt-5">
                    <div className="relative">
                        <div className="relative w-full" style={{ aspectRatio: '4 / 2' }}>
                            <Image
                                src="/img/profile.jpg"
                                fill
                                alt="Edm Playlist"
                                className="rounded-md object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col justify-start p-5">
                            <div className="group flex justify-between items-center w-full">
                                <p className="text-lg font-bold">About the artist</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-[#222] p-5 rounded-md mt-2 text-white">
                        <p className="text-lg font-bold">Gracie Abrams</p>
                        <p className="text-medium text-gray-300 pt-2">10,063,181 monthly listeners</p>
                        <p className="text-sm text-gray-300 leading-relaxed pt-2">{description.substring(0, 104)}...</p>
                    </div>
                </div>
            </aside>
        </main>
    )
}