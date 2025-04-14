"use client";

import {useListUserFollowersQuery} from "@/lib/features/other/publicApiSlice";
import Footer from "@/components/general/Footer";
import UserCards from "@/components/users/UserCards";
import {usePathname} from "next/navigation";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


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
    <MainSection>
      <div className="mx-6 my-6 space-y-8">
        {load ? <FullScreenSpinner/> : (
          (userFollowers?.length || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll
                title="Followers"
                isShowAll={false}
                className="text-4xl"
              >
                <UserCards users={userFollowers}/>
              </TitleShowAll>
            </div>
          )
        )}

        <Footer/>
      </div>
    </MainSection>
  );
}
