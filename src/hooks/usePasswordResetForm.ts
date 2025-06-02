import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "@/lib/features/auth/authApiSlice";
import { redirect, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { toast } from "sonner"
import { loginUrl, profileMyUrl } from "@/utils/consts";


export const passwordResetFormSchema = z.object({
  email: z
    .string()
    .email("enter your email address."),
})

export type PasswordResetFormValues = z.infer<typeof passwordResetFormSchema>

export default function usePasswordResetForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetFormSchema),
    mode: "onChange",
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const router = useRouter()

  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect(profileMyUrl);
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetFormValues) {
    resetPassword(data.email)
      .unwrap()
      .then(() => {
        router.push(loginUrl)
        toast.success("Request sent, check your email", {
          description: "Please follow the instructions sent to your email to proceed.",
        });

      })
      .catch((error) => {
        toast.error("Failed to send request.", {
          description: error?.data?.detail || "Please try again or contact support.",
        });

      })
  }

  return { handleSubmit, register, onSubmit, errors, isLoading }
}