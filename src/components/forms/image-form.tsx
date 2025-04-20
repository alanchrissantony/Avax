import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Form} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import getImageData from "@/utils/getImage";
import {Button} from "@/components/ui/button";
import Loader from "@/components/general/Loader";
import useImageForm from "@/hooks/useImageForm";
import {User} from "@/types/types";
import {Camera, ImageOff} from "lucide-react";


export default function ImageForm({user}: { user?: User | undefined }) {
  const {
    form,
    onSubmit,
    isLoading,
    tempImage,
    setTempImage,
  } = useImageForm(user)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} encType='multipart/form-data' className="space-y-8">
        <div className="relative group w-56 h-56 ml-4">
          <Avatar className="w-full h-full">
            <AvatarImage src={tempImage} className="aspect-square object-cover"/>
            <AvatarFallback><ImageOff className="w-16 h-16 text-[#909090]"/></AvatarFallback>
          </Avatar>
          <Input
            {...form.register("image")}
            type='file'
            accept='image/*'
            className='hidden'
            id='upload-image'
            onChange={(e) => {
              const {files, displayUrl} = getImageData(e);
              setTempImage(displayUrl);
              form.setValue("image", files);
            }}
          />
          <label
            htmlFor="upload-image"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <Camera className="h-10 w-10 text-gray-200"/>
          </label>
        </div>
        <Button type="submit" className='w-56' disabled={isLoading}>
          {isLoading
            ? <Loader/>
            : 'Update account image'
          }
        </Button>
      </form>
    </Form>
  )
}