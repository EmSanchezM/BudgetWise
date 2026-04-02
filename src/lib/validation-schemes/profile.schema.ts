import { z } from "zod";

export const UpdateProfileSchemaValidation = {
  firstName: z.string({ required_error: 'First name is required' }).min(2, 'Minimum 2 characters'),
  lastName: z.string({ required_error: 'Last name is required' }).min(2, 'Minimum 2 characters'),
};

export const ChangePasswordSchemaValidation = {
  currentPassword: z.string({ required_error: 'Current password is required' }).min(6, 'Minimum 6 characters'),
  newPassword: z.string({ required_error: 'New password is required' }).min(6, 'Minimum 6 characters'),
};
