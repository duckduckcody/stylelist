import { z } from 'zod';

export const clotheSchema = z.object({
  name: z.string(),
  price: z.number(),
  oldPrice: z.number().optional(),
  images: z.array(z.string()),
  link: z.string(),
  details: z.string(),
  brand: z.string(),
  website: z.string(),
});

export type Clothe = z.infer<typeof clotheSchema>;
