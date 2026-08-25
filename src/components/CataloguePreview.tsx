import Image from "next/image";
import Link from "next/link";
import { featuredProductIds, products } from "@/lib/products";

const featured = featuredProductIds
  .map((id) => products.find((p) => p.id === id))
  .filter((p) => p !== undefined);

export function CataloguePreview() {
  return (
    <section id="catalogue" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
              Fresh from the table
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
              This season&rsquo;s pieces
            </h2>
            <p className="mt-4 max-w-lg text-[#5c463c]">
              Bouquets, torans, malas, clips and magnets — all handmade, all
              ready to order on WhatsApp.
            </p>
          </div>
          <Link
            href="/catalogue"
            className="rounded-full border border-[#2a1a14]/15 px-5 py-2.5 text-sm font-semibold text-[#2a1a14] transition hover:bg-[#2a1a14]/06"
          >
            See all {products.length} pieces →
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <Link
              key={product.id}
              href="/catalogue"
              className="group block overflow-hidden rounded-2xl bg-[#fffaf5] shadow-[0_12px_40px_rgba(42,26,20,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(42,26,20,0.14)] focus-visible:ring-2 focus-visible:ring-[#c45c6a] focus-visible:outline-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs tracking-wide text-[#c45c6a] uppercase">
                    {product.category}
                  </p>
                  <p className="text-sm font-semibold text-[#1f6b45]">
                    from ₹{product.priceFrom}
                  </p>
                </div>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl text-[#2a1a14]">
                  {product.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
