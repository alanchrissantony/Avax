import { z } from "zod";
import {
  useDeleteUserMeMutation,
  useLogoutMutation,
  useUpdateUserProfileMutation
} from "@/lib/features/auth/authApiSlice";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "sonner"
import { logout as setLogout } from "@/lib/features/auth/authSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfile } from "@/types/types";


export const accountFormSchema = z.object({
  email: z
    .string()
    .readonly(),
  display_name: z
    .string()
    .min(2, {
      message: "Display name must be at least 2 characters.",
    })
    .max(30, {
      message: "Display name must not be longer than 30 characters.",
    }),
  gender: z.string({
    required_error: "Please select a gender.",
  }),
  country: z.string({
    required_error: "Please select a country.",
  }),
  image: z.any(),
})

export type AccountFormValues = z.infer<typeof accountFormSchema>


export default function useAccountForm(user: UserProfile | undefined) {
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserProfileMutation();
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMeMutation();
  const [logout,] = useLogoutMutation();
  const [password, setPassword] = useState('')
  const [tempImage, setTempImage] = useState<string | undefined>(user?.image);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: user,
    mode: "onChange",
  })

  function onSubmit(data: AccountFormValues) {

    const formData = new FormData();
    if (data.image && data.image[0] && typeof data.image[0] !== "string") {
      formData.append('image', data.image[0], data.image[0].name);
    }
    formData.append("display_name", data.display_name);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("country", data.country);

    updateUser(formData)
      .unwrap()
      .then(() => {
        toast.success('Updated Account', {
          description: 'Your account details have been updated successfully.',
        });

      })
      .catch((error) => {
        toast.error('Operation failed', {
          description: error?.data?.detail || 'Please try again or contact support.',
        });

      });
  }

  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    deleteUser({ current_password: password })
      .unwrap()
      .then(() => {
        toast.success('Deleted Account')
      })
      .catch(() => toast.error('Failed to delete Account'))
    logout(undefined)
      .unwrap()
      .then(() => {
        dispatch(setLogout());
      })
      .catch()
      .finally(() => {
        router.push("/");
      })
  }

  return {
    onSubmit,
    handleDelete,
    isLoadingDelete,
    isLoadingUpdate,
    password,
    setPassword,
    form,
    tempImage,
    setTempImage
  }
}