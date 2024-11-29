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

export const MagicLinkSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export const EditProfileSchema = z.object({
  username: z.string().min(3, {
    message: "username must be at least 3 characters long",
  }),
  bio: z.string().max(160, {
    message: "bio must be at most 160 characters long",
  }).min(10, {
    message: "bio must be at least 10 characters long",
  }),
})