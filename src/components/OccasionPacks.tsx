import Image from "next/image";
import { occasionPacks } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

export function OccasionPacks() {
  return (
    <section id="packs" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
          Occasion packs
        </p>
        <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
          Ready bundles for real moments
        </h2>
        <p className="mt-4 max-w-lg text-[#5c463c]">
          One tap quotes the pack on WhatsApp — tell us colors and we’ll craft
          it.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {occasionPacks.map((pack) => (
            <a
              key={pack.id}
              href={whatsappUrl(pack.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-[#fffaf5] shadow-[0_12px_40px_rgba(42,26,20,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(42,26,20,0.14)]"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src={pack.image}
                  alt={pack.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#2a1a14]">
                    {pack.title}
                  </h3>
                  <span className="shrink-0 text-sm font-semibold text-[#1f6b45]">
                    from ₹{pack.from}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#5c463c]">{pack.blurb}</p>
                <ul className="mt-4 space-y-1 text-sm text-[#2a1a14]/80">
                  {pack.includes.map((item) => (
                    <li key={item}>· {item}</li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 text-sm font-semibold text-[#1f6b45]">
                  Quote on WhatsApp →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
