import { SearchClient as TypesenseSearchClient } from 'typesense';

export const typeSenseClient = new TypesenseSearchClient({
  nodes: [
    process.env.NODE_ENV === 'production'
      ? {
          host: process.env.typesense_node_url,
          port: 443,
          protocol: 'https',
        }
      : {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
  ],
  apiKey:
    process.env.NODE_ENV === 'production'
      ? process.env.typesense_search_api_key
      : 'xyz',
  connectionTimeoutSeconds: 2,
});
