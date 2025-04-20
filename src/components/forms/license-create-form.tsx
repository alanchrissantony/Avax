"use client"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import Loader from "@/components/general/Loader";
import {Textarea} from "@/components/ui/textarea";
import useLicenseCreateForm from "@/hooks/useLicenseCreateForm";


export function LicenseCreateForm() {
  const {
    form,
    onSubmit,
    isLoading,
  } = useLicenseCreateForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>License name</FormLabel>
              <FormControl>
                <Input placeholder="MTV..." {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({field}) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea placeholder='About license...' className='resize-y min-h-[150px]' {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={isLoading}>
          {isLoading
            ? <Loader/>
            : 'Create license'
          }
        </Button>
      </form>
    </Form>
  )
}