import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {z} from "zod";
import {useState} from "react";
import {format} from "date-fns";
import {useRouter} from "next/navigation";
import {usePostMyTrackMutation} from "@/lib/features/tracks/trackApiSlice";


export const trackFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  image: z.any(),
  license: z.any({
    required_error: "Please select a license.",
  }),
  genre: z.any({
    required_error: "Please select a genre.",
  }),
  album: z.any({
    required_error: "Please select a album.",
  }),
  file: z.any({
    required_error: "Please upload track file.",
  }),
  release_date: z.string().refine((date) => {
    return !isNaN(Date.parse(date));
  }, {
    message: "Date must be a valid date string",
  }),
  is_private: z.boolean(),
})

export type TrackFormValues = z.infer<typeof trackFormSchema>

export default function useTrackCreateForm() {
  const [createTrack, {isLoading}] = usePostMyTrackMutation();
  const [tempImage, setTempImage] = useState<string>('');
  const [tempAudio, setTempAudio] = useState<string>('');
  const router = useRouter();


  const form = useForm<TrackFormValues>({
    resolver: zodResolver(trackFormSchema),

    defaultValues: {
      title: '',
      image: '',
      album: null,
      license: null,
      genre: null,
      file: '',
      release_date: format(new Date(), "yyyy-MM-dd"),
      is_private: false,
    },
    mode: "onChange",
  })


  function onSubmit(data: TrackFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0], data.image[0].name);
    }
    formData.append("title", data.title);
    formData.append("file", data.file[0], data.file[0].name);
    formData.append("album", data.album);
    formData.append("license", data.license);
    formData.append("genre", data.genre);
    formData.append("release_date", format(data.release_date, "yyyy-MM-dd"));
    formData.append("is_private", data.is_private.toString());

    createTrack(formData)
      .unwrap()
      .then((data) => {
        toast.success('Created Track')
        router.replace(`/account/my/artist/tracks/${data.slug}/edit`)
      })
      .catch((err) => {
        toast.error(err?.data?.title?.[0] || 'Failed to create Track')
      });
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage, tempAudio, setTempAudio}
}