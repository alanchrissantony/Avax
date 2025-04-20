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
import Loader from "@/components/general/Loader";
import {Artist} from "@/types/types";
import {ImageOff} from "lucide-react";
import useArtistForm from "@/hooks/useArtistForm";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import getImageData from "@/utils/getImage";


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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Avatar className="w-36 h-36 static ml-10">
          <AvatarImage src={tempImage}/>
          <AvatarFallback><ImageOff className="w-16 h-16 text-[#909090]"/></AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type='file'
                  accept='image/*'
                  value={field.value?.image}
                  className='w-56 aspect-square object-cover'
                  onChange={(e) => {
                    const {files, displayUrl} = getImageData(e)

                    setTempImage(displayUrl)

                    field.onChange(files);
                  }}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

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
          className='w-full text-gray-100 bg-green-600'
          disabled={isLoadingUpdate}
        >
          {isLoadingUpdate
            ? <Loader/>
            : 'Update artist profile'
          }
        </Button>
      </form>
    </Form>
  )
}