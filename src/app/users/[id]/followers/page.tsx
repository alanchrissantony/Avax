"use client";

import {useListUserFollowersQuery} from "@/lib/features/other/publicApiSlice";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
import UserCards from "@/components/users/UserCards";
import {usePathname} from "next/navigation";


export default function UserFollowersPage() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const userId = parts[2];

  const {
    data: userFollowers,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListUserFollowersQuery({userId})

  const load = isLoading || isFetching


  return (
    <div
      className="h-full rounded-lg"
      style={{
        backgroundImage: `linear-gradient(to bottom, #202020, #131313, #131313)`,
      }}
    >
      <Header/>
      <div className="mx-6 my-6 space-y-6">
        {(userFollowers?.length || 0) > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="mt-3 text-4xl font-bold ml-2">
                Followers
              </h2>
            </div>
            <UserCards users={userFollowers}/>
          </div>
        )}

        <Footer/>
      </div>
    </div>
  );
}
