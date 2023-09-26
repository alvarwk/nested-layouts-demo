import { getCachedAlogliaProduct } from "@/lib/get-algolia-product";

interface DisplayProductProps {
  productNumber: string;
}

export default async function DisplayProduct({
  productNumber,
}: DisplayProductProps) {
  const alogliaProduct = (await getCachedAlogliaProduct(productNumber)) as any;
  return (
    <div className="flex flex-col gap-2 text-black">
      <div className="border border-blue-500">{alogliaProduct.productName}</div>
    </div>
  );
}
