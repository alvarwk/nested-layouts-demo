import { Breadcrumbs } from "@/components/product-page-breadcrumb";
import { Spinner } from "@/components/spinner";
import { Suspense } from "react";
import DisplayProduct from "./_components/display-product";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="flex flex-col gap-5">
      <Suspense fallback={<Spinner />}>
        <Breadcrumbs productNumber={params.id} />
      </Suspense>
      <div className="border border-blue-500">Product page</div>
      <Suspense fallback={<Spinner />}>
        <DisplayProduct productNumber={params.id} />
      </Suspense>
    </div>
  );
}
