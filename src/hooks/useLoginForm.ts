import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/lib/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { setAuth } from "@/lib/features/auth/authSlice";
import { toast } from "sonner"
import { profileMyUrl } from "@/utils/consts";


const loginFormSchema = z.object({
  email: z
    .string()
    .email("Please enter your email address."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters"
    })
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export default function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const [login, { isLoading }] = useLoginMutation()

  const router = useRouter()

  const dispatch = useAppDispatch()

  function onSubmit(data: LoginFormValues) {
    const { email, password } = data

    login({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuth())

        router.push(profileMyUrl)
        toast.success("Login successfully", {
          description: "Welcome back! You have logged in successfully.",
        });

      })
      .catch((error) => {
        toast.error("Failed to log in.", {
          description: error?.data?.detail || "Please try again or contact support.",
        });

      })
  }

  return { register, handleSubmit, errors, isLoading, onSubmit }
}