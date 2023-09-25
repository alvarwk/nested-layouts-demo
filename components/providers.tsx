"use client";
import { searchClient } from "@/lib/algolia";
import { InstantSearchNext } from "react-instantsearch-nextjs";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="dev_products"
      routing
    >
      {children}
    </InstantSearchNext>
  );
};
