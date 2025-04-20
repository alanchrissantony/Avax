import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {usePostMyAlbumMutation} from "@/lib/features/albums/albumApiSlice";
import {z} from "zod";
import {useState} from "react";
import {format} from "date-fns";
import {useRouter} from "next/navigation";


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
  release_date: z.string().refine((date) => {
    return !isNaN(Date.parse(date));
  }, {
    message: "Date must be a valid date string",
  }),
  is_private: z.boolean(),
})

export type AlbumFormValues = z.infer<typeof albumFormSchema>

export default function useAlbumCreateForm() {
  const [createAlbum, {isLoading}] = usePostMyAlbumMutation();
  const [tempImage, setTempImage] = useState<string>('');
  const router = useRouter();


  const form = useForm<AlbumFormValues>({
    resolver: zodResolver(albumFormSchema),

    defaultValues: {
      title: '',
      description: '',
      image: '',
      release_date: format(new Date(), "yyyy-MM-dd"),
      is_private: false,
    },
    mode: "onChange",
  })


  function onSubmit(data: AlbumFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0], data.image[0].name);
    }
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("release_date", format(data.release_date, "yyyy-MM-dd"));
    formData.append("is_private", data.is_private.toString());

    createAlbum(formData)
      .unwrap()
      .then(() => {
        toast.success('Created Album')
        router.replace(`/account/my/artist/albums`)
      })
      .catch((err) => {
        toast.error(err?.data?.title?.[0] || 'Failed to create Album')
      });
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage}
}