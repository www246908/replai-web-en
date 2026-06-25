"use client";

import { useReducedMotion } from "framer-motion";

const TRACK_A = [
  "Facebook DM", "Instagram Comments", "LINE Messages",
  "Reply within 30s", "24/7 Available", "Auto Booking Confirmation",
  "Never miss a message", "Take bookings overnight", "Customers don’t wait",
  // duplicated for seamless loop
  "Facebook DM", "Instagram Comments", "LINE Messages",
  "Reply within 30s", "24/7 Available", "Auto Booking Confirmation",
  "Never miss a message", "Take bookings overnight", "Customers don’t wait",
];

const TRACK_B = [
  "Nail Studios", "Pet Groomers", "Fitness Coaches", "Photographers",
  "Baking Tutors", "Hair Stylists", "Yoga Studios", "Handmade Workshops",
  "Tattoo Artists", "Beauty Salons",
  // duplicated for seamless loop
  "Nail Studios", "Pet Groomers", "Fitness Coaches", "Photographers",
  "Baking Tutors", "Hair Stylists", "Yoga Studios", "Handmade Workshops",
  "Tattoo Artists", "Beauty Salons",
];

function Track({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden py-2.5">
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} 36s linear infinite`,
        }}
      >
        {items.map((item, i) => {
          const isAccent = i % 4 === 0;
          return (
            <span key={i} className="flex shrink-0 items-center gap-5 px-5">
              <span
                className={`font-pg-display text-sm font-bold tracking-wide ${
                  isAccent ? "text-pg-tertiary" : "text-white/85"
                }`}
              >
                {item}
              </span>
              {/* Shape bullet */}
              <span
                className={`h-2.5 w-2.5 shrink-0 ${
                  i % 2 === 0 ? "rounded-full bg-pg-tertiary" : "rotate-45 bg-white/50"
                }`}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function MarqueeBanner() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div className="relative select-none overflow-hidden border-y-2 border-[var(--pg-fg)] bg-pg-accent">
      {/* Gradient edge masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-pg-accent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-pg-accent to-transparent" />

      <Track items={TRACK_A} />
      <div className="border-t-2 border-dashed border-white/20" />
      <Track items={TRACK_B} reverse />
    </div>
  );
}