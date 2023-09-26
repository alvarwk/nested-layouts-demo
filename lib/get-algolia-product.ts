import { cache } from "react";
import { algoliaServerClient } from "./algolia";

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

export const getAlogliaProduct = async (productNumber: string) =>
  await algoliaServerClient.initIndex(INDEX_NAME).getObject<any>(productNumber);

export const getCachedAlogliaProduct = (productNumber: string) =>
  cache(async () => await getAlogliaProduct(productNumber))();
