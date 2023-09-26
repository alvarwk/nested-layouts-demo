import {
  getAlogliaProduct,
  getCachedAlogliaProduct,
} from "@/lib/get-algolia-product";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./ui/breadcrumb";
import { cache } from "react";

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

interface BreadcrumbsProps {
  productNumber: string;
}

export const Breadcrumbs = async ({ productNumber }: BreadcrumbsProps) => {
  const alogliaProduct = await getCachedAlogliaProduct(productNumber);
  const crumbs = alogliaProduct?.category;

  if (!crumbs?.lvl0 || !crumbs?.lvl1 || !crumbs?.lvl2) return null;

  const buildPath = (level: number) => {
    const basePath = `/smartprice?${INDEX_NAME}`;
    const path0 = `${basePath}%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=${crumbs.lvl0}`;
    if (level === 0) return path0;
    const path1 = `${path0}%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B1%5D=${crumbs.lvl1}`;
    if (level === 1) return path1;
    return `${path1}%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B2%5D=${crumbs.lvl2}`;
  };
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href="/smartprice"
            // onClick={() => updateUiState("/smartprice")}
          >
            {" "}
            Alle produkter
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href={buildPath(0)}
            // onClick={() => updateUiState(buildPath(0), crumbs.lvl0!)}
          >
            {" "}
            {crumbs.lvl0}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href={buildPath(1)}
            // onClick={() => updateUiState(buildPath(1), crumbs.lvl1!)}
          >
            {" "}
            {crumbs.lvl1.split(">")[1]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            href={buildPath(2)}
            // onClick={() => updateUiState(buildPath(2), crumbs.lvl2!)}
          >
            {" "}
            {crumbs.lvl2.split(">")[2]}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{alogliaProduct.productName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
