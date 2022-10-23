import { SearchClient as TypesenseSearchClient } from 'typesense';
export const typeSenseClient = new TypesenseSearchClient({
  nodes: [
    process.env.NODE_ENV === 'production'
      ? {
          host: '',
          port: 8108, // For Typesense Cloud use 443
          protocol: 'http', // For Typesense Cloud use https
        }
      : {
          host: 'localhost',
          port: 8108,
          protocol: 'http',
        },
  ],
  apiKey: process.env.NODE_ENV === 'production' ? '' : 'xyz',
  connectionTimeoutSeconds: 2,
});
