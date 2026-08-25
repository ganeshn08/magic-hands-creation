import Image from "next/image";

export function CareStory() {
  return (
    <section id="forever" className="px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(42,26,20,0.12)]">
          <Image
            src="/products/20-441802a6-0241-4ad6-8c5d-7d5eb979f92c.png"
            alt="Forever violet bouquet that never wilts"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
            Forever flowers
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
            They don’t wilt. That’s the point.
          </h2>
          <p className="mt-5 leading-relaxed text-[#5c463c]">
            Our blooms are shaped from soft chenille stems and yarn — no water,
            no browning petals. Gift them once; they stay bright on a desk,
            fridge, bag, or shelf.
          </p>
          <ul className="mt-6 space-y-3 text-[#2a1a14]">
            <li>· Dust gently — no watering needed</li>
            <li>· Keep away from open flame & heavy crush</li>
            <li>· Perfect for allergies & long-distance gifting</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
