import Image from "next/image";

const INSTAGRAM_HANDLE =
  process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "magic_hand_creations25";

export function InstagramSection() {
  const profileUrl = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

  return (
    <section id="instagram" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
              On Instagram
            </p>
            <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
              Follow @{INSTAGRAM_HANDLE}
            </h2>
            <p className="mt-4 max-w-lg text-[#5c463c]">
              Scan the QR with your phone camera, or tap through to Reels of
              stall nights, bouquet wraps, and making clips.
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-[#2a1a14]/20 px-6 py-3 text-sm font-semibold text-[#2a1a14] transition hover:bg-[#2a1a14]/06"
            >
              Open Instagram →
            </a>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto block w-full max-w-xs overflow-hidden rounded-[1.75rem] bg-white p-4 shadow-[0_16px_50px_rgba(42,26,20,0.12)] transition hover:-translate-y-0.5"
          >
            <Image
              src="/instagram-qr.png"
              alt={`Instagram QR code for @${INSTAGRAM_HANDLE}`}
              width={480}
              height={600}
              className="h-auto w-full"
            />
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Stall nights",
              hint: "Keychain racks under market lights",
              gradient: "from-[#c45c6a] to-[#2a1a14]",
            },
            {
              title: "Bouquet wraps",
              hint: "Ribbon ties & forever blooms",
              gradient: "from-[#1f6b45] to-[#2a1a14]",
            },
            {
              title: "Making clips",
              hint: "Hands twisting soft stems",
              gradient: "from-[#d4a84b] to-[#c45c6a]",
            },
          ].map((card) => (
            <a
              key={card.title}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex aspect-[9/16] max-h-[420px] flex-col justify-end overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${card.gradient} p-5 text-[#fff8f2] transition hover:brightness-110`}
            >
              <span className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-xs backdrop-blur">
                Reels
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-[#fff8f2]/85">{card.hint}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
