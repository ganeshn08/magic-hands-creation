"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, products, type ProductCategory } from "@/lib/products";
import { productOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { GiftNoteToggle } from "@/components/GiftNoteToggle";

export function ProductGallery() {
  const [filter, setFilter] = useState<ProductCategory | "All">("All");
  const [giftEnabled, setGiftEnabled] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const visible = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <section id="gallery" className="relative px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
          WhatsApp catalog
        </p>
        <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
          Tap a piece → order on WhatsApp
        </h2>
        <p className="mt-4 max-w-lg text-[#5c463c]">
          Every item opens a ready-made chat with the product name and price
          band. Add a gift note below if you want it included.
        </p>

        <div className="mt-6 max-w-xl">
          <GiftNoteToggle
            enabled={giftEnabled}
            note={giftNote}
            onEnabledChange={setGiftEnabled}
            onNoteChange={setGiftNote}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["All", ...categories] as const).map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-[#2a1a14] text-[#fff6ee]"
                    : "bg-[#2a1a14]/06 text-[#2a1a14] hover:bg-[#2a1a14]/12"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visible.map((product) => {
            const note = giftEnabled ? giftNote : undefined;
            return (
              <a
                key={product.id}
                href={whatsappUrl(
                  productOrderMessage(
                    product.title,
                    product.category,
                    product.priceFrom,
                    note,
                  ),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-5 block break-inside-avoid overflow-hidden rounded-2xl bg-[#fffaf5] shadow-[0_12px_40px_rgba(42,26,20,0.08)] outline-none transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(42,26,20,0.14)] focus-visible:ring-2 focus-visible:ring-[#c45c6a]"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={720}
                    height={900}
                    className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]"
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
                  <p className="mt-1 text-sm text-[#5c463c]">{product.blurb}</p>
                  <p className="mt-3 text-xs font-medium text-[#1f6b45]">
                    Order on WhatsApp →
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
