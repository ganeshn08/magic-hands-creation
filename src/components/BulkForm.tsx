"use client";

import { useMemo, useState } from "react";
import { categories } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

export function BulkForm() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [item, setItem] = useState(categories[1]);
  const [qty, setQty] = useState("25");
  const [details, setDetails] = useState("");

  const href = useMemo(() => {
    const msg = `Hi Magic Hands Creation! Bulk / reseller enquiry.

Name: ${name || "(not shared)"}
Org / event: ${org || "(not shared)"}
Item type: ${item}
Quantity: ${qty}
Details: ${details || "(none)"}

Please share wholesale pricing & lead time.`;
    return whatsappUrl(msg);
  }, [name, org, item, qty, details]);

  return (
    <section id="bulk" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
          Bulk & resellers
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
          Schools, parties, gift shops
        </h2>
        <p className="mt-4 text-[#5c463c]">
          Fill this in — it opens WhatsApp with your quantities ready. Great for
          return gifts and stall restocks.
        </p>

        <form
          className="mt-8 space-y-4 rounded-[1.75rem] bg-[#fffaf5] p-6 shadow-[0_12px_40px_rgba(42,26,20,0.08)] md:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            window.open(href, "_blank", "noopener,noreferrer");
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-[#2a1a14]">Your name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#2a1a14]/12 bg-white px-3 py-2 outline-none focus:border-[#1f6b45]"
              />
            </label>
            <label className="block text-sm">
              <span className="font-medium text-[#2a1a14]">
                School / shop / event
              </span>
              <input
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#2a1a14]/12 bg-white px-3 py-2 outline-none focus:border-[#1f6b45]"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium text-[#2a1a14]">Item type</span>
              <select
                value={item}
                onChange={(e) =>
                  setItem(e.target.value as (typeof categories)[number])
                }
                className="mt-1 w-full rounded-xl border border-[#2a1a14]/12 bg-white px-3 py-2 outline-none focus:border-[#1f6b45]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              <span className="font-medium text-[#2a1a14]">Quantity</span>
              <input
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                inputMode="numeric"
                className="mt-1 w-full rounded-xl border border-[#2a1a14]/12 bg-white px-3 py-2 outline-none focus:border-[#1f6b45]"
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="font-medium text-[#2a1a14]">
              Colors, deadline, notes
            </span>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              className="mt-1 w-full resize-none rounded-xl border border-[#2a1a14]/12 bg-white px-3 py-2 outline-none focus:border-[#1f6b45]"
            />
          </label>

          <button
            type="submit"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#05351a] transition hover:brightness-105"
          >
            Send bulk enquiry on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
