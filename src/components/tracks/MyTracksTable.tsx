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
import {FormSubmit, License, ListDetailAlbums, ListDetailTracks} from "@/types/types";
import Image from "next/image";
import dayjs from "dayjs";
import PlayTrackButton from "@/components/tracks/PlayTrackButton";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useDeleteMyTrackMutation} from "@/lib/features/tracks/trackApiSlice";


interface Prop {
  tracks?: ListDetailTracks | undefined;
  license?: License[] | undefined;
  albums?: ListDetailAlbums | undefined;
  page: number;
  setPage: any;
}

export default function MyTracksTable({tracks, albums, license, page, setPage}: Prop) {
  const pages = Math.floor((tracks?.count || 0) / 10);

  const [search, setSearch] = useState('')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const router = useRouter()

  const [trackDelete, {isLoading}] = useDeleteMyTrackMutation();


  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    router.push(`?search=${search}`)
  }

  function handleFilterSubmit(e: React.MouseEvent<HTMLDivElement, MouseEvent>, filter: string) {
    e.preventDefault();
  }

  function handleDelete(slug: string) {
    alert('Are you sure you want to delete this track?');

    trackDelete({slug})
      .unwrap()
      .then(() => {
        toast.success('Deleted Track')
      })
      .catch(() => toast.error('Failed to delete Track'))
  }

  if (isLoading) return <FullScreenSpinner/>

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
              <DropdownMenuCheckboxItem onClick={(e) => handleFilterSubmit(e, "plays")}>
                Plays count
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked onClick={(e) => handleFilterSubmit(e, "created_at")}>
                Created at
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={(e) => handleFilterSubmit(e, "likes")}>
                Likes count
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {((albums?.count || 0) > 0 && (license?.length || 0) > 0) ?
            <Button size="sm" className="h-8 gap-1" onClick={() => router.push('tracks/create')}>
              <PlusCircle className="h-3.5 w-3.5"/>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Track
              </span>
            </Button> :
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1 bg-red-700 hover:bg-red-600">
                  <PlusCircle className="h-3.5 w-3.5"/>
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Track
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You dont have album or license</AlertDialogTitle>
                  <AlertDialogDescription>
                    In order to create track, you must create album and license
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => router.replace('/account/my/artist/album/create')}>Go to create
                    album</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          }

        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0" className="bg-black">
          <CardHeader>
            <CardTitle>Tracks</CardTitle>
            <CardDescription>
              Manage your Tracks and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead className="hidden md:table-cell">Genre</TableHead>
                  <TableHead className="hidden lg:table-cell">Licence</TableHead>
                  <TableHead className="hidden md:table-cell">Likes</TableHead>
                  <TableHead className="hidden md:table-cell">Plays</TableHead>
                  <TableHead className="hidden lg:table-cell">Is private</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tracks?.results?.map((track, index) => (
                  <TableRow
                    key={track.id}
                    onMouseEnter={() => {
                      setHoveredRow(index)
                    }}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell className="font-medium">
                      <div className="relative flex-shrink-0 w-12 h-12">
                        <Image
                          src={track.album.image}
                          alt={track.title}
                          height={50}
                          width={50}
                          className="aspect-square object-cover shadow-md rounded-sm h-12 w-12"
                          priority
                        />
                        {hoveredRow === index && (
                          <div
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                            <PlayTrackButton track={track} tracks={tracks?.results} index={index} lines={true}
                                             className="text-xl"/>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="font-medium">
                      <Link href={`/tracks/${track.slug}`} className='hover:underline'>
                        {track.title.slice(0, 30) + ((track.title.length - 30) > 1 ? '...' : '')}
                      </Link>
                    </TableCell>

                    <TableCell className="font-medium">
                      <span>
                        {dayjs(track.release_date).format('D MMMM YYYY')}
                      </span>
                    </TableCell>

                    <TableCell className="font-medium">
                      <Link href={`/albums/${track?.album?.slug}`} className='hover:underline text-white/90'>
                        {track?.album.title}
                      </Link>
                    </TableCell>

                    <TableCell className="font-medium hidden md:table-cell">
                      <Link href={`/genre/${track?.genre?.slug}`} className='hover:underline text-white/70'>
                        {track?.genre.name}
                      </Link>
                    </TableCell>

                    <TableCell className="font-medium hidden lg:table-cell">
                      <Link href={`/account/my/artist/license`} className='hover:underline text-white/70'>
                        {track?.license.name}
                      </Link>
                    </TableCell>

                    <TableCell className="font-medium hidden md:table-cell">
                      <span>
                        {track?.likes_count > 0 ? (
                          track?.likes_count.toLocaleString()
                        ) : (
                          "No likes"
                        )}
                      </span>
                    </TableCell>

                    <TableCell className="font-medium text-center hidden md:table-cell">
                      <span className="mr-2">
                        {track?.plays_count > 0 ? (
                          track?.plays_count.toLocaleString()
                        ) : (
                          "No plays"
                        )}
                      </span>
                    </TableCell>

                    <TableCell className="font-medium hidden lg:table-cell">
                        <span className="ml-6">
                          <Checkbox defaultChecked={track.is_private} disabled/>
                        </span>
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
                            onClick={() => router.push(`tracks/${track.slug}/edit`)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(track.slug)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
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

      <TabsContent value="private">
        <Card x-chunk="dashboard-06-chunk-0" className="bg-black">
          <CardHeader>
            <CardTitle>Tracks</CardTitle>
            <CardDescription>
              Manage your Tracks and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Release Date</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead className="hidden md:table-cell">Genre</TableHead>
                  <TableHead className="hidden lg:table-cell">Licence</TableHead>
                  <TableHead className="hidden md:table-cell">Likes</TableHead>
                  <TableHead className="hidden md:table-cell">Plays</TableHead>
                  <TableHead className="hidden lg:table-cell">Is private</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? <FullScreenSpinner/> : (
                  tracks?.results?.filter((track) => track.is_private).map((track, index) => (
                    <TableRow
                      key={track.id}
                      onMouseEnter={() => {
                        setHoveredRow(index)
                      }}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <TableCell className="font-medium">
                        <div className="relative flex-shrink-0 w-12 h-12">
                          <Image
                            src={track.album.image}
                            alt={track.title}
                            height={50}
                            width={50}
                            className="aspect-square object-cover shadow-md rounded-sm h-12 w-12"
                            priority
                          />
                          {hoveredRow === index && (
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                              <PlayTrackButton track={track} tracks={tracks?.results} index={index} lines={true}
                                               className="text-xl"/>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">
                        <Link href={`/tracks/${track.slug}`} className='hover:underline'>
                          {track.title.slice(0, 30) + ((track.title.length - 30) > 1 ? '...' : '')}
                        </Link>
                      </TableCell>

                      <TableCell className="font-medium">
                      <span>
                        {dayjs(track.release_date).format('D MMMM YYYY')}
                      </span>
                      </TableCell>

                      <TableCell className="font-medium">
                        <Link href={`/albums/${track?.album?.slug}`} className='hover:underline text-white/90'>
                          {track?.album.title}
                        </Link>
                      </TableCell>

                      <TableCell className="font-medium hidden md:table-cell">
                        <Link href={`/genre/${track?.genre?.slug}`} className='hover:underline text-white/70'>
                          {track?.genre.name}
                        </Link>
                      </TableCell>

                      <TableCell className="font-medium hidden lg:table-cell">
                        <Link href={`/account/my/artist/license`} className='hover:underline text-white/70'>
                          {track?.license.name}
                        </Link>
                      </TableCell>

                      <TableCell className="font-medium hidden md:table-cell">
                      <span>
                        {track?.likes_count > 0 ? (
                          track?.likes_count.toLocaleString()
                        ) : (
                          "No likes"
                        )}
                      </span>
                      </TableCell>

                      <TableCell className="font-medium text-center hidden md:table-cell">
                      <span className="mr-2">
                        {track?.plays_count > 0 ? (
                          track?.plays_count.toLocaleString()
                        ) : (
                          "No plays"
                        )}
                      </span>
                      </TableCell>

                      <TableCell className="font-medium hidden lg:table-cell">
                        <span className="ml-6">
                          <Checkbox defaultChecked={track.is_private} disabled/>
                        </span>
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
                              onClick={() => router.push(`tracks/${track.slug}/edit`)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(track.slug)}>Delete</DropdownMenuItem>
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