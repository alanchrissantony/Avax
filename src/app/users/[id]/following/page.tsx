"use client";

import UserCards from "@/components/users/UserCards";
import {usePathname} from "next/navigation";
import TitleShowAll from "@/components/ui/title-show-all";
import MainSection from "@/components/general/main-section";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import ContentSection from "@/components/general/content-section";
import {useListUserFollowingQuery} from "@/lib/features/auth/authApiSlice";


export default function UserFollowingPage() {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const userId = parts[2];

  const {
    data: userFollowing,
    isLoading: isLoading,
    isFetching: isFetching,
  } = useListUserFollowingQuery({userId})

  const load = isLoading || isFetching

  return (
    <MainSection>
      <ContentSection>
        {load ? <FullScreenSpinner/> : (
          (userFollowing?.length || 0) > 0 && (
            <div className="mt-20">
              <TitleShowAll
                title="Following"
                isShowAll={false}
                className="text-4xl"
              >
                <UserCards users={userFollowing}/>
              </TitleShowAll>
            </div>
          )
        )}
      </ContentSection>
    </MainSection>
  );
}
