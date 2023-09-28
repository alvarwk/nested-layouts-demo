import {
  getAlogliaProduct,
  getCachedAlogliaProduct,
} from "@/lib/get-algolia-product";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./ui/breadcrumb";
import { cache } from "react";

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;
const CATEGORY_QUERY_PARAM_KEY = `${INDEX_NAME}[hierarchicalMenu][category.lvl0]`;

interface BreadcrumbsProps {
  productNumber: string;
}

interface Crumbs {
  lvl0: string;
  lvl1: string;
  lvl2: string;
}

const getCategoryName = (categoryLvl: string) => categoryLvl.split(" > ").pop();

export const Breadcrumbs = async ({ productNumber }: BreadcrumbsProps) => {
  const alogliaProduct = await getCachedAlogliaProduct(productNumber);
  const crumbs = alogliaProduct?.category;

  if (!crumbs?.lvl0 || !crumbs?.lvl1 || !crumbs?.lvl2) return null;

  const buildPath = (level: number) => {
    const levels = [
      `${CATEGORY_QUERY_PARAM_KEY}[0]=${crumbs.lvl0}`,
      `${CATEGORY_QUERY_PARAM_KEY}[1]=${getCategoryName(crumbs.lvl1)}`,
      `${CATEGORY_QUERY_PARAM_KEY}[2]=${getCategoryName(crumbs.lvl2)}`,
    ];
    const queryString = `${levels.slice(0, level + 1).join("&")}`;
    return `/smartprice?${queryString}`;
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/smartprice">
            {" "}
            Alle produkter
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href={buildPath(0)}> {crumbs.lvl0}</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href={buildPath(1)}> {crumbs.lvl1.split(">")[1]}</a>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <a href={buildPath(2)}> {crumbs.lvl2.split(">")[2]}</a>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{alogliaProduct.productName}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
