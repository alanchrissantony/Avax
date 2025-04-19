import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ListFilter, MoreHorizontal, PlusCircle, Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuCheckboxItem,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {Checkbox} from "@/components/ui/checkbox";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import * as React from "react";
import {useState} from "react";
import Link from "next/link";
import {FormSubmit, ListDetailAlbums, ListDetailTracks} from "@/types/types";
import {useDeleteMyAlbumMutation} from "@/lib/features/albums/albumApiSlice";
import Image from "next/image";
import dayjs from "dayjs";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";


interface Prop {
  albums?: ListDetailAlbums | undefined;
  tracks?: ListDetailTracks | undefined;
  page: number;
  setPage: any;
}

export default function MyAlbumsTable({albums, tracks, page, setPage}: Prop) {
  const pages = Math.floor((albums?.count || 0) / 10);

  const [search, setSearch] = useState('')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const router = useRouter()

  const [albumDelete, {isLoading}] = useDeleteMyAlbumMutation();


  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    router.push(`?search=${search}`)
  }

  function handleDelete(slug: string) {
    alert('Are you sure you want to delete this album?');

    albumDelete(slug)
      .unwrap()
      .then(() => {
        toast.success('Deleted Album')
      })
      .catch(() => toast.error('Failed to delete Album'))
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
        </TabsList>
        <div className="relative ml-auto flex-1 md:grow-0">
          <form onSubmit={handleSubmit} className='flex items-center space-x-2'>
            <Search className="absolute left-4 top-4 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-background pl-8 md:w-[250px] lg:w-[250px]"
            />
            <Button size='sm' type='submit' variant='outline'>Search</Button>
          </form>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5"/>
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuCheckboxItem checked>
                Listeners
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Created at</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Track count
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {((tracks?.count || 0) > 0) ?
            <Button size="sm" className="h-8 gap-1" onClick={() => router.push('albums/create')}>
              <PlusCircle className="h-3.5 w-3.5"/>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Album
              </span>
            </Button> :
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1 bg-red-700 hover:bg-red-600">
                  <PlusCircle className="h-3.5 w-3.5"/>
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Album
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You dont have track</AlertDialogTitle>
                  <AlertDialogDescription>
                    In order to create album, you must upload a track
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => router.replace('/account/my/artist/tracks/create')}>Go to create
                    track</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          }

        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0" className="bg-black">
          <CardHeader>
            <CardTitle>Albums</CardTitle>
            <CardDescription>
              Manage your Albums and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead className="hidden md:table-cell">Listeners</TableHead>
                  <TableHead className="hidden md:table-cell">Tracks count</TableHead>
                  <TableHead className="hidden lg:table-cell">Is private</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <FullScreenSpinner/> : (
                  albums?.results?.map((album, index) => (
                    <TableRow
                      key={album.id}
                      onMouseEnter={() => {
                        setHoveredRow(index)
                      }}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className="font-medium">
                        <div className="relative flex-shrink-0 w-12 h-12">
                          <Image
                            src={album.image}
                            alt={album.title}
                            height={50}
                            width={50}
                            className="aspect-square object-cover shadow-md rounded-sm h-12 w-12"
                            priority
                          />
                          {hoveredRow === index && (
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                              <PlayTrackButton track={album?.tracks?.[0]} lines={true} className="text-xl"/>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        <Link href={`/albums/${album.slug}`} className='hover:underline'>
                          {album.title.slice(0, 30) + ((album.title.length - 30) > 1 ? '...' : '')}
                        </Link>
                      </TableCell>

                      <TableCell className="font-medium">
                      <span>
                        {dayjs(album.release_date).format('D MMMM YYYY')}
                      </span>
                      </TableCell>

                      <TableCell className="font-medium hidden md:table-cell">
                      <span>
                        {album?.album_listeners > 0 ? (
                          album?.album_listeners.toLocaleString()
                        ) : (
                          "No listeners"
                        )}
                      </span>
                      </TableCell>

                      <TableCell className="font-medium text-center hidden md:table-cell">
                      <span className="mr-2">
                        {album?.tracks?.length > 0 ? (
                          album?.tracks?.length.toLocaleString()
                        ) : (
                          "No tracks"
                        )}
                      </span>
                      </TableCell>

                      <TableCell className="font-medium hidden lg:table-cell">
                        <div className="ml-6">
                          <Checkbox defaultChecked={album.is_private} disabled/>
                        </div>
                      </TableCell>

                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4"/>
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => router.push(`albums/${album.slug}/edit`)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(album.slug)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>

            <Pagination className='flex relative items-center justify-center text-black dark:text-white'>
              <PaginationContent>
                <PaginationItem className='absolute left-0'>
                  <PaginationPrevious
                    className={!albums?.previous ? "pointer-events-none opacity-50" : undefined}
                    onClick={() => albums?.previous && setPage(page - 1)}
                  />
                </PaginationItem>
                {Array.from({length: pages}).slice(0, 5).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => setPage(index + 1)}
                      isActive={page === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {pages !== 0 &&
                  <PaginationItem>
                    <PaginationEllipsis/>
                  </PaginationItem>
                }
                <PaginationItem className='absolute right-0'>
                  <PaginationNext
                    className={!albums?.next ? "pointer-events-none opacity-50" : undefined}
                    onClick={() => albums?.next && setPage(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}