"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ChangeEvent } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoMdBarcode } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { useClearRefinements, useSearchBox } from "react-instantsearch";

const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME as string;

const isNeitherSubstring = (query: string, newQuery: string) =>
  !(query.includes(newQuery) || newQuery.includes(query));

const createSearchUrl = (query: string) =>
  `/smartprice?${INDEX_NAME}[query]=${query}`;

const SearchBox = () => {
  const [localQuery, setLocalQuery] = useState("");
  const { refine, clear, query } = useSearchBox();
  const { refine: resetRefinements } = useClearRefinements();
  const router = useRouter();
  const pathname = usePathname();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newQuery = e.currentTarget.value;
    setLocalQuery(newQuery);
    if (
      !newQuery ||
      isNeitherSubstring(localQuery, newQuery) ||
      newQuery.length < 3
    ) {
      handleResetQuery();
    }
    if (newQuery.length < 3) return;
    console.log("about to search", newQuery);
    pathname === "/smartprice"
      ? refine(newQuery)
      : router.push(createSearchUrl(newQuery));
  };

  const handleResetQuery = () => {
    resetRefinements();
    clear();
  };

  useEffect(() => {
    if (!query) {
      setLocalQuery("");
    }
  }, [query]);

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <form
          className="relative"
          onSubmit={(e) => {
            e.preventDefault();
            pathname === "/smartprice"
              ? refine(localQuery)
              : router.push(createSearchUrl(localQuery));
          }}
        >
          <input
            type="text"
            className="w-full truncate border border-orange-200 bg-white py-2.5 pr-32 leading-6 text-gray-800 placeholder-gray-400 focus:border-orange-400"
            placeholder="Søk etter produkter, produktnummer, merke..."
            value={localQuery}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // For å søke når det er færre enn 3 tegn
                refine(localQuery);
              }
            }}
          />
          <span className="absolute inset-y-0 right-20">
            {query && (
              <button aria-label="Clear" onClick={handleResetQuery}>
                <IoCloseOutline className="h-6 w-6" />
              </button>
            )}
          </span>
          <span className="absolute inset-y-0 right-10">
            <BarcodeButton />
          </span>
          <span className="absolute inset-y-0 right-0">
            <SearchIconButton />
          </span>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;

const SearchIconButton = () => {
  return (
    <button type="submit" aria-label="Search">
      <HiMagnifyingGlass className="h-6 w-6" />
    </button>
  );
};

const BarcodeButton = () => {
  return (
    <>
      <button
        type="button"
        aria-label="Search"
        className="text-gray-600"
        disabled
      >
        <IoMdBarcode className="h-6 w-6" />
      </button>
    </>
  );
};
