import {z} from "zod";
import {
  useDeleteUserMeMutation,
  useLogoutMutation,
  useUpdateUserProfileMutation
} from "@/lib/features/auth/authApiSlice";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/lib/hooks";
import {toast} from "react-toastify";
import {logout as setLogout} from "@/lib/features/auth/authSlice";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {User} from "@/types/types";


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
})

export type AccountFormValues = z.infer<typeof accountFormSchema>


export default function useAccountForm(user: User | undefined) {
  const [updateUser, {isLoading: isLoadingUpdate}] = useUpdateUserProfileMutation();
  const [deleteUser, {isLoading: isLoadingDelete}] = useDeleteUserMeMutation();
  const [logout,] = useLogoutMutation();
  const [password, setPassword] = useState('')

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: user,
    mode: "onChange",
  })

  function onSubmit(data: AccountFormValues) {
    console.log(data);

    updateUser(data)
      .unwrap()
      .then(() => {
        toast.success('Updated Account')
      })
      .catch(() => {
        toast.error('Failed to update Account')
      });
  }

  function handleDelete(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    deleteUser({current_password: password})
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

  return {onSubmit, handleDelete, isLoadingDelete, isLoadingUpdate, password, setPassword, form}
}