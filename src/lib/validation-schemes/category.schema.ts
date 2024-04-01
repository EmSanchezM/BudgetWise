import { z } from "@builder.io/qwik-city";

export const CreateCategorySchemaValidation = {
  name: z.string({ required_error: 'Name is required'}).min(2, 'Name minimum 2 characters'),
  description: z.string({ required_error: 'Description is required' }).min(4, "Description minimum 4 characters"),
  color: z.string({ required_error: 'Color is required' }).min(2, 'Color minimum 2 characters')
}

export const UpdateCategorySchemaValidation = {
  name: z.string().min(2, 'Name minimum 2 characters').nullable(),
  description: z.string().min(4, "Description minimum 4 characters").nullable(),
  color: z.string().min(2, 'Color minimum 2 characters').nullable()
}
