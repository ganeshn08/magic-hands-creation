"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { stallSchedule } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

const STORAGE_KEY = "mhc-exhibition-popup-dismissed-v1";

export function ExhibitionPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const openTimer = window.setTimeout(() => setOpen(true), 600);
    return () => window.clearTimeout(openTimer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const autoClose = window.setTimeout(() => dismiss(), 2000);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(autoClose);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  const visitMsg = whatsappUrl(
    `Hi Magic Hands Creation! I'd like to visit Stall No. 07 at The MAGNET exhibition (Kesar Bagh, N-3 CIDCO, Chh. Sambhajinagar) on 19–20 Aug 2026.`,
  );

  const ig =
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "magic_hand_creations25";

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 left-5 z-50 max-w-[11rem] rounded-2xl bg-[#2a1a14] px-4 py-3 text-left text-xs font-semibold leading-snug text-[#fff8f2] shadow-[0_12px_30px_rgba(42,26,20,0.35)] transition hover:scale-[1.02]"
        >
          Stall 07 · The MAGNET
          <span className="mt-0.5 block font-normal text-[#f3c9b0]">
            19–20 Aug · tap for details
          </span>
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1a100c]/65 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exhibition-title"
          onClick={dismiss}
        >
          <div
            className="animate-rise relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] bg-[#fffaf5] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#2a1a14]/80 text-lg text-[#fff8f2]"
            >
              ×
            </button>

            <div className="relative overflow-hidden bg-[#f5ebe0] p-3 sm:p-4">
              <Image
                src={stallSchedule.flyerCropped}
                alt="The MAGNET exhibition flyer"
                width={467}
                height={720}
                className="mx-auto h-auto max-h-[42svh] w-full rounded-xl object-contain"
                sizes="(max-width: 512px) 100vw, 512px"
                priority
              />
            </div>

            <div className="relative px-5 pb-6 pt-4 sm:px-7">
              <p className="text-xs tracking-[0.2em] text-[#c45c6a] uppercase">
                Coming up
              </p>
              <h2
                id="exhibition-title"
                className="mt-1 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#2a1a14]"
              >
                {stallSchedule.headline}
              </h2>
              <p className="mt-2 text-sm text-[#5c463c]">{stallSchedule.event}</p>

              <div className="mt-5 grid gap-3 rounded-2xl border border-[#2a1a14]/08 bg-white/70 p-4 text-sm">
                <p>
                  <span className="font-semibold text-[#2a1a14]">When · </span>
                  {stallSchedule.when}
                </p>
                <p>
                  <span className="font-semibold text-[#2a1a14]">Stall · </span>
                  {stallSchedule.stallNo}
                </p>
                <p>
                  <span className="font-semibold text-[#2a1a14]">Where · </span>
                  {stallSchedule.location}, {stallSchedule.area}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-4 rounded-2xl border border-[#2a1a14]/08 bg-white/70 p-3">
                <Image
                  src="/instagram-qr.png"
                  alt={`Scan to follow @${ig} on Instagram`}
                  width={112}
                  height={140}
                  className="h-auto w-24 shrink-0 rounded-xl"
                />
                <div>
                  <p className="text-xs tracking-wide text-[#c45c6a] uppercase">
                    Follow us
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-lg text-[#2a1a14]">
                    @{ig}
                  </p>
                  <p className="mt-1 text-xs text-[#5c463c]">
                    Scan the QR or open Instagram
                  </p>
                  <a
                    href={`https://www.instagram.com/${ig}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-[#c45c6a]"
                  >
                    Open profile →
                  </a>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={visitMsg}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-[#05351a]"
                >
                  WhatsApp — visit Stall 07
                </a>
                <a
                  href="#stall"
                  onClick={dismiss}
                  className="inline-flex flex-1 items-center justify-center rounded-full border border-[#2a1a14]/20 px-5 py-3 text-sm font-semibold text-[#2a1a14]"
                >
                  Full stall details
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
