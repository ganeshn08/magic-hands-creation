"use client";

import { useMemo, useState } from "react";
import { flowerColors, wrapColors } from "@/lib/products";
import { withGiftNote, whatsappUrl } from "@/lib/whatsapp";
import { GiftNoteToggle } from "@/components/GiftNoteToggle";

const pieceTypes = ["Bouquet", "Keychain set", "Mini pot", "Hair clips"] as const;

export function ColorCustomizer() {
  const [piece, setPiece] = useState<(typeof pieceTypes)[number]>("Bouquet");
  const [flower, setFlower] = useState(flowerColors[0].id);
  const [wrap, setWrap] = useState(wrapColors[0].id);
  const [giftEnabled, setGiftEnabled] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  const flowerLabel = flowerColors.find((c) => c.id === flower)?.label ?? "";
  const wrapLabel = wrapColors.find((c) => c.id === wrap)?.label ?? "";
  const flowerSwatch =
    flowerColors.find((c) => c.id === flower)?.swatch ?? "#ccc";
  const wrapSwatch = wrapColors.find((c) => c.id === wrap)?.swatch ?? "#ccc";

  const href = useMemo(() => {
    const base = `Hi Magic Hands Creation! Custom order please.

Piece: ${piece}
Flower color: ${flowerLabel}
Wrap / finish: ${wrapLabel}

Please share price & timing.`;
    return whatsappUrl(withGiftNote(base, giftNote, giftEnabled));
  }, [piece, flowerLabel, wrapLabel, giftEnabled, giftNote]);

  return (
    <section id="customize" className="border-y border-[#2a1a14]/08 bg-[#fffaf5]/80 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
            Color customizer
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
            Pick your colors. We’ll twist them by hand.
          </h2>
          <p className="mt-4 text-[#5c463c]">
            Choose piece type, petal color, and wrap — then send the combo
            straight to WhatsApp.
          </p>

          <div
            className="mt-8 flex h-40 items-end justify-center overflow-hidden rounded-[1.75rem] p-6"
            style={{
              background: `linear-gradient(145deg, ${wrapSwatch} 0%, ${wrapSwatch} 42%, ${flowerSwatch} 42%, ${flowerSwatch} 100%)`,
            }}
          >
            <div className="rounded-full bg-[#2a1a14]/75 px-4 py-2 text-sm text-[#fff8f2] backdrop-blur">
              {piece} · {flowerLabel}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <fieldset>
            <legend className="text-sm font-semibold text-[#2a1a14]">
              Piece
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {pieceTypes.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPiece(p)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    piece === p
                      ? "bg-[#2a1a14] text-[#fff6ee]"
                      : "bg-[#2a1a14]/06 text-[#2a1a14]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-[#2a1a14]">
              Flower color
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {flowerColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => setFlower(c.id)}
                  className={`h-10 w-10 rounded-full border-2 transition ${
                    flower === c.id
                      ? "border-[#2a1a14] scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-[#5c463c]">{flowerLabel}</p>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-semibold text-[#2a1a14]">
              Wrap / finish
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {wrapColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  title={c.label}
                  onClick={() => setWrap(c.id)}
                  className={`h-10 w-10 rounded-full border-2 shadow-inner transition ${
                    wrap === c.id
                      ? "border-[#2a1a14] scale-110"
                      : "border-[#2a1a14]/15"
                  }`}
                  style={{ backgroundColor: c.swatch }}
                />
              ))}
            </div>
            <p className="mt-2 text-sm text-[#5c463c]">{wrapLabel}</p>
          </fieldset>

          <GiftNoteToggle
            enabled={giftEnabled}
            note={giftNote}
            onEnabledChange={setGiftEnabled}
            onNoteChange={setGiftNote}
          />

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#05351a] transition hover:brightness-105"
          >
            Send custom order on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
