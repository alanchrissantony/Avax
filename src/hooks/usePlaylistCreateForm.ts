import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {z} from "zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {usePostMyPlaylistMutation} from "@/lib/features/playlists/playlistApiSlice";
import {useAppSelector} from "@/lib/hooks";
import {loginUrl} from "@/utils/consts";


export const playlistFormSchema = z.object({
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
  image: z.any().optional(),
  is_private: z.boolean(),
})

export type PlaylistFormValues = z.infer<typeof playlistFormSchema>

export default function usePlaylistCreateForm() {
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const [createPlaylist, {isLoading}] = usePostMyPlaylistMutation();
  const [tempImage, setTempImage] = useState<string>('');
  const router = useRouter();


  const form = useForm<PlaylistFormValues>({
    resolver: zodResolver(playlistFormSchema),

    defaultValues: {
      title: '',
      description: '',
      image: '',
      is_private: false,
    },
    mode: "onChange",
  })


  function onSubmit(data: PlaylistFormValues) {
    if (!isAuthenticated) return router.replace(loginUrl)

    let formData
    if (data.image && data.title && data.description && data.is_private) {
      formData = new FormData();
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0], data.image[0].name);
      }
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("is_private", data.is_private.toString());
    }

    createPlaylist(formData || data)
      .unwrap()
      .then((data) => {
        toast.success('Created Playlist')
        router.replace(`/playlists/my/${data.slug}`)
      })
      .catch((err) => {
        toast.error(err?.data?.title?.[0] || 'Failed to create Playlist')
      });
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage}
}