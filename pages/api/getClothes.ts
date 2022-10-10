import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { z } from 'zod';
import { typeSenseClient } from '../../src/lib/typeSenseClient';
import { Sort, SortEnum, sortToApiQuery } from '../../src/types/Sort';

const querySchema = z.object({
  q: z.string().optional(),
  page: z.string().optional(),
  sort: SortEnum.optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse<{}> | { error: object }>
) {
  const queryParse = querySchema.safeParse({
    q: req.query.q || undefined,
    page: req.query.page || undefined,
    sort: req.query.sort || undefined,
  });

  if (queryParse.success) {
    const typeSenseSearch = await getTypeSenseClothes(
      queryParse.data.q,
      queryParse.data.page,
      queryParse.data.sort
    );

    res.status(200).json({ ...typeSenseSearch });
  } else {
    res.status(200).json({ error: queryParse.error });
  }
}

export const getTypeSenseClothes = async (
  q: string = '',
  page: string = '1',
  sort: Sort | undefined = undefined
) =>
  await typeSenseClient
    .collections('products')
    .documents()
    .search(
      {
        q,
        query_by: 'name',
        page: parseInt(page),
        sort_by: sortToApiQuery(sort),
      },
      {}
    );
