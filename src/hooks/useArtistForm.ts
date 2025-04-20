import {z} from "zod";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Artist} from "@/types/types";
import {useUpdateMeArtistMutation} from "@/lib/features/artists/artistApiSlice";
import {useState} from "react";


export const artistFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  display_name: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(30, {
      message: "Display name must not be longer than 30 characters.",
    }),
  image: z.any({
    required_error: "Image is required."
  }),
})

export type ArtistFormValues = z.infer<typeof artistFormSchema>


export default function useArtistForm(artist: Artist | undefined) {
  const [updateArtist, {isLoading: isLoadingUpdate}] = useUpdateMeArtistMutation();
  const [tempImage, setTempImage] = useState<string | undefined>(artist?.image);


  const form = useForm<ArtistFormValues>({
    resolver: zodResolver(artistFormSchema),
    defaultValues: artist,
    mode: "onChange",
  })

  function onSubmit(data: ArtistFormValues) {

    const formData = new FormData();
    if (data.image && data.image[0] && typeof data.image[0] !== "string") {
      formData.append('image', data.image[0], data.image[0].name);
    }
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("display_name", data.display_name);

    updateArtist(formData)
      .unwrap()
      .then(() => {
        toast.success('Updated Artist profile')
      })
      .catch(() => {
        toast.error('Failed to update Artist profile')
      });
  }

  return {onSubmit, isLoadingUpdate, form, tempImage, setTempImage}
}