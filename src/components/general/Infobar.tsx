import { useAppSelector } from "@/lib/hooks";
import ShareIcon from "../svg/share";
import { Button } from "../ui/button";

function Infobar() {
    const { activeTrack } = useAppSelector(state => state.track);
    return (
        <aside className="flex flex-col h-[calc(98vh-3.8rem)] text-m">
            <div className="flex flex-col items-center rounded-lg bg-[#131313] my-2 mr-2 h-full overflow-y-auto">
                <div className="relative group cursor-pointer">
                    <img src={activeTrack?.image} alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <p className="text-lg font-bold text-white">{activeTrack?.title}</p>
                                <p className="text-md text-gray-300">{activeTrack?.artist?.display_name}</p>
                            </div>
                            <div className="cursor-pointer transition-all duration-300 ease-in-out transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                <ShareIcon size="32px" fill="#808080" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="items-stretch w-full  mt-1 p-4">
                    <div className="relative">
                        <div className="relative w-full overflow-hidden rounded-md aspect-[3/2]">
                            <img
                                className="absolute top-0 left-0 w-full h-full object-cover"
                                src={activeTrack?.artist?.image}
                                alt=""
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] to-transparent"></div>
                        <div className="absolute inset-0 flex flex-col justify-start p-5">
                            <div className="group flex justify-between items-center w-full">
                                <p className="text-lg font-bold">About the artist</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 flex justify-start items-end p-5">
                            <Button variant="outline"
                                className="h-8 border-2 border-[#404040] hover:bg-[#252525] hover:scale-105 duration-150 bg-[#202020] rounded-full font-medium"
                                size="default">
                                Follow
                            </Button>
                        </div>
                    </div>
                    <div className="bg-[#222] p-5 rounded-md mt-2 text-white">
                        <p className="text-lg font-bold">{activeTrack?.artist?.display_name}</p>
                        <p className="text-md text-gray-300 pt-2">{activeTrack?.plays_count} monthly listeners</p>
                        <p className="text-sm text-gray-300 leading-relaxed pt-2 line-clamp-4">
                            I&apos;m an artist who believes in the power of sound to say what words sometimes can&apos;t.
                            Every song I create is a reflection of real moments, raw emotions, and the stories that shape us.
                            Whether it&apos;s through melody, rhythm, or silence —
                            I make music to connect, to feel, and to leave something that lasts beyond the last note.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Infobar