import {
  CustomOrderButton,
  WhatsAppButton,
} from "@/components/WhatsAppButton";
import { BulkForm } from "@/components/BulkForm";
import { CareStory } from "@/components/CareStory";
import { CataloguePreview } from "@/components/CataloguePreview";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import { MakingOf } from "@/components/MakingOf";
import { MarketNightHero } from "@/components/MarketNightHero";
import { SignInCorner } from "@/components/SignInCorner";
import Image from "next/image";
import Link from "next/link";
import { priceBands } from "@/lib/products";

export default function Home() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-end px-5 py-5 md:px-10">
        <nav className="flex items-center gap-2 text-sm text-[#fff8f2]/90 md:gap-3">
          <Link href="/catalogue" className="hidden hover:text-white lg:inline">
            Catalogue
          </Link>
          <a href="#customize" className="hidden hover:text-white lg:inline">
            Custom
          </a>
          <SignInCorner />
          <WhatsAppButton
            label="WhatsApp"
            className="!bg-[#25D366] !px-4 !py-2 !text-[#05351a] hover:!brightness-105"
          />
        </nav>
      </header>

      <main id="top">
        <MarketNightHero />

        <section className="px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
                Made by hand
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
                Soft stems, bright petals, real care
              </h2>
              <p className="mt-5 leading-relaxed text-[#5c463c]">
                Every bloom is twisted, looped, and finished by hand — pipe
                cleaner florals, crochet clips, magnets, and gift-ready bouquets
                that never wilt.
              </p>
              <Link
                href="/catalogue"
                className="mt-8 inline-flex rounded-full bg-[#1f6b45] px-6 py-3 text-sm font-semibold text-[#fff8f2] transition hover:bg-[#185537]"
              >
                Browse full catalogue
              </Link>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(42,26,20,0.12)]">
              <Image
                src="/products/18-f7d9f4a8-c8fa-4835-843b-3841711ad9f5.png"
                alt="Handmade sunflower and lily bouquet"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-[#2a1a14]/08 bg-[#fffaf5]/70 px-5 py-14 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
                  What we make
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#2a1a14] md:text-4xl">
                  Categories
                </h2>
              </div>
              <Link
                href="/catalogue"
                className="rounded-full border border-[#2a1a14]/15 px-5 py-2.5 text-sm font-semibold text-[#2a1a14] transition hover:bg-[#2a1a14]/06"
              >
                Open catalogue →
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {priceBands.map((band) => (
                <Link
                  key={band.category}
                  href="/catalogue"
                  className="rounded-2xl border border-[#2a1a14]/08 bg-white/70 px-5 py-5 transition hover:border-[#1f6b45]/35 hover:shadow-[0_12px_30px_rgba(42,26,20,0.08)]"
                >
                  <p className="text-sm text-[#5c463c]">{band.category}</p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[#1f6b45]">
                    from ₹{band.from}
                  </p>
                  <p className="mt-2 text-sm text-[#5c463c]">{band.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CataloguePreview />

        <ColorCustomizer />
        <CareStory />
        <MakingOf />
        <BulkForm />

        <section
          id="custom"
          className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1f6b45] via-[#2a5a48] to-[#2a1a14]" />
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#c45c6a]/25 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#f3c9b0]/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <p className="text-sm tracking-[0.2em] text-[#f3c9b0] uppercase">
              Still deciding?
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#fff8f2] md:text-5xl">
              Just say hi on WhatsApp
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[#e8d5c8]">
              Send a photo of something you like, or describe colors — we’ll
              help you pick.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/catalogue"
                className="rounded-full bg-[#fff8f2] px-6 py-3 text-sm font-semibold text-[#2a1a14]"
              >
                Open catalogue
              </Link>
              <WhatsAppButton
                label="Chat to order"
                className="!bg-[#25D366] !text-[#05351a]"
              />
              <CustomOrderButton className="!border-[#fff8f2]/40 !text-[#fff8f2] hover:!bg-[#fff8f2]/10" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2a1a14]/08 px-5 py-10 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-[family-name:var(--font-brand)] text-3xl text-[#2a1a14]">
              Magic Hands Creation
            </p>
            <p className="mt-1 text-sm text-[#5c463c]">
              By Vrushali & Ashwini Deokar · Order on WhatsApp
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-[#5c463c]">
            <Link href="/catalogue" className="hover:text-[#2a1a14]">
              Catalogue
            </Link>
            <a href="#bulk" className="hover:text-[#2a1a14]">
              Bulk
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppButton variant="float" />
    </>
  );
}
