import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function MarketNightHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#1a0f0a]">
      <Image
        src="/hero/market-night-mockup2.jpg"
        alt="Night craft market stall with handmade flower charms"
        fill
        priority
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#120a06] via-[#120a06]/45 to-[#120a06]/15" />

      <div className="relative z-10 flex min-h-[100svh] w-full max-w-full flex-col items-center justify-end px-4 pb-16 pt-28 text-center sm:px-6 md:pb-24">
        <h1 className="hero-sign w-full max-w-[22rem] font-[family-name:var(--font-brand)] text-[clamp(2.85rem,13vw,5.5rem)] leading-[1.15] text-[#fff3e4] sm:max-w-3xl sm:text-7xl md:text-8xl lg:text-[6.75rem]">
          <span className="block">Magic Hands</span>
          <span className="block">Creation</span>
        </h1>

        <p className="mt-5 flex max-w-[20rem] items-center justify-center gap-2 text-sm text-[#e8d0b8] sm:mt-6 sm:max-w-none sm:gap-3 sm:text-lg md:text-xl">
          <span aria-hidden className="text-[#c4a484]">
            ❧
          </span>
          <span className="font-[family-name:var(--font-display)] italic">
            Handmade charms & forever blooms
          </span>
          <span aria-hidden className="text-[#c4a484]">
            ❧
          </span>
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3e6d6] px-7 py-3.5 text-sm font-semibold text-[#2a1a14] shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition hover:bg-[#fff6ea]"
          >
            <span aria-hidden>❀</span>
            Catalogue
          </Link>
          <WhatsAppButton
            label="WhatsApp"
            className="!justify-center !rounded-xl !bg-[#1a3d2a] !px-7 !py-3.5 !text-white shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:!bg-[#234d36]"
          />
        </div>
      </div>
    </section>
  );
}
