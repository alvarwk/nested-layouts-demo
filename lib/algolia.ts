import algoliasearchLite, { SearchClient } from "algoliasearch/lite";
import algoliasearch from "algoliasearch";
import { MultipleQueriesQuery } from "@algolia/client-search";

export const searchClient = algoliasearchLite(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

// this client will stop any empty queries
// from being sent to algolia
export const customSearchClient = {
  ...searchClient,
  search: (queries: readonly MultipleQueriesQuery[]) =>
    queries.some(({ params }) => Boolean(params?.query))
      ? searchClient.search(queries)
      : Promise.resolve({
          results: queries.map(() => ({
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            hitsPerPage: 0,
            exhaustiveNbHits: true,
            query: "",
            queryAfterRemoval: "",
            params: "",
            index: "",
          })),
        }),
} satisfies SearchClient;

export const algoliaServerClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);
