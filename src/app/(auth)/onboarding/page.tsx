"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { completeOnboarding } from "@/lib/actions/onboarding.action";
import { profileFormSchema } from "@/lib/validations";

const ProfileForm = () => {
  const { user } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      universityId: 0,
      universityCard: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof profileFormSchema>) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push("/my-profile");
    }
    if (res?.error) {
      toast.error(
        <div>
          <p className="text-muted-foreground">{String(res.error)}</p>
        </div>
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 items-center text-light-100">
      <h1 className="text-4xl font-semibold text-white">
        Welcome <span className="text-primary font-bold">{user?.fullName}</span>
      </h1>
      <div className="flex max-w-xl w-full flex-col gap-4">
        <h2 className="text-2xl font-semibold">Update your University ID</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="universityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-base text-light-100">
                    University ID Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="number"
                      {...field}
                      className="form-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="universityCard"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      type="image"
                      accept="image/*"
                      placeholder="Upload University ID Card"
                      folder="university-cards"
                      variant="dark"
                      onFileChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="form-btn">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
