export default function Footer() {
  return (
    <footer className="relative border-t-4 border-[var(--pg-fg)] bg-pg-fg text-white/70">
      {/* Decorative shape strip riding the top border */}
      <div aria-hidden className="pointer-events-none absolute -top-3 left-0 right-0 hidden justify-center gap-3 sm:flex">
        <span className="h-5 w-5 rounded-full border-2 border-[var(--pg-fg)] bg-pg-accent" />
        <span className="h-5 w-5 rotate-45 border-2 border-[var(--pg-fg)] bg-pg-secondary" />
        <span className="h-5 w-5 rounded-full border-2 border-[var(--pg-fg)] bg-pg-tertiary" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Brand */}
          <div>
            <p className="mb-2 font-pg-display text-2xl font-extrabold text-white">
              Replai<span className="text-pg-tertiary">.</span>
            </p>
            <p className="max-w-xs font-pg-body text-sm leading-snug">
              Capture every message for solo entrepreneurs in Taiwan.
              <br />
              24/7 AI auto-reply, never miss a single customer inquiry.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start gap-3 font-pg-body text-sm sm:items-end">
            <a
              href="https://linktr.ee/replaii"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white underline decoration-pg-tertiary decoration-2 underline-offset-4 transition-colors hover:text-pg-tertiary"
            >
              linktr.ee/replaii
            </a>
            <a
              href="/contact"
              className="text-white/70 transition-colors hover:text-white"
            >
              Free Consultation
            </a>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-8 border-t-2 border-dashed border-white/15 pt-6 font-pg-body text-xs text-white/40">
          © 2026 Replai · All rights reserved
        </div>
      </div>
    </footer>
  );
}