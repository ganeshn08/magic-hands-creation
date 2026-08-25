import Image from "next/image";
import { makingSteps } from "@/lib/products";

export function MakingOf() {
  return (
    <section id="making" className="border-y border-[#2a1a14]/08 bg-[#fffaf5]/70 px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-[family-name:var(--font-display)] text-sm tracking-[0.2em] text-[#c45c6a] uppercase">
          Making-of
        </p>
        <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-4xl leading-tight text-[#2a1a14] md:text-5xl">
          From twist to gift
        </h2>
        <p className="mt-4 max-w-lg text-[#5c463c]">
          A quick peek at how each piece is built by hand — why handmade pricing
          feels fair.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {makingSteps.map((step, i) => (
            <div key={step.title}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#fff8f2]/95 font-[family-name:var(--font-display)] text-lg text-[#2a1a14]">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[#2a1a14]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-[#5c463c]">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
