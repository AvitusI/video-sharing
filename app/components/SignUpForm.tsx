"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCountdown } from "usehooks-ts";
import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import { signUp } from "../actions/auth.actions";
import { resendVerificationEmail } from "../actions/auth.actions";
import { SignUpSchema } from "@/app/types";
import { useEffect, useState } from "react";

export const SignUpForm = () => {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60,
      intervalMs: 1000,
    });

  useEffect(() => {
    if (count === 0) {
      stopCountdown();
      resetCountdown();
    }
  }, [count, stopCountdown, resetCountdown]);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [showResendVerificationEmail, setShowResendVerificationEmail] =
    useState(false);

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const res = await signUp(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description:
          "We have sent a verification email to your email address. Please verify your email address to continue.",
      });
      setShowResendVerificationEmail(true);
      startCountdown();
    }
  }

  const onResendVerificationEmail = async () => {
    const res = await resendVerificationEmail(form.getValues("email"));

    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: res.success,
      });
      startCountdown();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Annabel" {...field} />
              </FormControl>
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
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-500  hover:bg-green-300"
        >
          Submit
        </Button>
      </form>
      {showResendVerificationEmail && (
        <Button
          variant="link"
          onClick={onResendVerificationEmail}
          disabled={count > 0 && count < 60}
        >
          Resend verification email {count > 0 && count < 60 && `in ${count}s`}
        </Button>
      )}
    </Form>
  );
};
