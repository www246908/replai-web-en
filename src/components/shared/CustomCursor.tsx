"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reduced, setReduced] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Dot — near-instant follow, no perceptible lag.
  const dotX = useSpring(rawX, { stiffness: 1200, damping: 50, mass: 0.2 });
  const dotY = useSpring(rawY, { stiffness: 1200, damping: 50, mass: 0.2 });

  // Glow — smooth but snappy so it reads as fluid light, not a lagging ring.
  const glowX = useSpring(rawX, { stiffness: 350, damping: 40, mass: 0.4 });
  const glowY = useSpring(rawY, { stiffness: 350, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, label, select, [data-cursor]"
      );
      setHovering(!!el);
    };

    const onLeave = () => setVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible, rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Ambient glow — subtly brightens whatever it passes over.
          Hidden for reduced-motion users so nothing chases the cursor. */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="fixed left-0 top-0 z-[9998] pointer-events-none rounded-full"
          style={{
            x: glowX,
            y: glowY,
            translateX: "-50%",
            translateY: "-50%",
            width: 480,
            height: 480,
            // Warm amber core + teal halo. Normal blend so it stays visible on
            // the cream background (a "brightening" blend would vanish there),
            // while still glowing nicely over the dark teal sections.
            background:
              "radial-gradient(circle, rgba(232,163,61,0.28) 0%, rgba(46,111,106,0.16) 42%, transparent 72%)",
          }}
          animate={{ opacity: hovering ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Pointer dot — fast, precise, no lag. */}
      <motion.div
        className="fixed left-0 top-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 12 : 8,
          height: hovering ? 12 : 8,
          backgroundColor: hovering ? "#C9603F" : "#2E6F6A",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
