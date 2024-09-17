import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3, {
    message: "username must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

/*
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  */

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});
