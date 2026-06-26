"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Squiggle, Confetti } from "@/components/pg/decorations";

// Rotating brand shadow colors for the sticker cards.
const CARD_SHADOWS = [
  "shadow-[6px_6px_0_0_var(--pg-secondary)]",
  "shadow-[6px_6px_0_0_var(--pg-soft)]",
  "shadow-[6px_6px_0_0_var(--pg-quaternary)]",
];

// ── Count-up hook ──
function useCountUp(target: number, duration = 1400, shouldStart = false) {
  const [count, setCount] = useState(0);
  const prefersReduced = useReducedMotion();
  useEffect(() => {
    if (!shouldStart) return;
    if (prefersReduced) { setCount(target); return; }
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, shouldStart, prefersReduced]);
  return count;
}

// ── Testimonial data ──
const TESTIMONIALS = [
  {
    id: "nail",
    quote:
      "I'm always busy serving walk-in clients and can't reply to DMs on time. Clients get tired of waiting and book elsewhere — I never knew how many potential bookings I was losing every day.",
    name: "Mia Chen",
    role: "Independent Nail Studio Owner",
    initials: "MC",
    hue: "bg-[#E8D5C4]",
    textColor: "text-[#8B5E3C]",
  },
  {
    id: "fitness",
    quote:
      "Customers message me about training packages late at night while I'm asleep. By the time I see their message next morning, they've already lost interest. I've lost full session fees this way countless times.",
    name: "Kevin Wu",
    role: "Independent Personal Trainer",
    initials: "KW",
    hue: "bg-[#C8D9D0]",
    textColor: "text-[#2E6F6A]",
  },
  {
    id: "pet",
    quote:
      "I used to waste nearly an hour every single day just sorting booking messages. Now AI handles all inquiries and slot confirmations automatically; I only need to show up ready for appointments.",
    name: "Lily Huang",
    role: "Independent Pet Groomer",
    initials: "LH",
    hue: "bg-[#D4CAEA]",
    textColor: "text-[#5B4A8A]",
  },
] as const;

// ── Avatar ──
function Avatar({
  initials,
  hue,
  textColor,
}: {
  initials: string;
  hue: string;
  textColor: string;
}) {
  return (
    <div
      className={`
        h-14 w-14 rounded-full ${hue}
        flex flex-shrink-0 items-center justify-center
        border-2 border-[var(--pg-fg)]
        font-pg-display text-base font-bold ${textColor}
        shadow-[2px_2px_0_0_var(--pg-fg)]
      `}
    >
      {initials}
    </div>
  );
}

// ── Quote mark SVG ──
function QuoteMark() {
  return (
    <svg
      viewBox="0 0 40 32"
      className="mb-3 h-8 w-10 flex-shrink-0 text-pg-secondary"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0 32V19.556C0 8.148 6.222 2.074 18.667 0l2.666 4.444C15.26 5.63 12 8.89 11.556 14.222H18V32H0zm22 0V19.556C22 8.148 28.222 2.074 40.667 0l2.666 4.444C37.26 5.63 34 8.89 33.556 14.222H40V32H22z" />
    </svg>
  );
}

