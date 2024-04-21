import { z } from "@builder.io/qwik-city";

export const CreateBudgetSchemaValidation = {
  name: z.string({ required_error: 'Name is required'}).min(2, 'Name minimum 2 characters'),
  amount: z.coerce.number({ required_error: 'Amount is required' }).min(1, "Amount minimum 1"),
  currency: z.string({ required_error: 'Currency is required' }).min(2, 'Currency minimum 3 characters'),
  initDate: z.coerce.date(),
  finishDate: z.coerce.date()
}

export const UpdateBudgetSchemaValidation = {
  name: z.string().min(2, 'Name minimum 2 characters').nullable(),
  amount: z.coerce.number().min(1, "Amount minimum 1").nullable(),
  currency: z.string().min(2, 'Currency minimum 3 characters').nullable(),
  initDate: z.coerce.date().nullable(),
  finishDate: z.coerce.date().nullable()
}