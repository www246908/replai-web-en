"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ── Decorative chat bubbles — sticker style ──
function BubbleDecor({ reduced }: { reduced: boolean | null }) {
  const bubbles = [
    { text: "Do you have available slots?", side: "left", delay: 0.4, top: "top-8", x: "left-6 sm:left-16", rot: "-rotate-3" },
    { text: "Sure! We’ve reserved your slot ✓", side: "right", delay: 0.65, top: "top-20", x: "right-6 sm:right-16", rot: "rotate-3" },
    { text: "Thanks for your fast reply", side: "left", delay: 0.85, top: "bottom-14", x: "left-6 sm:left-24", rot: "rotate-2" },
    { text: "We serve you 24 hours a day", side: "right", delay: 1.0, top: "bottom-6", x: "right-6 sm:right-20", rot: "-rotate-2" },
  ] as const;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden select-none overflow-hidden sm:block">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={reduced ? {} : { opacity: 0, y: b.side === "left" ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: b.delay, duration: 0.5 }}
          className={`
            absolute ${b.top} ${b.x} ${b.rot}
            whitespace-nowrap rounded-2xl border-2 border-[var(--pg-fg)]
            px-3.5 py-2 font-pg-body text-xs font-medium shadow-[3px_3px_0_0_var(--pg-fg)] sm:text-sm
            ${b.side === "left" ? "rounded-bl-sm bg-pg-tertiary text-pg-fg" : "rounded-br-sm bg-white text-pg-fg"}
          `}
        >
          {b.text}
        </motion.div>
      ))}
    </div>
  );
}

// ── CTA Section ──
export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-y-2 border-[var(--pg-fg)] bg-pg-accent py-24 px-5 sm:px-8 lg:py-32"
    >
      {/* Dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1.6px, transparent 1.6px)",
          backgroundSize: "18px 18px",
        }}
      />

      <BubbleDecor reduced={prefersReduced} />

      {/* Content */}
      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        >
          <h2 className="mb-5 font-pg-display text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
            From today onward,
            <br />
            Never miss a single customer lead.
          </h2>
        </motion.div>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          className="mb-10 font-pg-body text-lg leading-relaxed text-white/85 sm:text-xl"
        >
          Book a free consultation to find the perfect plan for your business.
          <br className="hidden sm:block" />
          No pressure — just a casual chat to explore your options.
        </motion.p>

        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
          className="flex flex-col justify-center gap-3 sm:flex-row"
        >
          {/* Primary — white candy button */}
          <a
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-[var(--pg-fg)] bg-white px-8 py-3.5 font-pg-display text-base font-bold text-pg-accent shadow-[4px_4px_0_0_var(--pg-fg)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--pg-fg)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            Free Consultation
            <span className="grid h-6 w-6 place-items-center rounded-full bg-pg-accent text-white">
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </a>

          {/* Secondary — outline fills tertiary on hover */}
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3.5 font-pg-display text-base font-bold text-white transition-colors duration-200 hover:border-[var(--pg-fg)] hover:bg-pg-tertiary hover:text-pg-fg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            View Pricing
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 font-pg-body text-sm text-white/60"
        >
          No long-term contracts · Chat first, decide later
        </motion.p>
      </div>
    </section>
  );
}