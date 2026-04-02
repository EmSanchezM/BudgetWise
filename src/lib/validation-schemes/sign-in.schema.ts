import { z } from "zod";

export const SignInSchemaValidation = {
  email: z.string().email('Email is required'),
  password: z.string({ required_error: 'Password is required' }).min(6, "Password minimum 2 characters"),
}