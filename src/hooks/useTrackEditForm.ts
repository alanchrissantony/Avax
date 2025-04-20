import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {useState} from "react";
import {format} from "date-fns";
import {useUpdateMyTrackMutation} from "@/lib/features/tracks/trackApiSlice";
import {DetailTrack} from "@/types/types";
import {trackFormSchema, TrackFormValues} from "@/hooks/useTrackCreateForm";


export default function useTrackEditForm(track: DetailTrack | undefined) {
  const [updateTrack, {isLoading}] = useUpdateMyTrackMutation();
  const [tempImage, setTempImage] = useState<string | undefined>(track?.image);
  const [tempAudio, setTempAudio] = useState<string | undefined>(track?.file);


  const form = useForm<TrackFormValues>({
    resolver: zodResolver(trackFormSchema),
    defaultValues: track,
    mode: "onChange",
  })


  function onSubmit(data: TrackFormValues) {
    console.log('Data: ', data)

    const formData = new FormData();
    if (data.image && data.image[0] && typeof data.image[0] !== "string") {
      formData.append('image', data.image[0], data.image[0].name);
    }
    if (data.file && data.file[0] && typeof data.file[0] !== "string") {
      formData.append("file", data.file[0], data.file[0].name);
    }

    formData.append("title", data.title);
    formData.append("album", data.album);
    formData.append("license", data.license);
    formData.append("genre", data.genre);
    formData.append("release_date", format(data.release_date, "yyyy-MM-dd"));
    formData.append("is_private", data.is_private.toString());

    updateTrack({slug: track?.slug, data: formData})
      .unwrap()
      .then(() => {
        toast.success('Updated Track')
      })
      .catch((err) => {
        toast.error(err?.data?.title?.[0] || 'Failed to update Track')
      });
  }

  return {form, onSubmit, isLoading, tempImage, setTempImage, tempAudio, setTempAudio}
}