import Image from "next/image";
import { stallSchedule } from "@/lib/products";
import { whatsappUrl } from "@/lib/whatsapp";

export function StallSection() {
  const visitMsg = whatsappUrl(
    `Hi Magic Hands Creation! I'd like to visit Stall No. 07 at The MAGNET exhibition (Kesar Bagh, N-3 CIDCO, Chh. Sambhajinagar) on 19–20 Aug 2026.\n\nPlease hold a piece for me / share directions.`,
  );

  return (
    <section
      id="stall"
      className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28"
    >
      <div className="absolute inset-0 bg-[#2a1a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,92,106,0.35),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(31,107,69,0.35),transparent_45%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm tracking-[0.2em] text-[#f3c9b0] uppercase">
            Exhibition stall
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl text-[#fff8f2] md:text-5xl">
            {stallSchedule.headline}
          </h2>
          <p className="mt-3 max-w-xl text-base text-[#f3c9b0]">
            {stallSchedule.event}
          </p>
          <p className="mt-4 max-w-lg text-[#e8d5c8]">{stallSchedule.note}</p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-wide text-[#f3c9b0] uppercase">
                Dates
              </dt>
              <dd className="mt-1 text-lg text-[#fff8f2]">
                {stallSchedule.when}
              </dd>
              <dd className="text-sm text-[#e8d5c8]">{stallSchedule.nextDate}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-[#f3c9b0] uppercase">
                Stall
              </dt>
              <dd className="mt-1 text-lg text-[#fff8f2]">
                {stallSchedule.stallNo}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs tracking-wide text-[#f3c9b0] uppercase">
                Venue
              </dt>
              <dd className="mt-1 text-lg text-[#fff8f2]">
                {stallSchedule.location}
              </dd>
              <dd className="text-sm text-[#e8d5c8]">{stallSchedule.area}</dd>
              <dd className="mt-1 text-sm text-[#e8d5c8]">
                {stallSchedule.mapHint}
              </dd>
            </div>
          </dl>

          <p className="mt-6 text-sm italic text-[#f3c9b0]/90">
            {stallSchedule.makers}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={visitMsg}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-[#05351a] transition hover:brightness-105"
            >
              Message to visit Stall 07
            </a>
            <a
              href={`https://wa.me/${stallSchedule.whatsappAlt}?text=${encodeURIComponent("Hi! I'd like details about Stall No. 07 at The MAGNET exhibition.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-[#fff8f2]/35 px-6 py-3 text-sm font-semibold text-[#fff8f2] transition hover:bg-[#fff8f2]/10"
            >
              Alt WhatsApp · 90679 74603
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[#fff8f2]/20 bg-[#f5ebe0] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-3">
          <Image
            src={stallSchedule.flyerCropped}
            alt="The MAGNET exhibition flyer — Magic Hand Creations, Stall No. 07, 19–20 August 2026"
            width={467}
            height={720}
            className="h-auto w-full rounded-[1rem] object-contain"
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
