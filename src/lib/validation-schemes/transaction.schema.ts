import { z } from "zod";

export const CreateTransactionSchemaValidation = {
  name: z.string({ required_error: 'Name is required'}).min(2, 'Name minimum 2 characters'),
  transactionDate: z.string({ required_error: 'Transaction date is required'}).min(1, 'Transaction date is required'),
  amount: z.coerce.number({ required_error: 'Amount is required' }).min(1, "Amount minimum 1").transform((v) => Math.round(v * 100)),
  currency: z.string({ required_error: 'Currency is required' }).min(2, 'Currency minimum 3 characters'),
  description: z.string({ required_error: 'Description is required '}),
  account: z.coerce.number({ required_error: 'Account is required'}).min(1, "Account minimum 1"),
}

export const UpdateTransactionSchemaValidation = {
  name: z.string({ required_error: 'Name is required'}).min(2, 'Name minimum 2 characters').nullable(),
  transactionDate: z.string({ required_error: 'Transaction date is required'}).nullable(),
  amount: z.coerce.number({ required_error: 'Amount is required' }).min(1, "Amount minimum 1").transform((v) => Math.round(v * 100)).nullable(),
  currency: z.string({ required_error: 'Currency is required' }).min(2, 'Currency minimum 3 characters').nullable(),
  description: z.string({ required_error: 'Description is required '}).nullable(),
  account: z.coerce.number({ required_error: 'Account is required'}).min(1, "Account minimum 1").nullable(),
}