import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {z} from "zod";
import {useRouter} from "next/navigation";
import {usePostMeArtistLicenseMutation} from "@/lib/features/artists/artistApiSlice";


export const licenseFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must not be longer than 100 characters.",
    }),
  text: z.string()
    .max(1000, {message: 'Must not be longer than 1000 characters.',}),
})

export type LicenseFormValues = z.infer<typeof licenseFormSchema>

export default function useLicenseCreateForm() {
  const [createLicense, {isLoading}] = usePostMeArtistLicenseMutation();
  const router = useRouter();


  const form = useForm<LicenseFormValues>({
    resolver: zodResolver(licenseFormSchema),

    defaultValues: {
      name: '',
      text: '',
    },
    mode: "onChange",
  })


  function onSubmit(data: LicenseFormValues) {
    createLicense({body: data})
      .unwrap()
      .then((data) => {
        toast.success('Created License')
        router.replace(`/account/my/artist/license/${data.id}/edit`)
      })
      .catch((err) => {
        toast.error(err?.data?.name?.[0] || 'Failed to create License')
      });
  }

  return {form, onSubmit, isLoading}
}