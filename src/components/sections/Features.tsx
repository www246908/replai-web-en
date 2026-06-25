"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Clock,
  CalendarCheck,
  Layers,
  MessageSquare,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Squiggle, Confetti } from "@/components/pg/decorations";

// ── Mini visuals inside cards ──

function AutoReplyVisual() {
  return (
    <div className="mt-6 space-y-2.5">
      {[
        { text: "Can I book a nail slot this Saturday?", fromUser: true },
        { text: "Absolutely! We have slots at 2PM & 4PM available～", fromUser: false },
        { text: "Please reserve the 4PM slot for me!", fromUser: true },
        { text: "Your slot is reserved ✓ The owner will confirm shortly", fromUser: false },
      ].map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: msg.fromUser ? 12 : -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.35 }}
          className={`flex ${msg.fromUser ? "justify-end" : "justify-start"}`}
        >
          <span
            className={`
              text-xs px-3 py-1.5 rounded-2xl max-w-[85%] leading-snug
              ${
                msg.fromUser
                  ? "bg-teal/15 text-teal-dark"
                  : "bg-surface text-ink shadow-sm border border-border"
              }
            `}
          >
            {msg.text}
          </span>
        </motion.div>
      ))}
      {/* Live badge */}
      <div className="flex justify-end mt-1">
        <span className="inline-flex items-center gap-1 text-[10px] text-ink-subtle">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Auto-replied at 2:13 AM
        </span>
      </div>
    </div>
  );
}

function BookingVisual() {
  const slots = [
    { time: "10:00", status: "booked" },
    { time: "12:00", status: "booked" },
    { time: "14:00", status: "available" },
    { time: "16:00", status: "available" },
    { time: "18:00", status: "booked" },
    { time: "20:00", status: "available" },
  ];

  return (
    <div className="mt-5">
      <p className="text-xs text-ink-subtle mb-2.5 font-medium">Available slots for Saturday</p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.25 }}
            className={`
              rounded-xl py-2 text-center text-xs font-medium border
              ${
                slot.status === "available"
                  ? "bg-teal/10 border-teal/20 text-teal-dark"
                  : "bg-ink/5 border-border text-ink-subtle line-through"
              }
            `}
          >
            {slot.time}
          </motion.div>
        ))}
      </div>
      <div className="flex gap-3 mt-3">
        <span className="flex items-center gap-1 text-[10px] text-ink-subtle">
          <span className="w-2 h-2 rounded-sm bg-teal/20" />
          Available
        </span>
        <span className="flex items-center gap-1 text-[10px] text-ink-subtle">
          <span className="w-2 h-2 rounded-sm bg-ink/10" />
          Fully Booked
        </span>
      </div>
    </div>
  );
}

