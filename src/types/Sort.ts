import { z } from 'zod';

export const SortEnum = z.enum(['Price Low To High', 'Price High To Low']);
export type Sort = z.infer<typeof SortEnum>;

export const sortToApiQuery = (sort: Sort | undefined): string => {
  switch (sort) {
    case 'Price High To Low':
      return 'price:desc';
    case 'Price Low To High':
      return 'price:asc';
    default:
      return '';
  }
};
