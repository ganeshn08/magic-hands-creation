import type { Metadata } from "next";
import { Fraunces, Great_Vibes, Outfit } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const brand = Great_Vibes({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Magic Hands Creation — Handmade gifts & crafts",
  description:
    "Handcrafted flower keychains, fridge magnets, clips, brooches, and forever bouquets. Order custom pieces on WhatsApp.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${brand.variable} ${body.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
