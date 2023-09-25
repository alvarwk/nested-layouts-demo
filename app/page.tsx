import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <Link href="/smartprice">SmartPrice</Link>
      <div>Medlemsportalen!</div>
    </main>
  );
}
