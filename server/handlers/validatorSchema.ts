import { z } from "npm:zod";

export const templateSchema = z.object({
  id: z.string().min(1)
});

export const personSchema = z.object({
  name:   z.string().min(1),
  number: z.string().min(3)
});

// export { templateSchema, personSchema };