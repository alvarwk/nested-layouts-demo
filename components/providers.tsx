"use client";
import { customSearchClient } from "@/lib/algolia";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <InstantSearchNext
      searchClient={customSearchClient}
      indexName="dev_products"
      routing
    >
      {children}
    </InstantSearchNext>
  );
};
