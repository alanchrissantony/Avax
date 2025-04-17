import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Copy, Ellipsis, Pencil} from "lucide-react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {User} from "@/types/types";
import {useUpdateUserProfileMutation} from "@/lib/features/auth/authApiSlice";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ErrorField from "@/components/forms/error-field";
import React from "react";
import Loader from "@/components/general/Loader";


const profileFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: "Least 2 characters.",
    })
    .max(40, {
      message: "Display name must not be longer than 40 characters.",
    }),
});

type ProfileFormValue = z.infer<typeof profileFormSchema>

export default function UserMyDialogDropdown({user}: { user: User | undefined }) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ProfileFormValue>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      display_name: user?.display_name,
    },
    mode: "onChange",
  });

  const [updateProfile, {isLoading}] = useUpdateUserProfileMutation()
  const router = useRouter();


  function onSubmit(data: ProfileFormValue) {
    updateProfile(data)
      .unwrap()
      .then(() => {
        toast.success("Updated Profile")
        router.refresh();
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong.")
      })
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost'
                  className="flex bg-opacity-50 h-8 w-8 rounded-full hover:bg-white/0 hover:scale-110 duration-200">
            <Ellipsis className="h-7 w-7 text-[#909090]"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 ml-36 mt-2 bg-[#272727] rounded-sm border-none shadow-2xl">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="flex items-center w-full h-full text-start text-white/90">
                  <Pencil className="h-3.5 w-3.5 mr-2"/>
                  Edit Profile
                </button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white/90">
              <Copy className="h-3.5 w-3.5 mr-2"/>
              <span>Copy link to profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[520px] bg-[#242424] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-1">Profile details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            {user?.image && (
              <Image
                src={user.image}
                alt={user.display_name}
                height={170}
                width={170}
                className="aspect-square object-cover shadow-2xl rounded-full h-44 w-44"
                priority
              />
            )}
            <div className="w-full">
              <div className="grid gap-4 py-2 pl-4 pb-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Input
                    defaultValue={user?.display_name}
                    className={`col-span-3 bg-[#353535] border-none shadow-md ${errors.display_name ? "border-red-800 border-2" : ""}`}
                    {...register('display_name')}
                  />
                </div>
                {errors.display_name && <ErrorField message={errors.display_name.message}/>}
              </div>
              <div className="w-full text-right">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-black font-semibold text-base"
                >
                  {isLoading ? <Loader/> : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </form>
        <DialogFooter className="text-xs font-semibold text-white/90">
          By proceeding, you agree to give Avax access to the image you choose to upload. Please make sure
          you have the right to upload the image.
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}