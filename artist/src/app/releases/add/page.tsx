import AddIcon from "@/components/svg/add";
import { DownArrowIcon } from "@/components/svg/arrows";
import HelpIcon from "@/components/svg/help";
import { SearchSimpleIcon } from "@/components/svg/search";
import UploadIcon from "@/components/svg/upload";
import Image from "next/image";
import { Button } from "@heroui/button";
import Link from "next/link";


export default function ReleasesAddPage() {
    return (
        <main className="flex">
            <section className="w-full lg:w-8/12 h-screen overflow-y-auto scrollbar-hide">
                <section className="w-full border border-[#444]">
                    <div className="w-11/12 m-auto pt-7 pb-10">
                        <h3 className="text-lg font-bold">Release details</h3>
                        <div className="pt-7">
                            <span className="flex justify-between w-10/12">
                                <label className="text-sm text-white" htmlFor="name">Release name</label>
                                <HelpIcon />
                            </span>
                            <input type="text" name="name" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2" />
                            <br />
                            <span className="text-sm text-[#666]">Name of the single, EP, or album (without version info)</span>
                        </div>
                        <div className="pt-5">
                            <span className="flex justify-between w-10/12">
                                <label className="text-sm text-white" htmlFor="owner">Recording copyright owner</label>
                                <HelpIcon />
                            </span>
                            <input type="text" name="owner" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2" />
                        </div>
                        <div className="pt-5">
                            <span className="flex justify-between w-10/12">
                                <label className="text-sm text-white" htmlFor="owner">Upload track</label>
                                <HelpIcon />
                            </span>
                            <button type="button" name="name" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2 flex items-center justify-center"><UploadIcon fill="white" size="24px" />&nbsp;Upload track</button>
                        </div>
                    </div>
                </section>
                <section className="w-full border border-[#444]">
                    <div className="w-11/12 m-auto pt-7 pb-10">
                        <h3 className="text-lg font-bold">Artist details</h3>
                        <div className="pt-1">
                            <span className="flex justify-between w-10/12">
                                <label className="text-sm text-white" htmlFor="name"></label>
                                <HelpIcon />
                            </span>
                            <button type="button" name="name" className="w-10/12 h-[2.5rem] rounded-3xl bg-[#333] mt-2 flex items-center justify-center"><AddIcon size="24px" fill="#FFFFFF" /></button>
                        </div>
                        <h3 className="text-lg font-bold pt-7">Label</h3>
                        <div className="pt-5">
                            <span className="flex justify-between w-10/12">
                                <label className="text-sm text-white" htmlFor="owner">Recording label</label>
                                <HelpIcon />
                            </span>
                            <button type="button" name="name" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2 flex items-center justify-center"><AddIcon size="24px" fill="#FFFFFF" />Add label</button>
                        </div>
                        <h3 className="text-lg font-bold pt-7">Lyrics</h3>
                        <div className="pt-5">
                            <span className="flex justify-between w-10/12">
                                <label className="text-sm text-white" htmlFor="owner">Recording lyrics</label>
                                <HelpIcon />
                            </span>
                            <input type="text" name="name" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2" />
                        </div>
                    </div>
                </section>
                <section className="w-full border border-[#444]">
                    <div className="w-11/12 m-auto pt-7 pb-10">
                        <h3 className="text-lg font-bold">Optional</h3>
                        <div className="pt-5">
                            <span className="flex justify-between w-4/12">
                                <label className="text-sm text-white" htmlFor="name">Additional release details</label>
                                <button type="button" name="name" className="h-[1.5rem] p-3 text-sm text-[#ddd] rounded-3xl bg-[#333] flex items-center justify-center">Edit<DownArrowIcon fill={"#ddd"} /></button>
                            </span>
                        </div>
                        <div className="flex">
                            <div className="w-6/12">
                                <h3 className="text-lg font-bold pt-7">Albums</h3>
                                <div className="pt-5">
                                    <span className="flex justify-between w-10/12">
                                        <label className="text-sm text-white" htmlFor="owner">Choose album</label>
                                        <HelpIcon />
                                    </span>
                                    <button type="button" name="name" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2 flex items-center justify-center">Select<DownArrowIcon fill={"#ddd"} /></button>
                                </div>
                            </div>
                            <div className="w-6/12">
                                <h3 className="text-lg font-bold pt-7">Create album</h3>
                                <div className="pt-5">
                                    <span className="flex justify-between w-10/12">
                                        <label className="text-sm text-white" htmlFor="owner">Album name</label>
                                        <HelpIcon />
                                    </span>
                                    <input type="text" name="owner" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-6/12">
                                <h3 className="text-lg font-bold pt-7">Playlists</h3>
                                <div className="pt-5">
                                    <span className="flex justify-between w-10/12">
                                        <label className="text-sm text-white" htmlFor="owner">Choose playlist</label>
                                        <HelpIcon />
                                    </span>
                                    <button type="button" name="name" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2 flex items-center justify-center">Select<DownArrowIcon fill={"#ddd"} /></button>
                                </div>
                            </div>
                            <div className="w-6/12">
                                <h3 className="text-lg font-bold pt-7">Create playlist</h3>
                                <div className="pt-5">
                                    <span className="flex justify-between w-10/12">
                                        <label className="text-sm text-white" htmlFor="owner">Playlist name</label>
                                        <HelpIcon />
                                    </span>
                                    <input type="text" name="owner" className="w-10/12 h-[2.5rem] rounded-xl bg-[#333] mt-2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
            <aside className="w-full lg:w-4/12 top-16 h-[calc(100vh-4rem)] sticky  bg-[#111]">
                <div className="w-10/12 m-auto pt-7 pb-10">
                    <div>
                        <span className="flex justify-between w-full">
                            <h3 className="text-lg font-bold">Release artwork</h3>
                            <HelpIcon />
                        </span>
                        <label className="w-full aspect-square rounded-xl bg-[#333] mt-2 flex flex-col items-center justify-center text-[#666] text-sm cursor-pointer">
                            <UploadIcon fill="#666" size="48px" />
                            <span className="text-center">
                                Click here or drag image file to upload <br /> 300x300 PNG/JPG
                            </span>
                            <input type="file" accept="image/png, image/jpeg" className="hidden" />
                        </label>
                    </div>
                    <div className="text-center">
                        <span className="flex justify-between pt-10">
                            <h3 className="text-lg font-bold">Select image</h3>
                            <span className="h-[2rem] aspect-square  rounded-full bg-[#333] flex justify-center items-center">
                                <SearchSimpleIcon fill={"#666"} size={"20px"} />
                            </span>
                        </span>
                        <div className="grid grid-cols-5 gap-2 pt-5">
                            <Image
                                src="/img/edm.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/goodvibes.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/indie.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/tomorrowland.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/goodvibes.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/indie.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/tomorrowland.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/goodvibes.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/edm.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                            <Image
                                src="/img/indie.jpg"
                                width={48}
                                height={48}
                                alt="Edm Playlist"
                                className="image-rounded"
                            />
                        </div>
                        <p className="text-sm text-[#666] pt-3">Our <span className="text-white">Release Artwork Guidelines </span>allow us to review your image and the release if it doesn’t meet out</p>
                    </div>
                    <div className="pt-5 flex gap-3 justify-end">
                        <Link href={'/releases'}><Button className="rounded-lg bg-[#333]">Cancel</Button></Link>
                        <Button className="rounded-lg bg-[#333]">Save</Button>
                    </div>
                </div>
            </aside>
        </main>
    )
}