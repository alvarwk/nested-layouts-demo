import SearchBox from "@/components/search-box";
import Link from "next/link";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 border border-green-500">
        <Link href="/smartprice?dev_products%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=Kabel">
          Filter with Link
        </Link>
        <a href="/smartprice?dev_products%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=Kabel">
          Filter with anchor tag
        </a>
      </div>
      <SearchBox />
      <div>{children}</div>
    </div>
  );
}
