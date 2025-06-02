import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner"
import { License } from "@/types/types";
import { licenseFormSchema, LicenseFormValues } from "@/hooks/useLicenseCreateForm";
import { useUpdateMeArtistLicenseMutation } from "@/lib/features/artists/artistApiSlice";


export default function useLicenseEditForm(license: License | undefined) {
  const [updateLicense, { isLoading }] = useUpdateMeArtistLicenseMutation();

  const form = useForm<LicenseFormValues>({
    resolver: zodResolver(licenseFormSchema),
    defaultValues: license,
    mode: "onChange",
  })

  function onSubmit(data: LicenseFormValues) {
    if (data.name === license?.name && data.text === license?.text)
      return toast.info('You dont change any fields.');

    updateLicense({ id: license?.id, body: data })
      .unwrap()
      .then(() => {
        toast.success('Updated License', {
          description: 'The license has been updated successfully.',
        });

      })
      .catch((err) => {
        toast.error('Failed to update License', {
          description: err?.data?.name?.[0] || 'Please try again or contact support.',
        });

      });
  }

  return { form, onSubmit, isLoading }
}