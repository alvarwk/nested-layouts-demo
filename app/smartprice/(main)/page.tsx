import { ProductHits } from "@/components/product-hits";
import { CategoryBreadcrumb } from "./_components/category-breadcrumb";

export const dynamic = "force-dynamic";

export default function SmartPriceMainPage() {
  return (
    <div className="flex flex-col items-center gap-10 p-24">
      <h1>SmartPrice main page</h1>
      <CategoryBreadcrumb />
      <ProductHits />
    </div>
  );
}
