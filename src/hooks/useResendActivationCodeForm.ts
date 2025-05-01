import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useResendActivationCodeMutation} from "@/lib/features/auth/authApiSlice";
import {redirect, useRouter} from "next/navigation";
import {useAppSelector} from "@/lib/hooks";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {loginUrl, profileMyUrl} from "@/utils/consts";
import {passwordResetFormSchema, PasswordResetFormValues} from "@/hooks/usePasswordResetForm";


export default function useResendActivationCodeForm() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetFormSchema),
    mode: "onChange",
  });

  const [resendActivationCode, {isLoading}] = useResendActivationCodeMutation()

  const router = useRouter()

  const {isAuthenticated} = useAppSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) redirect(profileMyUrl);
  }, [isAuthenticated]);


  function onSubmit(data: PasswordResetFormValues) {
    resendActivationCode(data.email)
      .unwrap()
      .then(() => {
        router.push(loginUrl)
        toast.success("Request send, check your email")
      })
      .catch((error) => {
        toast.error(error?.data?.detail || "Failed to send request.")
      })
  }

  return {handleSubmit, register, onSubmit, errors, isLoading}
}