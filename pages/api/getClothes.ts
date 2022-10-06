import type { NextApiRequest, NextApiResponse } from 'next';
import { SearchResponse } from 'typesense/lib/Typesense/Documents';
import { typeSenseClient } from '../../src/lib/typeSenseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse<{}>>
) {
  const { search, page } = req.query;

  const typeSenseSearch = await typeSenseClient
    .collections('products')
    .documents()
    .search(
      {
        q: `${search ?? ''}`,
        query_by: 'name',
        page: parseInt(page ? `${page}` : '1'),
      },
      {}
    );

  res.status(200).json({ ...typeSenseSearch });
}
