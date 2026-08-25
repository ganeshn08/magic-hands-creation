import { priceBands } from "@/lib/products";

export function PriceBands() {
  return (
    <section id="prices" className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
          Price bands
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl text-[#2a1a14] md:text-4xl">
          Starting prices — so messaging feels easy
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {priceBands.map((band) => (
            <div
              key={band.category}
              className="rounded-2xl border border-[#2a1a14]/08 bg-[#fffaf5] px-5 py-5"
            >
              <p className="text-sm text-[#5c463c]">{band.category}</p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-3xl text-[#1f6b45]">
                from ₹{band.from}
              </p>
              <p className="mt-2 text-sm text-[#5c463c]">{band.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#5c463c]">
          Final price depends on size, colors, and custom work — we’ll confirm
          on WhatsApp before you pay.
        </p>
      </div>
    </section>
  );
}
