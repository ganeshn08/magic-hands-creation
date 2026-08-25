import Link from "next/link";
import { ProductGallery } from "@/components/ProductGallery";
import { SignInCorner } from "@/components/SignInCorner";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata = {
  title: "Catalogue — Magic Hands Creation",
  description:
    "Browse handmade bouquets, keychains, magnets, clips and brooches. Order on WhatsApp.",
};

export default function CataloguePage() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[#2a1a14]/08 bg-[#fffaf5]/90 px-5 py-4 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-[family-name:var(--font-brand)] text-2xl text-[#2a1a14] md:text-3xl"
            >
              Magic Hands Creation
            </Link>
            <span className="hidden text-sm text-[#5c463c] sm:inline">
              Catalogue
            </span>
          </div>
          <nav className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              className="rounded-full border border-[#2a1a14]/15 px-3 py-2 text-xs font-semibold text-[#2a1a14] md:px-4 md:text-sm"
            >
              Home
            </Link>
            <SignInCorner variant="light" />
            <WhatsAppButton
              label="WhatsApp"
              className="!bg-[#25D366] !px-4 !py-2 !text-[#05351a]"
            />
          </nav>
        </div>
      </header>

      <main className="min-h-screen">
        <ProductGallery />
      </main>

      <footer className="border-t border-[#2a1a14]/08 px-5 py-8 text-center md:px-10">
        <Link href="/" className="text-sm font-medium text-[#1f6b45]">
          ← Back to home
        </Link>
      </footer>

      <WhatsAppButton variant="float" />
    </>
  );
}
