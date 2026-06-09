import { useState } from "react";
import { Section } from "./ui/Section";
import { Badge } from "./ui/Badge";
import { FAQ } from "../data/content";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
          <Badge>{FAQ.badge}</Badge>
          <h2 className="text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl">
            {FAQ.title}
          </h2>
          <p className="text-base leading-relaxed text-slate-300">{FAQ.subtitle}</p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQ.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-white/10 bg-night-card"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-sm font-semibold sm:text-base"
                    style={{ color: "#ffffff" }}
                  >
                    {item.q}
                  </span>
                  <span className="shrink-0 text-xl leading-none text-brand-400">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-400">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
