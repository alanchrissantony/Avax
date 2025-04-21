import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Camera, Check, CircleMinus, Copy, Ellipsis, ImageOff, Pencil} from "lucide-react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {DetailPlaylist} from "@/types/types";
import {toast} from "react-toastify";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ErrorField from "@/components/forms/error-field";
import React, {useState} from "react";
import Loader from "@/components/general/Loader";
import getImageData from "@/utils/getImage";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {useDeleteMyPlaylistMutation, useUpdateMyPlaylistMutation} from "@/lib/features/playlists/playlistApiSlice";
import {Textarea} from "@/components/ui/textarea";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {useListGenresQuery} from "@/lib/features/other/publicApiSlice";
import {useRouter} from "next/navigation";

const playlistFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  description: z.string()
    .max(500, {message: 'Must not be longer than 500 characters.',}),
  genre: z.number().optional(),
  image: z.any().optional(),
  is_private: z.boolean(),
});

type PlaylistFormValue = z.infer<typeof playlistFormSchema>

export default function PlaylistMyDialogDropdown({playlist}: { playlist: DetailPlaylist | undefined }) {
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    watch,
  } = useForm<PlaylistFormValue>({
    resolver: zodResolver(playlistFormSchema),
    defaultValues: {
      title: playlist?.title,
      description: playlist?.description,
      genre: playlist?.genre?.id,
      image: playlist?.image,
      is_private: playlist?.is_private,
    },
    mode: "onChange",
  });

  const {
    data: genres,
    isLoading: isLoadingG,
    isFetching: isFetchingG,
  } = useListGenresQuery({})
  const [updatePlaylist, {isLoading: isLoadingUpdate}] = useUpdateMyPlaylistMutation()
  const [deletePlaylist, {isLoading: isLoadingDelete}] = useDeleteMyPlaylistMutation()
  const [tempImage, setTempImage] = useState<string | undefined>(playlist?.image);
  const router = useRouter();

  const isLoading = isLoadingG || isFetchingG || isLoadingDelete || isLoadingUpdate

  const selectedGenre = watch('genre');

  function onSubmit(data: PlaylistFormValue) {
    const formData = new FormData();
    if (data.image && data.image[0] && typeof data.image !== "string") {
      formData.append('image', data.image[0], data.image[0].name);
    }
    if (data.genre) {
      formData.append("genre", data.genre.toString());
    }
    formData.append("title", data.title);

    updatePlaylist({slug: playlist?.slug, data: formData})
      .unwrap()
      .then(() => {
        toast.success("Updated Playlist")
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong.")
      })
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    alert("Are you sure you want delete your playlist?")
    e.preventDefault()

    deletePlaylist({slug: playlist?.slug})
      .unwrap()
      .then(() => {
        toast.success("Deleted Playlist")
        router.replace('/');
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong.")
      })
  }

  if (isLoading) return <Loader/>

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
                  Edit details
                </button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild onClick={handleDelete}>
                <button className="flex items-center w-full h-full text-start text-white/90">
                  <CircleMinus className="h-3.5 w-3.5 mr-2"/>
                  Delete
                </button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-white/90">
              <Copy className="h-3.5 w-3.5 mr-2"/>
              <span>Copy link to playlist</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[520px] bg-[#242424] border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold mb-1">Edit details</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center">
            <div className="relative group gap-4">
              {tempImage && playlist?.image && (
                <Avatar className="w-44 h-44 static rounded-md">
                  <AvatarImage src={tempImage} className="aspect-square object-cover"/>
                  <AvatarFallback><ImageOff className="w-16 h-16 text-[#909090]"/></AvatarFallback>
                </Avatar>
              )}
              <Input
                {...register('image')}
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
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="h-8 w-8 text-white"/>
              </label>
            </div>
            <div className="w-full">
              <div className="grid gap-4 py-2 pl-4 pb-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Input
                    defaultValue={playlist?.title}
                    placeholder="Add a name"
                    className={`col-span-3 bg-[#353535] border-none shadow-md ${errors.title ? "border-red-800 border-2" : ""}`}
                    {...register('title')}
                  />
                </div>
                {errors.title && <ErrorField message={errors.title.message}/>}
              </div>
              <div className="grid gap-4 py-2 pl-4 pb-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Textarea
                    defaultValue={playlist?.description}
                    placeholder="Add an optional description"
                    className={`col-span-3 bg-[#353535] max-h-28 min-h-28 border-none shadow-md ${errors.description ? "border-red-800 border-2" : ""}`}
                    {...register('description')}
                  />
                </div>
                {errors.description && <ErrorField message={errors.description.message}/>}
              </div>
            </div>
          </div>
          <div className="py-2 pb-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-auto justify-between bg-[#323232]",
                    !selectedGenre && "text-muted-foreground"
                  )}
                >
                  {selectedGenre
                    ? genres?.results?.find(
                      (genre) => genre.id === selectedGenre
                    )?.name
                    : "Select your genre"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] md:w-[340px] p-0">
                <Command>
                  <CommandInput placeholder="Search my album..."/>
                  <CommandEmpty>No genre found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {genres?.results?.map((genre) => (
                        <CommandItem
                          value={genre.name}
                          key={genre.id}
                          onSelect={() => {
                            setValue("genre", genre.id)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-1 h-4 w-4",
                              genre.id === selectedGenre
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <Avatar className="rounded-md">
                            <AvatarImage src={genre.image}
                                         className="aspect-square object-cover h-8 w-8 mt-1 rounded-md "/>
                          </Avatar>

                          {genre.name}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {errors.genre && <ErrorField message={errors.genre.message}/>}
          </div>
          <div className="w-full text-right">
            <Button
              type="submit"
              size="lg"
              className="bg-white text-black font-semibold text-base"
            >
              {isLoadingUpdate ? <Loader/> : "Save"}
            </Button>
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
