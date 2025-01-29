"use client"
import React, { useEffect, useState } from "react";
import View from "@/components/svg/view";
import Edit from "@/components/svg/edit";
import Delete from "@/components/svg/delete";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { fetchArtists, verifyArtist } from "@/slices/artistsSlice";
import { toast } from "sonner";
import "@/app/artists/artist.css"
import { Artist } from "@/types/artists";



export default function ArtistsPage() {

    const dispatch = useDispatch<AppDispatch>();

    const [artists, setArtists] = useState<Artist[]>([]);
    const artistState = useSelector((state: RootState) => state.artists);


    useEffect(() => {
        const fetchData = async () => {

            if (artistState && artistState.artists.length > 0) {
                setArtists(artistState.artists as Artist[]);
            } else {
                try {
                    const response = await dispatch(fetchArtists()).unwrap();
                    setArtists(response);
                } catch (err) {
                    toast.error("Failed to fetch artists. Please try again.", {
                        description: `${err}` || "Failed to fetch artists.",
                    });
                }
            }
        };

        fetchData();
    }, [artistState.artists, dispatch]);

    const handleVerifyArtist = async (email: string) => {
        try {
            const response = await dispatch(verifyArtist(email)).unwrap();
        } catch (err) {
            toast.error("Failed to verify artist. Please try again.", {
                description: `${err}` || "Failed to verify artist.",
            });
        }
    }

    return (


        <div className="p-4">
            <div className="admin-table overflow-x-auto p-5 rounded-lg md:rounded-xl lg:rounded-2xl">
                <table className="min-w-full">
                    <thead className="[&amp;>tr]:first:rounded-lg" role="rowgroup">
                        <tr role="row" className="group/tr outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2">
                            <th data-key="name" role="columnheader" id="react-aria5941590228-:rh1:-name" className="group/th px-3 h-10 align-middle bg-default-900 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-s-lg last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start">NAME</th>
                            <th data-key="role" role="columnheader" id="react-aria5941590228-:rh1:-role" className="group/th px-3 h-10 align-middle bg-default-900 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-s-lg last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start">Date</th>
                            <th data-key="role" role="columnheader" id="react-aria5941590228-:rh1:-role" className="group/th px-3 h-10 align-middle bg-default-900 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-s-lg last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start">Verified</th>
                            <th data-key="status" role="columnheader" id="react-aria5941590228-:rh1:-status" className="group/th px-3 h-10 align-middle bg-default-900 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-s-lg last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start">STATUS</th>
                            <th data-key="actions" role="columnheader" id="react-aria5941590228-:rh1:-actions" className="group/th px-3 h-10 align-middle bg-default-900 whitespace-nowrap text-foreground-500 text-tiny font-semibold first:rounded-s-lg last:rounded-e-lg data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-center">ACTIONS</th>
                        </tr>
                        <tr aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.25rem" }}></tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {artists.map((artist, index) => (
                            <tr key={index}>
                                <td className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&>*]:z-1 [&>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]/tr:text-foreground-300 group-data-[disabled=true]/tr:cursor-not-allowed before:bg-default/60 data-[selected=true]:text-default-foreground first:before:rounded-s-lg last:before:rounded-e-lg text-start">
                                    <div className="inline-flex items-center justify-center gap-2 rounded-small outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2">
                                        <span className="flex relative justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-10 h-10 text-tiny bg-default text-default-foreground rounded-large">
                                            <img src='/img/profile.jpg' className="flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100" alt="avatar" data-loaded="true" />
                                        </span>
                                        <div className="inline-flex flex-col items-start">
                                            <span className="text-small text-inherit">{artist.name}</span>
                                            <span className="text-tiny text-foreground-400">{artist.email}</span>
                                        </div>
                                    </div>
                                </td>
                                <td data-key="11role" role="gridcell" className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]/tr:text-foreground-300 group-data-[disabled=true]/tr:cursor-not-allowed before:bg-default/60 data-[selected=true]:text-default-foreground first:before:rounded-s-lg last:before:rounded-e-lg text-start">
                                    <div className="flex flex-col">
                                        <p className="text-bold text-sm capitalize">{artist.created_at}</p>
                                        <p className="text-bold text-sm capitalize text-default-400">{artist.updated_at}</p>
                                    </div>
                                </td>
                                <td data-key="11status" role="gridcell" className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]/tr:text-foreground-300 group-data-[disabled=true]/tr:cursor-not-allowed before:bg-default/60 data-[selected=true]:text-default-foreground first:before:rounded-s-lg last:before:rounded-e-lg text-start">
                                    <div className={`relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-full ${artist.verified ? 'bg-success/20' : 'bg-danger/20 cursor-pointer'} ${artist.verified ? 'text-success-700' : 'text-danger-700'} ${artist.verified ? 'dark:text-success' : 'dark:text-danger'} capitalize`} onClick={(e) => { if (!artist.verified) { handleVerifyArtist(artist.email) } }}>
                                        <span className="flex-1 text-inherit font-normal px-1">{artist.verified ? 'Verified' : 'Verify'}</span>
                                    </div>
                                </td>
                                <td data-key="11status" role="gridcell" className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]/tr:text-foreground-300 group-data-[disabled=true]/tr:cursor-not-allowed before:bg-default/60 data-[selected=true]:text-default-foreground first:before:rounded-s-lg last:before:rounded-e-lg text-start">
                                    <div className={`relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-tiny rounded-full ${artist.is_active ? 'bg-success/20' : 'bg-danger/20'} ${artist.is_active ? 'text-success-700' : 'text-danger-700'} ${artist.is_active ? 'dark:text-success' : 'dark:text-danger'} capitalize cursor-pointer`} >
                                        <span className="flex-1 text-inherit font-normal px-1">{artist.is_active ? 'Active' : 'Inactive'}</span>
                                    </div>
                                </td>
                                <td data-key="11actions" role="gridcell" className="py-2 px-3 relative align-middle whitespace-normal text-small font-normal [&amp;>*]:z-1 [&amp;>*]:relative outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 before:content-[''] before:absolute before:z-0 before:inset-0 before:opacity-0 data-[selected=true]:before:opacity-100 group-data-[disabled=true]/tr:text-foreground-300 group-data-[disabled=true]/tr:cursor-not-allowed before:bg-default/60 data-[selected=true]:text-default-foreground first:before:rounded-s-lg last:before:rounded-e-lg text-center">
                                    <div className="relative flex items-center justify-around gap-2">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <View />
                                        </span>
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                            <Edit />
                                        </span>
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <Delete />
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    );
}