import { z } from "@builder.io/qwik-city";

export const SignUpSchemaValidation = {
  email: z.string().email('Email is required'),
  firstName: z.string({ required_error: 'First name is required' }).min(2, 'First name minimum 2 characters'),
  lastName: z.string({ required_error: 'Last name is required' }).min(2,'Last name minimum 2 characters'),
  password: z.string({ required_error: 'Password is required' }).min(6, "Password minimum 2 characters"),
}