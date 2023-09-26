interface ProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="border border-blue-500">Products layout</div>
      <div>{children}</div>
    </div>
  );
}
