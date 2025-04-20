"use client"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl, FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Loader from "@/components/general/Loader";
import {Textarea} from "@/components/ui/textarea";
import {Checkbox} from "@/components/ui/checkbox";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import getImageData from "@/utils/getImage";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon, Camera, ImageOff} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import useAlbumEditForm from "@/hooks/useAlbumEditForm";
import {DetailAlbum} from "@/types/types";

interface Props {
  album: DetailAlbum | undefined;
}


export function AlbumEditForm({album}: Props) {
  const {
    form,
    onSubmit,
    isLoading,
    tempImage,
    setTempImage,
  } = useAlbumEditForm(album)

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
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Album title</FormLabel>
              <FormControl>
                <Input placeholder="My album..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='About album...' className='resize-y min-h-[150px]' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="release_date"
          render={({field}) => (
            <FormItem className="flex flex-col">
              <FormLabel>Release date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : '')}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Date when album released.
              </FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_private"
          render={({field}) => (
            <FormItem className="flex flex-row items-start space-x-3 max-w-md space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Is private?
                </FormLabel>
                <FormDescription>
                  If true only you can see your album
                </FormDescription>
              </div>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={isLoading}>
          {isLoading
            ? <Loader/>
            : 'Update album'
          }
        </Button>
      </form>
    </Form>
  )
}