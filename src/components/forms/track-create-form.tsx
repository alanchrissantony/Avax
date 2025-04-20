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
import {Checkbox} from "@/components/ui/checkbox";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import getImageData from "@/utils/getImage";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {CalendarIcon, Check, ImageOff} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import useTrackCreateForm from "@/hooks/useTrackCreateForm";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Genres, License, ListDetailAlbums} from "@/types/types";


interface Props {
  albums: ListDetailAlbums | undefined;
  license: License[] | undefined;
  genres: Genres | undefined;
}

export function TrackCreateForm({albums, license, genres}: Props) {
  const {
    form,
    onSubmit,
    isLoading,
    tempImage,
    setTempImage,
    tempAudio,
    setTempAudio,
  } = useTrackCreateForm()

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
                  className='w-56 aspect-square object-cover rounded-2xl'
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
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Track title</FormLabel>
              <FormControl>
                <Input placeholder="My track..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="album"
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Album</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-auto justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? albums?.results?.find(
                          (album) => album.id === field.value
                        )?.title
                        : "Select your album"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] md:w-[340px] p-0">
                  <Command>
                    <CommandInput placeholder="Search my album..."/>
                    <CommandEmpty>No album found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {albums?.results?.map((album) => (
                          <CommandItem
                            value={album.title}
                            key={album.id}
                            onSelect={() => {
                              form.setValue("album", album.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-1 h-4 w-4",
                                album.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            <Avatar className="rounded-md">
                              <AvatarImage src={album.image}
                                           className="aspect-square object-cover h-8 w-8 mt-1 rounded-md "/>
                            </Avatar>

                            {album.title}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genre"
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Genre</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-auto justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? genres?.results?.find(
                          (genre) => genre.id === field.value
                        )?.name
                        : "Select your genre"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                  </FormControl>
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
                              form.setValue("genre", genre.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-1 h-4 w-4",
                                genre.id === field.value
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
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license"
          render={({field}) => (
            <FormItem className='flex flex-col'>
              <FormLabel>License</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-auto justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? license?.find(
                          (item) => item.id === field.value
                        )?.name
                        : "Select your license"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[280px] md:w-[340px] p-0">
                  <Command>
                    <CommandInput placeholder="Search my license..."/>
                    <CommandEmpty>No license found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {license?.map((item) => (
                          <CommandItem
                            value={item.name}
                            key={item.id}
                            onSelect={() => {
                              form.setValue("license", item.id)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-1 h-4 w-4",
                                item.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({field}) => (
            <FormItem className="md:flex items-center md:space-x-3">
              <FormControl>
                <Input
                  {...field}
                  type='file'
                  accept='audio/*'
                  value={field.value?.file}
                  className='w-56 aspect-square object-cover rounded-2xl'
                  onChange={(e) => {
                    const {files, displayUrl} = getImageData(e)
                    setTempAudio(displayUrl)

                    field.onChange(files);
                  }}
                />
              </FormControl>
              {tempAudio && (
                <audio controls className="rounded-full w-full pb-1.5">
                  <source src={tempAudio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
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
                Date when track released.
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
                  If true only you can see your track
                </FormDescription>
              </div>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={isLoading}>
          {isLoading
            ? <Loader/>
            : 'Create track'
          }
        </Button>
      </form>
    </Form>
  )
}