function ChannelVisual() {
  const channels = [
    {
      label: "Facebook",
      color: "bg-[#1877F2]",
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      color: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]",
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      label: "LINE",
      color: "bg-[#06C755]",
      icon: (
        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.07 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-5">
      <div className="flex items-center justify-center gap-4">
        {channels.map((ch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.3 }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-11 h-11 rounded-2xl ${ch.color} flex items-center justify-center shadow-md`}
            >
              {ch.icon}
            </div>
            <span className="text-[10px] text-ink-muted font-medium">
              {ch.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Flow arrows */}
      <div className="flex items-center justify-center gap-4 mt-3 mb-4">
        {channels.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            className="w-11 flex justify-center"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-ink-subtle"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 5v14m0 0l-4-4m4 4l4-4"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Central inbox */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.35 }}
        className="
          mx-auto w-fit
          flex items-center gap-2.5
          bg-teal text-white rounded-2xl px-5 py-2.5 shadow-lg
        "
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm font-medium">Unified Inbox</span>
        <span className="bg-white/20 text-white text-xs rounded-full px-2 py-0.5">
          All Channels
        </span>
      </motion.div>
    </div>
  );
}

// ── Feature card data ──
// `chip` rotates the brand palette; `iconText` keeps icon legible on the chip.
const FEATURES = [
  {
    id: "auto-reply",
    icon: Clock,
    chip: "bg-pg-accent",
    iconText: "text-white",
    tag: "Core Feature",
    shadow: "shadow-[6px_6px_0_0_var(--pg-secondary)]",
    title: "24/7 Auto Reply",
    desc: "Got customer inquiries overnight? While you sleep, AI handles every message. Every DM gets a response within 30 seconds, making your clients feel valued at all hours.",
    visual: <AutoReplyVisual />,
    span: "lg:col-span-2 lg:row-span-2",
    highlight: true,
  },
  {
    id: "booking",
    icon: CalendarCheck,
    chip: "bg-pg-secondary",
    iconText: "text-white",
    tag: "Time Saver",
    shadow: "shadow-[6px_6px_0_0_var(--pg-soft)]",
    title: "Auto Booking System",
    desc: "AI automatically checks available slots & confirms reservations. No more back-and-forth messages — customers book instantly, and you get instant alerts.",
    visual: <BookingVisual />,
    span: "lg:col-span-2",
    highlight: false,
  },
  {
    id: "multichannel",
    icon: Layers,
    chip: "bg-pg-tertiary",
    iconText: "text-pg-fg",
    tag: "3 Major Platforms",
    shadow: "shadow-[6px_6px_0_0_var(--pg-soft)]",
    title: "AI Connects To All 3 Platforms",
    desc: "Facebook, Instagram, LINE — the 3 apps you open every day. AI monitors all channels at once. Wherever your customers message you, Replai is there.",
    visual: <ChannelVisual />,
    span: "lg:col-span-2",
    highlight: false,
  },
];

// ── Feature card — sticker treatment with bouncy wiggle on hover ──
function FeatureCard({
  feature,
  index,
  isInView,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
  isInView: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const Icon = feature.icon;

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 32, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
        delay: index * 0.12,
      }}
      className={`
        group relative cursor-default
        rounded-2xl border-2 border-[var(--pg-fg)] bg-white p-6 sm:p-7
        ${feature.shadow}
        transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        motion-safe:hover:-rotate-1 motion-safe:hover:scale-[1.02]
        ${feature.span}
        ${feature.highlight ? "lg:flex lg:flex-col" : ""}
      `}
    >
      {/* Tag pill */}
      <span className={`mb-4 inline-flex items-center gap-1.5 rounded-full border-2 border-[var(--pg-fg)] ${feature.chip} ${feature.iconText} px-2.5 py-1 font-pg-display text-xs font-bold`}>
        <Zap className="h-3 w-3" strokeWidth={2.5} />
        {feature.tag}
      </span>

      {/* Icon + title */}
      <div className="mb-3 flex items-start gap-3">
        <div
          className={`
            flex h-11 w-11 flex-shrink-0 items-center justify-center
            rounded-full border-2 border-[var(--pg-fg)] ${feature.chip}
            shadow-[2px_2px_0_0_var(--pg-fg)]
            transition-transform duration-200
            motion-safe:group-hover:[animation:pg-wiggle_0.5s_ease-in-out]
          `}
        >
          <Icon className={`h-5 w-5 ${feature.iconText}`} strokeWidth={2.5} />
        </div>
        <h3 className="pt-1 font-pg-display text-xl font-bold leading-snug text-pg-fg sm:text-2xl">
          {feature.title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-pg-body text-sm leading-relaxed text-pg-muted-fg sm:text-base">
        {feature.desc}
      </p>

      {/* Visual */}
      <div className={feature.highlight ? "flex-1" : ""}>{feature.visual}</div>
    </motion.div>
  );
}

// ── Section header ──
function SectionHeader({ isInView }: { isInView: boolean }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="mb-14 text-center lg:mb-16">
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pg-fg)] bg-pg-quaternary px-4 py-1.5 font-pg-display text-sm font-bold text-pg-fg shadow-[3px_3px_0_0_var(--pg-fg)]">
          <CheckCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
          3 Core Capabilities
        </span>
      </motion.div>

      <motion.h2
        initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        className="font-pg-display text-4xl font-extrabold leading-[1.1] text-pg-fg sm:text-5xl"
      >
        When you’re swamped,
        <br className="sm:hidden" />
        <span className="relative inline-block text-pg-accent">
          We handle the workload.
          <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-pg-secondary" />
        </span>
      </motion.h2>

      <motion.p
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-8 max-w-xl font-pg-body text-lg leading-relaxed text-pg-muted-fg"
      >
        Fully automated — from the first inquiry to booking confirmation.
        <br />
        All you need to focus on is delivering great service to walk-in clients.
      </motion.p>
    </div>
  );
}

// ── Main section ──
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-pg-bg py-20 lg:py-28 px-5 sm:px-8"
    >
      <div aria-hidden className="pg-dots pointer-events-none absolute inset-0 opacity-50" />
      <Confetti />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader isInView={isInView} />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto lg:grid-rows-[auto_auto]">
          {FEATURES.map((feature, i) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}