import { z } from 'zod';
import { clotheSchema } from './Clothe';

export const persistedStateSchema = z.object({
  favourites: z.array(clotheSchema),
});
export type PersistedState = z.infer<typeof persistedStateSchema>;
