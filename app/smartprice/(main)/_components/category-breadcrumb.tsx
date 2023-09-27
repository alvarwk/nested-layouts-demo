"use client";
import { INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES } from "@/lib/constants";
import { Breadcrumb } from "react-instantsearch";

export function CategoryBreadcrumb() {
  return <Breadcrumb attributes={INSTANT_SEARCH_HIERARCHICAL_ATTRIBUTES} />;
}
