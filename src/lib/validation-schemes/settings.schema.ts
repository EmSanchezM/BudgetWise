import { z } from "zod";

export const UpdateSettingsSchemaValidation = {
  defaultCurrency: z.string().min(2, 'Currency is required'),
  dateFormat: z.string().min(2, 'Date format is required'),
  theme: z.enum(['light', 'dark', 'system']),
};
