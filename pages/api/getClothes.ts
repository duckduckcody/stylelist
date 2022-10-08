import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typeSenseClient } from '../../src/lib/typeSenseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse<{}>>
) {
  const { search, page } = req.query;

  const typeSenseSearch = await getTypeSenseClothes(
    search ? `${search}` : undefined,
    parseInt(page ? `${page}` : '1')
  );

  res.status(200).json({ ...typeSenseSearch });
}

export const getTypeSenseClothes = async (q: string = '', page: number = 1) =>
  await typeSenseClient.collections('products').documents().search(
    {
      q,
      query_by: 'name',
      page,
    },
    {}
  );
