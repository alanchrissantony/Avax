import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {usePostMyAlbumMutation} from "@/lib/features/albums/albumApiSlice";
import {z} from "zod";
import {useState} from "react";


export const albumFormSchema = z.object({
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
  image: z.any(),
  release_date: z.date(),
  is_private: z.boolean(),
})

export type AlbumFormValues = z.infer<typeof albumFormSchema>

export default function useAlbumCreateForm() {
  const [createAlbum, {isLoading}] = usePostMyAlbumMutation();
  const [tempImage, setTempImage] = useState<string>('');


  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumFormSchema),

    defaultValues: {
      title: '',
      description: '',
      image: '',
      release_date: new Date(),
      is_private: false,
    },
    mode: "onChange",
  })


  function onSubmit(data: AlbumFormValues) {
    console.log('Data: ', data)

    createAlbum(data)
      .unwrap()
      .then(() => {
        toast.success('Created Album')
      })
      .catch(() => {
        toast.error('Failed to create Album')
      });
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage}
}