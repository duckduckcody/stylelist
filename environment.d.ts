declare global {
  namespace NodeJS {
    interface ProcessEnv {
      typesense_node_url: string;
      typesense_search_api_key: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
