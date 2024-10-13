import { unstable_noStore as noStore } from "next/cache";
import { cookies } from "next/headers";

async function ProductQuantity() {
  // noStore();
  const res = await fetch('https://api.vercel.app/products/1');
  const data = await res.json();

  return <div className="text-xl">{data.stock}</div>
}

export default function Page() {
  cookies();
  return (
    <section className="p-4">
      <h1 className="mb-2 text-3xl">Product</h1>
      <ProductQuantity />
    </section>
  )
}