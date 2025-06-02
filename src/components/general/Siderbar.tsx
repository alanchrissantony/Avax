import Image from "next/image";
import SidebarLinksList from "./SidebarLinksList";
import UserLibrary from "@/components/users/UserLibrary";
import Link from "next/link";


export function Sidebar() {
  return (
    <aside className="flex flex-col h-[calc(98vh-3.8rem)] text-m">
      <div className="flex flex-col items-center p-4 rounded-lg bg-[#131313] my-2 ml-2 pb-2">
        <Link href="/" className="items-stretch w-full ml-4 mt-1">
          <h1 className="text-2xl font-bold">Avax</h1>
          <p className="text-sm">All Music</p>
        </Link>
        <SidebarLinksList/>
      </div>

      <div className="p-2 rounded-lg bg-[#131313] my-2 ml-2 pt-0 mt-0 h-full overflow-y-auto">
        <UserLibrary/>
      </div>
    </aside>
  )
}