import type { NextApiRequest, NextApiResponse } from 'next';
import {
  SearchOptions,
  SearchParams,
  SearchResponse,
} from 'typesense/lib/Typesense/Documents';
import { z } from 'zod';
import { PER_PAGE_PRODUCT_LIMIT } from '../../src/constants';
import { typeSenseClient } from '../../src/lib/typeSenseClient';
import { Sort, SortEnum, sortToApiQuery } from '../../src/types/Sort';

const querySchema = z.object({
  q: z.string().optional(),
  page: z.string().optional(),
  sort: SortEnum.optional(),
  filter: z.string().optional(),
});

export const PerPageSize = 30;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse<{}> | { error: object }>
) {
  const queryParse = querySchema.safeParse({
    q: req.query.q || undefined,
    page: req.query.page || undefined,
    sort: req.query.sort || undefined,
    filter: req.query.filter || undefined,
  });

  if (queryParse.success) {
    const typeSenseSearch = await getTypeSenseClothes(
      queryParse.data.q,
      queryParse.data.page,
      queryParse.data.sort,
      queryParse.data.filter
    );

    res.status(200).json({ ...typeSenseSearch });
  } else {
    res.status(200).json({ error: queryParse.error });
  }
}

export const getTypeSenseClothes = async (
  q: string = '',
  page: string = '1',
  sort: Sort | undefined = undefined,
  filter: string | undefined = undefined
) => {
  const searchOptions: SearchOptions = {};
  const searchParams: SearchParams = {
    q,
    query_by: 'name,brand,categories',
    page: parseInt(page),
    sort_by: sortToApiQuery(sort),
    facet_by: 'genders,website,categories,brand,sizes,price',
    per_page: PER_PAGE_PRODUCT_LIMIT,
    search_cutoff_ms: 5,
    max_facet_values: 33,
  };

  if (filter) {
    searchParams.filter_by = filter;
  }

  return await typeSenseClient
    .collections('products')
    .documents()
    .search(searchParams, searchOptions);
};
