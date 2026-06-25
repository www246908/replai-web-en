"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import PopButton from "@/components/pg/PopButton";

const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Contact Us", href: "/contact" },
];

function Logo() {
  return (
    <a
      href="/"
      className="rounded-sm font-pg-display text-xl font-extrabold tracking-tight text-pg-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pg-accent"
    >
      Replai<span className="text-pg-secondary">.</span>
    </a>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-pg-fg/20 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          {/* Sticker panel */}
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="
              fixed left-4 right-4 top-4 z-50
              flex flex-col gap-1 rounded-2xl border-2 border-[var(--pg-fg)]
              bg-pg-bg px-6 py-6 shadow-[6px_6px_0_0_var(--pg-fg)]
              md:hidden
            "
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--pg-fg)] bg-white text-pg-fg transition-colors hover:bg-pg-tertiary"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={prefersReduced ? {} : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="border-b-2 border-dashed border-pg-soft py-3 font-pg-display text-base font-bold text-pg-fg transition-colors last:border-0 hover:text-pg-accent"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.2 }}
              className="mt-4"
            >
              <PopButton href="/contact" fullWidth onClick={onClose}>
                Free Consultation
              </PopButton>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className={`
          relative mx-auto flex h-14 max-w-5xl items-center justify-between
          rounded-full border-2 border-[var(--pg-fg)] bg-pg-bg/95 px-5 backdrop-blur-md
          transition-all duration-300 sm:px-6
          ${scrolled ? "shadow-[4px_4px_0_0_var(--pg-fg)]" : "shadow-[2px_2px_0_0_var(--pg-fg)]"}
        `}
      >
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm font-pg-display text-sm font-bold text-pg-fg/75 transition-colors hover:text-pg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pg-accent"
            >
              {link.label}
            </a>
          ))}
          <PopButton href="/contact" size="sm" icon={null}>
            Free Consultation
          </PopButton>
        </nav>

        {/* Hamburger — mobile only */}
        <button
          ref={buttonRef}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--pg-fg)] bg-white text-pg-fg transition-colors hover:bg-pg-tertiary md:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </motion.div>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </header>
  );
}