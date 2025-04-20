import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {MoreHorizontal, PlusCircle} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import * as React from "react";
import {License} from "@/types/types";
import FullScreenSpinner from "@/components/general/FullScreenSpinner";
import {useDeleteMeArtistLicenseMutation} from "@/lib/features/artists/artistApiSlice";


interface Prop {
  license?: License[] | undefined;
}

export default function MyLicenseTable({license}: Prop) {
  const router = useRouter()

  const [licenseDelete, {isLoading}] = useDeleteMeArtistLicenseMutation();

  function handleDelete(id: number) {
    alert('Are you sure you want to delete this license?');

    licenseDelete({id})
      .unwrap()
      .then(() => {
        toast.success('Deleted License')
      })
      .catch(() => toast.error('Failed to delete License'))
  }

  if (isLoading) return <FullScreenSpinner/>

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" onClick={() => router.push('license/create')}>
            <PlusCircle className="h-3.5 w-3.5"/>
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add License
              </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card x-chunk="dashboard-06-chunk-0" className="bg-black">
          <CardHeader>
            <CardTitle>License</CardTitle>
            <CardDescription>
              Manage your License and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Text</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {license?.map((item) => (
                  <TableRow key={item.id}>

                    <TableCell className="font-medium">
                      <span>
                        {item.name}
                      </span>
                    </TableCell>

                    <TableCell className="font-medium hidden md:table-cell">
                      <span>
                        {item.text.slice(0, 200)}{item.text.length > 200 ? '...' : ''}
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
                            onClick={() => router.push(`license/${item.id}/edit`)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(item.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}