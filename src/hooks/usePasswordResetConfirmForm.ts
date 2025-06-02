import { z } from "zod";
import { useResetPasswordConfirmMutation } from "@/lib/features/auth/authApiSlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { toast } from "sonner"
import { loginUrl, profileMyUrl } from "@/utils/consts";


const passwordResetConfirmFormSchema = z.object({
  new_password: z
    .string()
    .min(8, {
      message: "At least 8 characters"
    })
    .regex(/[0-9]/, { message: "At least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "one special character" }),
  re_new_password: z
    .string(),
}).refine((data) => data.new_password === data.re_new_password, {
  path: ["re_new_password"],
  message: "Passwords don't match",
});

type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmFormSchema>


export default function usePasswordResetConfirmForm(uid: string, token: string) {
  const [resetPasswordConfirm, { isLoading }] = useResetPasswordConfirmMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetConfirmFormValues>({
    resolver: zodResolver(passwordResetConfirmFormSchema),
    mode: "onChange",
  });

  const router = useRouter()

  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect(profileMyUrl);
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetConfirmFormValues) {
    const { new_password, re_new_password } = data

    resetPasswordConfirm({ uid, token, new_password, re_new_password })
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

  return { errors, isLoading, onSubmit, register, handleSubmit }
}