import { SearchClient as TypesenseSearchClient } from 'typesense';
export const typeSenseClient = new TypesenseSearchClient({
  nodes: [
    process.env.NODE_ENV === 'production'
      ? {
          // @ts-ignore
          host: process.env.typesense_node_url,
          port: 443,
          protocol: 'http', // For Typesense Cloud use https
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
