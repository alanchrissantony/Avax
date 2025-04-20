import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {useUpdateMyAlbumMutation} from "@/lib/features/albums/albumApiSlice";
import {useState} from "react";
import {format} from "date-fns";
import {DetailAlbum} from "@/types/types";
import {albumFormSchema, AlbumFormValues} from "@/hooks/useAlbumCreateForm";


export default function useAlbumEditForm(album: DetailAlbum | undefined) {
  const [updateAlbum, {isLoading}] = useUpdateMyAlbumMutation();
  const [tempImage, setTempImage] = useState<string | undefined>(album?.image);


  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumFormSchema),

    defaultValues: album,
    mode: "onChange",
  })


  function onSubmit(data: AlbumFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    if (data.image && data.image[0] && typeof data.image !== "string") {
      formData.append('image', data.image[0], data.image[0].name);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("release_date", format(data.release_date, "yyyy-MM-dd"));
    formData.append("is_private", data.is_private.toString());

    updateAlbum({slug: album?.slug, data: formData})
      .unwrap()
      .then(() => {
        toast.success('Updated Album')
      })
      .catch((err) => {
        toast.error(err?.data?.title?.[0] || 'Failed to update Album')
      });
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage}
}