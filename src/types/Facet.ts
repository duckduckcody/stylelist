import { z } from 'zod';

export const facetSchema = z.object({
  field_name: z.string(),
  stats: z.object({
    total_values: z.number(),
  }),
  counts: z.array(
    z.object({
      count: z.number(),
      highlighted: z.string(),
      value: z.string(),
    })
  ),
});
export type Facet = z.infer<typeof facetSchema>;

export const facetsSchema = z.array(facetSchema);
export type Facets = z.infer<typeof facetsSchema>;