// ── Single card ──
function TestimonialCard({
  item,
  index,
  isInView,
}: {
  item: (typeof TESTIMONIALS)[number];
  index: number;
  isInView: boolean;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: index * 0.14,
      }}
      whileHover={
        prefersReduced
          ? {}
          : { rotate: -1, scale: 1.02, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } }
      }
      className={`
        flex w-[85vw] flex-shrink-0 snap-start flex-col
        cursor-default rounded-2xl border-2 border-[var(--pg-fg)] bg-white
        p-8 sm:w-[400px] sm:p-10 md:w-auto
        ${CARD_SHADOWS[index % CARD_SHADOWS.length]}
      `}
    >
      <QuoteMark />

      {/* Quote text */}
      <p className="mb-6 flex-1 font-pg-body text-base leading-relaxed text-pg-fg sm:text-lg">
        {item.quote}
      </p>

      {/* Attribution */}
      <div className="flex items-center gap-4 border-t-2 border-dashed border-pg-soft pt-5">
        <Avatar
          initials={item.initials}
          hue={item.hue}
          textColor={item.textColor}
        />
        <div>
          <p className="font-pg-display text-base font-bold text-pg-fg">{item.name}</p>
          <p className="mt-0.5 font-pg-body text-sm text-pg-muted-fg">{item.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Stats strip with count-up ──
function StatItem({ target, suffix, label, shouldStart }: { target: number; suffix: string; label: string; shouldStart: boolean }) {
  const count = useCountUp(target, 1400, shouldStart);
  return (
    <div>
      <p className="mb-1 font-pg-display text-3xl font-extrabold leading-none text-pg-accent tabular-nums sm:text-4xl">
        {count}{suffix}
      </p>
      <p className="font-pg-body text-sm leading-snug text-pg-muted-fg sm:text-base">{label}</p>
    </div>
  );
}

function StatsStrip({ isInView }: { isInView: boolean }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: 0.55 }}
      className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 rounded-2xl border-2 border-[var(--pg-fg)] bg-pg-tertiary/15 px-6 py-7 text-center shadow-[6px_6px_0_0_var(--pg-fg)]"
    >
      <StatItem target={100} suffix="+" label="Active Studios" shouldStart={isInView} />
      <StatItem target={98}  suffix="%" label="Message Response Rate"     shouldStart={isInView} />
      <StatItem target={30}  suffix="s" label="Avg Response Time"   shouldStart={isInView} />
    </motion.div>
  );
}

// ── Main section ──
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden bg-pg-bg py-20 lg:py-28"
    >
      <div aria-hidden className="pg-dots pointer-events-none absolute inset-0 opacity-50" />
      <Confetti />

      {/* Header */}
      <div className="relative mb-12 px-5 text-center sm:px-8">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pg-fg)] bg-pg-secondary px-4 py-1.5 font-pg-display text-base font-bold text-white shadow-[3px_3px_0_0_var(--pg-fg)]">
            Hear From Our Studio Owners
          </span>
        </motion.div>

        <motion.h2
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="font-pg-display text-4xl font-extrabold leading-[1.1] text-pg-fg sm:text-5xl"
        >
          Do you deal with the
          <span className="relative inline-block text-pg-secondary">
            same daily struggles?
            <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-pg-accent" />
          </span>
        </motion.h2>

        <motion.p
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 max-w-md font-pg-body text-xl leading-relaxed text-pg-muted-fg"
        >
          These are genuine pain points shared by local studio operators.
          <br />
          Replai was built exclusively to solve these exact problems.
        </motion.p>
      </div>

      {/* Cards — horizontal scroll on mobile, grid on md+ */}
      <div className="relative px-5 sm:px-8">
        {/* Mobile: scroll container */}
        <div
          className="
            flex gap-4 md:hidden
            overflow-x-auto scroll-smooth
            snap-x snap-mandatory
            pb-4 -mb-4
            scrollbar-hide
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
            />
          ))}
          {/* Trailing spacer so last card has breathing room */}
          <div className="flex-shrink-0 w-5" aria-hidden />
        </div>

        {/* md+: 3-column grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5 lg:gap-6 max-w-5xl mx-auto">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard
              key={item.id}
              item={item}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative px-5 sm:px-8">
        <StatsStrip isInView={isInView} />
      </div>

      {/* Bottom CTA nudge */}
      <motion.p
        initial={prefersReduced ? {} : { opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative mt-8 text-center font-pg-body text-base text-pg-muted-fg"
      >
        Trusted by{" "}
        <span className="font-bold text-pg-fg">100+ independent studios</span>{" "}
        to never miss a single customer message
      </motion.p>
    </section>
  );
}