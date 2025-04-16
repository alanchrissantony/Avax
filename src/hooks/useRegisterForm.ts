import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRegisterMutation} from "@/lib/features/auth/authApiSlice";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {loginUrl} from "@/utils/consts";

const registerFormSchema = z.object({
  email: z
    .string()
    .email("Please enter your Avax email address."),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters"
    })
    .max(40, {
      message: "Password must not be longer then 40 characters"
    }),
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
    formState: {errors},
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const [typeProfile, setTypeProfile] = useState('user')

  const [registerUser, {isLoading}] = useRegisterMutation()
  const router = useRouter()

  function onSubmit(data: RegisterFormValue) {
    registerUser({...data, "type_profile": typeProfile})
      .unwrap()
      .then(() => {

        toast.info("Please check email to verify account.")
        router.push(loginUrl)
      })
      .catch(() => {
        toast.error("Uh oh! Something went wrong.")
      })
  }

  return {register, handleSubmit, errors, isLoading, onSubmit, setTypeProfile}
}