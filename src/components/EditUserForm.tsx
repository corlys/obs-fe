import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserFormSchema, EditUser } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EditUserFormProps {
  className?: string;
  id: number;
  username: string;
  name: string;
  email: string;
  submitFn: (id: number, values: EditUser) => void;
  onClose: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  submitFn,
  className,
  id,
  name,
  username,
  email,
  onClose,
}) => {
  const form = useForm<EditUser>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      username,
      name,
      email,
    },
  });

  const onSubmit = (values: EditUser) => {
    submitFn(id, values);
    onClose();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-8", className)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormDescription>This is your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col items-end">
            <Button className="" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditUserForm;
