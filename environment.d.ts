declare global {
  namespace NodeJS {
    interface ProcessEnv {
      typesense_node_url: string;
      typesense_search_api_key: string;
    }
  }
}

export {};
