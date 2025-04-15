"use client"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {Separator} from "@/components/ui/separator";
import Loader from "@/components/general/Loader";
import useAccountForm from "@/hooks/useAccountForm";
import {User} from "@/types/types";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {countries} from "@/utils/constForm";
import {Check} from "lucide-react";
import {CaretSortIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";


interface UserFormProps {
  user?: User;
}

export function AccountForm({user}: UserFormProps) {
  const {
    isLoadingDelete,
    isLoadingUpdate,
    password,
    form,
    setPassword,
    onSubmit,
    handleDelete,
  } = useAccountForm(user)

  console.log(user)


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} readOnly/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="display_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({field}) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="country"
            render={({field}) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries.find(
                            (country) => country.value === field.value
                          )?.label
                          : "Select country"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search country..."/>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {countries.map((country) => (
                            <CommandItem
                              value={country.label}
                              key={country.value}
                              onSelect={() => {
                                form.setValue("country", country.value)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {country.label}
                            </CommandItem>
                          ))}
                        </CommandList>
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage/>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className='w-full text-gray-100 bg-green-600'
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate
              ? <Loader/>
              : 'Update profile'
            }
          </Button>
        </form>
      </Form>

      <Separator/>

      <div>
        <h3 className="text-lg font-medium">Delete account</h3>
        <p className="text-sm text-muted-foreground">
          Enter your current password to delete your account.
        </p>
        <p className="text-sm text-muted-foreground text-red-500">
          WARNING: after deletion, all data will be invalidated. It is impossible to restore.
        </p>
      </div>

      <form onSubmit={handleDelete}>
        <Label>Password</Label>
        <Input className='mt-2' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>

        <Button type="submit" variant="destructive" className='mt-8 w-full'
                disabled={isLoadingDelete}>
          {isLoadingDelete
            ? <Loader/>
            : 'Delete account'
          }
        </Button>
      </form>
    </>
  )
}