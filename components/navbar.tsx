import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="border border-red-800 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
    </div>
  );
};
