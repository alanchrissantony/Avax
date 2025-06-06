import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { useUpdateUserProfileImageMutation } from "@/lib/features/auth/authApiSlice";
import { User } from "@/types/types";


const imageFormSchema = z.object({
  image: z.any()
})

type ImageFormValues = z.infer<typeof imageFormSchema>

export default function useImageForm(user: User | undefined) {
  const [updateImage, { isLoading }] = useUpdateUserProfileImageMutation();
  const [tempImage, setTempImage] = useState(user?.image);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: { image: user?.image },
    mode: "onChange",
  })

  function onSubmit(data: ImageFormValues) {
    if (data?.image) {
      const formData = new FormData();
      formData.append('image', data.image[0], data.image[0].name);
      // @ts-ignore
      updateImage(formData)
        .unwrap()
        .then(() => {
          toast.success('Updated image', {
            description: 'The image has been updated successfully.',
          });

        })
        .catch((error) => {
          toast.error('Failed to update image', {
            description: error?.data?.detail || error?.message || 'Please try again or contact support.',
          });

        });
    } else {
      toast.warning('Not Uploaded Image', {
        description: 'Please upload a valid image to proceed.',
      });

    }
  }

  return { form, onSubmit, isLoading, tempImage, setTempImage }
}