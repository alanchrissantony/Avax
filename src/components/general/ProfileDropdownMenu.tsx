import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useLogoutMutation, useRetrieveUserMeQuery} from "@/lib/features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {redirect, useRouter} from "next/navigation";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  accountMySettingsUrl,
  accountMyUrl,
  artistProfileMyUrl, loginUrl,
  profileMyUrl
} from "@/utils/consts";
import {useAppSelector} from "@/lib/hooks";
import {SquareArrowOutUpRight} from "lucide-react";
import {useRetrieveMeArtistQuery} from "@/lib/features/artists/artistApiSlice";


export default function ProfileDropdownMenu() {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const [logout, {isLoading: isLoadingLogout}] = useLogoutMutation()
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    data: user,
    isLoading,
    isFetching,
    isError
  } = useRetrieveUserMeQuery({}, {skip: !isAuthenticated})
  const {
    data: artist,
    isLoading: isLoadingArtist,
    isFetching: isFetchingArtist,
  } = useRetrieveMeArtistQuery({}, {skip: !user?.artist_slug || !isAuthenticated})

  if (isLoadingLogout) return <Skeleton className="h-8 w-8 rounded-full"/>
  if (isLoading || isFetching || isLoadingArtist || isFetchingArtist || !user)
    return <Skeleton className="h-8 w-8 rounded-full"/>
  if (isError) redirect(loginUrl)

  const handleLogout = () => {
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        router.replace('/')
      })
  }

  let MenuItems;
  if (user.type_profile === 'User') {
    MenuItems = (
      <>
        <DropdownMenuItem onClick={() => router.push(accountMyUrl)}>
          <span className="flex items-center justify-between w-full">
            Account
            <SquareArrowOutUpRight className="h-4 w-4"/>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(profileMyUrl)}>
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/premium')}>
          <span>Upgrade to Premium</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(accountMySettingsUrl)}>
          <span>Settings</span>
        </DropdownMenuItem>
      </>
    );
  } else if (user.type_profile === 'Artist') {
    MenuItems = (
      <>
        <DropdownMenuItem onClick={() => router.push(accountMyUrl)}>
          <span className="flex items-center justify-between w-full">
            Account
            <SquareArrowOutUpRight className="h-4 w-4"/>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(artistProfileMyUrl)}>
          <span>Artist profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/premium')}>
          <span>Upgrade to Premium</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(accountMySettingsUrl)}>
          <span>Settings</span>
        </DropdownMenuItem>
      </>
    )
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="border-1 border-black">
        <Button size='icon' variant='outline'
                className="bg-white bg-opacity-50 border-4 border-black h-9 w-9 rounded-full">
          {artist ? (
            <Avatar className="h-8 w-8 hover:scale-110 transition duration-100">
              <AvatarImage className="aspect-square object-cover" src={artist.image} alt={artist.display_name}/>
              <AvatarFallback>{artist.display_name}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarImage className="aspect-square object-cover" src={user.image} alt={user.display_name}/>
              <AvatarFallback>{user.display_name}</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 mr-6 bg-[#272727] rounded-sm border-none shadow-2xl">
        <DropdownMenuGroup>
          {MenuItems}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-gray-200/15 mx-1"/>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}