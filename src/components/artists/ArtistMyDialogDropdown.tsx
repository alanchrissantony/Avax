import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Camera, Copy, Ellipsis, ImageOff, Pencil} from "lucide-react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Artist} from "@/types/types";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ErrorField from "@/components/forms/error-field";
import React, {useState} from "react";
import Loader from "@/components/general/Loader";
import {useUpdateMeArtistMutation} from "@/lib/features/artists/artistApiSlice";
import getImageData from "@/utils/getImage";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";


const profileFormSchema = z.object({
  display_name: z
    .string()
    .min(2, {
      message: "Least 2 characters.",
    })
    .max(40, {
      message: "Display name must not be longer than 40 characters.",
    }),
  image: z.any(),
});

type ProfileFormValue = z.infer<typeof profileFormSchema>

export default function ArtistMyDialogDropdown({artist}: { artist: Artist | undefined }) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<ProfileFormValue>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      display_name: artist?.display_name,
      image: artist?.image,
    },
    mode: "onChange",
  });

  const [updateProfile, {isLoading}] = useUpdateMeArtistMutation()
  const [tempImage, setTempImage] = useState<string | undefined>(artist?.image);
  const router = useRouter();


  function onSubmit(data: ProfileFormValue) {

    const formData = new FormData();
    if (data.image && data.image[0] && typeof data.image !== "string") {
      formData.append('image', data.image[0], data.image[0].name);
    }
    formData.append("display_name", data.display_name);

    updateProfile(formData)
      .unwrap()
      .then(() => {
        toast.success("Updated Artist Profile")
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
            <Ellipsis className="h-7 w-7 text-[#afafaf]"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 ml-36 mt-2 bg-[#272727] rounded-sm border-none shadow-2xl">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <button className="flex items-center w-full h-full text-start text-white/90">
                  <Pencil className="h-3.5 w-3.5 mr-2"/>
                  Edit Artist Profile
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
          <DialogTitle className="text-2xl font-semibold mb-1">Artist Profile details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <div className="relative group">
              {tempImage && artist?.image && (
                <Avatar className="w-44 h-44 static">
                  <AvatarImage src={tempImage} className="aspect-square object-cover"/>
                  <AvatarFallback><ImageOff className="w-16 h-16 text-[#909090]"/></AvatarFallback>
                </Avatar>
              )}
              <Input
                {...register('display_name')}
                type="file"
                accept="image/*"
                className="hidden"
                id="upload-image"
                onChange={e => {
                  const {files, displayUrl} = getImageData(e)
                  setTempImage(displayUrl)
                  setValue("image", files)
                }}
              />
              <label
                htmlFor="upload-image"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-8 w-8 text-white"/>
              </label>
            </div>
            <div className="w-full">
              <div className="grid gap-4 py-2 pl-4 pb-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Input
                    defaultValue={artist?.display_name}
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