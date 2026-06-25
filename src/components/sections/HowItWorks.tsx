"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MessageSquare, Zap, BellRing } from "lucide-react";
import { Squiggle, Confetti } from "@/components/pg/decorations";

// Each step rotates through the palette to create the "confetti" effect.
const STEPS = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Customer sends a message",
    desc: "Messages trigger instantly no matter the hour or platform: Facebook, Instagram, or your website.",
    chip: "bg-pg-accent",
    shadow: "shadow-[4px_4px_0_0_var(--pg-soft)] sm:shadow-[8px_8px_0_0_var(--pg-soft)]",
  },
  {
    number: "02",
    icon: Zap,
    title: "AI responds within 30 seconds",
    desc: "Auto-greet clients, check available booking slots, and answer FAQs — customers never wait for you.",
    chip: "bg-pg-secondary",
    // featured: pink shadow
    shadow: "shadow-[4px_4px_0_0_var(--pg-secondary)] sm:shadow-[8px_8px_0_0_var(--pg-secondary)]",
  },
  {
    number: "03",
    icon: BellRing,
    title: "You only review results",
    desc: "Instant push alerts for new bookings. Simply confirm reservations, and leave the rest to AI.",
    chip: "bg-pg-tertiary",
    shadow: "shadow-[4px_4px_0_0_var(--pg-soft)] sm:shadow-[8px_8px_0_0_var(--pg-soft)]",
  },
] as const;

const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden bg-pg-bg py-20 lg:py-28 px-5 sm:px-8"
    >
      {/* Decorative paper texture + floating shapes */}
      <div aria-hidden className="pg-dots pointer-events-none absolute inset-0 opacity-60" />
      <Confetti />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center lg:mb-20">
          <motion.span
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: BOUNCE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pg-fg)] bg-pg-tertiary px-4 py-1.5 font-pg-display text-xl font-bold text-pg-fg shadow-[3px_3px_0_0_var(--pg-fg)]"
          >
            ✦ 3 Simple Steps
          </motion.span>

          <motion.h2
            initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: BOUNCE }}
            className="font-pg-display text-4xl font-extrabold leading-[1.1] text-pg-fg sm:text-5xl lg:text-6xl"
          >
            How does it work?
            <br />
            <span className="relative inline-block text-pg-accent">
              It’s incredibly simple.
              <Squiggle className="absolute -bottom-3 left-0 h-3 w-full text-pg-secondary" />
            </span>
          </motion.h2>

          <motion.p
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mx-auto mt-8 max-w-md font-pg-body text-xl text-pg-muted-fg"
          >
            Set it up once, then everything runs fully automated. No extra work required from you.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Dashed connector behind the cards — desktop only */}
          <svg
            aria-hidden
            className="absolute left-0 top-9 hidden h-2 w-full lg:block"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <motion.line
              x1="16" y1="1" x2="84" y2="1"
              stroke="var(--pg-fg)"
              strokeWidth={0.5}
              strokeDasharray="2 2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid grid-cols-1 gap-12 sm:gap-8 lg:grid-cols-3">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={prefersReduced ? {} : { opacity: 0, y: 32, scale: 0.92 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.15, ease: BOUNCE }}
                className="group relative"
              >
                {/* Sticker card */}
                <div
                  className={`relative rounded-2xl border-2 border-[var(--pg-fg)] bg-white px-6 pb-7 pt-12 text-center ${step.shadow} transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-safe:group-hover:-rotate-1 motion-safe:group-hover:scale-[1.02]`}
                >
                  {/* Floating icon circle, half-out of the top border */}
                  <div
                    className={`absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border-2 border-[var(--pg-fg)] ${step.chip} text-white shadow-[3px_3px_0_0_var(--pg-fg)] motion-safe:group-hover:[animation:pg-wiggle_0.5s_ease-in-out]`}
                  >
                    <step.icon className="h-6 w-6" strokeWidth={2.5} />
                  </div>

                  {/* Step number badge */}
                  <span className="absolute -right-3 -top-3 grid h-8 w-8 place-items-center rounded-full border-2 border-[var(--pg-fg)] bg-pg-quaternary font-pg-display text-sm font-extrabold text-pg-fg shadow-[2px_2px_0_0_var(--pg-fg)]">
                    {i + 1}
                  </span>

                  <h3 className="font-pg-display text-xl font-bold text-pg-fg">{step.title}</h3>
                  <p className="mx-auto mt-2 max-w-[260px] font-pg-body text-2xl leading-relaxed text-pg-muted-fg sm:text-base">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}