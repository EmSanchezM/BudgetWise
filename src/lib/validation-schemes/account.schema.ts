import { z } from "@builder.io/qwik-city";

export const CreateAccountSchemaValidation = {
  name: z.string({ required_error: 'Name is required'}).min(2, 'Name minimum 2 characters'),
  numberAccount: z.string({ required_error: 'numberAccount is required' }).min(6, 'numberAccount minimum 6 characters'),
  type: z.string({ required_error: 'Type is required'}).min(3, 'Minimum 3 characteres'),
  currency: z.string({ required_error: 'Currency is required' }).min(2, 'Currency minimum 3 characters'),
  balance: z.coerce.number({ required_error: 'Balance is required' }).min(1, "Balance minimum 1"),
}

export const UpdateAccountSchemaValidation = {
  name: z.string().min(2, 'Name minimum 2 characters').nullable(),
  numberAccount: z.string().min(6, 'numberAccount minimum 6 characters').nullable(),
  type: z.string().min(3, 'Minimum 3 characteres').nullable(),
  currency: z.string().min(2, 'Currency minimum 3 characters').nullable(),
  balance: z.coerce.number().min(1, "Balance minimum 1").nullable(),
}