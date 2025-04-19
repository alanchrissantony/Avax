import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useLogoutMutation, useRetrieveUserMeQuery} from "@/lib/features/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {accountMyProfileArtistUrl, accountMySettingsUrl, accountMyUrl, profileMyUrl} from "@/utils/consts";
import {useAppSelector} from "@/lib/hooks";


export default function ProfileDropdownMenu() {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const [logout, {isLoading: isLoadingLogout}] = useLogoutMutation()
  const dispatch = useDispatch();
  const router = useRouter();
  const {data: user, isLoading, isFetching, isError} = useRetrieveUserMeQuery({}, {skip: !isAuthenticated})

  if (isLoadingLogout) return <Skeleton className="h-8 w-8 rounded-full"/>
  if (isLoading || isFetching || !user) return <Skeleton className="h-8 w-8 rounded-full"/>
  if (isError) return <h1>Error...</h1>

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
        router.push("/");
      })
  }

  let MenuItems;
  if (user.type_profile === 'User') {
    MenuItems = (
      <>
        <DropdownMenuItem onClick={() => router.push(accountMyUrl)}>
          <span>Account</span>
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
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(accountMyProfileArtistUrl)}>
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
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline' className="flex bg-white bg-opacity-50 h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage className="aspect-square object-cover" src={user.image} alt={user.display_name}/>
            <AvatarFallback>{user.display_name}</AvatarFallback>
          </Avatar>
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