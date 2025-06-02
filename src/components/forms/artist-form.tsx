"use client"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input"
import {Artist} from "@/types/types";
import {Camera, ImageOff} from "lucide-react";
import useArtistForm from "@/hooks/useArtistForm";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import getImageData from "@/utils/getImage";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


interface Props {
  artist: Artist | undefined;
}

export function ArtistForm({artist}: Props) {
  const {
    isLoadingUpdate,
    form,
    onSubmit,
    tempImage,
    setTempImage,
  } = useArtistForm(artist)

  if (isLoadingUpdate) return <FullScreenSpinner/>

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        <FormField
          control={form.control}
          name="first_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Jhon..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Dou..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className='w-full'
          disabled={isLoadingUpdate}
        >
          Update artist profile
        </Button>
      </form>
    </Form>
  )
}