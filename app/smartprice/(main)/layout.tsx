import SearchBox from "@/components/search-box";
import Link from "next/link";

interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-5 border border-green-500">
        <Link href="/smartprice">SmartPrice</Link>
        <Link href="/smartprice/product/1000000">Product 1000000</Link>
        <Link href="/smartprice/product/1000001">Product 1000001</Link>
        <a href="/smartprice?dev_products%5BhierarchicalMenu%5D%5Bcategory.lvl0%5D%5B0%5D=Kabel">
          Filter
        </a>
        <Link href="/smartprice/faq">FAQ</Link>
      </div>
      <SearchBox />
      <div>{children}</div>
    </div>
  );
}
