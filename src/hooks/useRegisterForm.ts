import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/lib/features/auth/authApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { loginUrl } from "@/utils/consts";

const registerFormSchema = z.object({
  email: z
    .string()
    .email("Please enter your email address."),
  type_profile: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters"
    })
    .regex(/[0-9]/, { message: "Must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" }),
  re_password: z
    .string(),
}).refine((data) => data.password === data.re_password, {
  path: ["re_password"],
  message: "Passwords don't match",
});

type RegisterFormValue = z.infer<typeof registerFormSchema>

export default function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: { type_profile: "user" }
  });

  const [registerUser, { isLoading }] = useRegisterMutation()
  const router = useRouter()

  function onSubmit(data: RegisterFormValue) {
    registerUser({ ...data })
      .unwrap()
      .then(() => {
        toast.info("Please check email to verify account.", {
          description: "A verification link has been sent to your inbox.",
        });

        router.push(loginUrl)
      })
      .catch((error) => {
        toast.error("Uh oh! Something went wrong.", {
          description: error?.data?.detail || "Please try again or contact support.",
        });

      })
  }

  return { register, handleSubmit, errors, isLoading, onSubmit, setValue, watch }
}