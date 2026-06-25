"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import PopButton from "@/components/pg/PopButton";
import { Squiggle, Confetti } from "@/components/pg/decorations";

const STUDIO_TYPES = [
  "Nail / Eyelash Salon",
  "Pet Grooming",
  "Fitness Coach",
  "Photography / Design",
  "Others",
];

const PLANS = ["Starter", "Growth", "All-in-One", "Not sure yet"];

type FormState = "idle" | "submitting" | "success" | "error";

const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

// ── Field wrapper — bold, tracked label per the design system ──
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-pg-display text-xs font-bold uppercase tracking-wider text-pg-fg">
        {label}
        {required && <span className="ml-1 text-pg-secondary">*</span>}
      </label>
      {children}
    </div>
  );
}

// Hard-shadow-on-focus inputs (transparent shadow → violet on focus).
const inputClass = `
  w-full rounded-lg border-2 border-pg-input-border bg-white
  px-4 py-3 font-pg-body text-sm text-pg-fg placeholder:text-slate-400
  shadow-[4px_4px_0_0_transparent]
  focus:outline-none focus:border-pg-accent focus:shadow-[4px_4px_0_0_var(--pg-accent)]
  transition-all duration-200
`;

const selectClass = `${inputClass} cursor-pointer appearance-none`;

// ── Success state ──
function SuccessCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: BOUNCE }}
      className="py-12 text-center"
    >
      <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border-2 border-[var(--pg-fg)] bg-pg-quaternary text-white shadow-[4px_4px_0_0_var(--pg-fg)] [animation:pg-pop_0.5s_ease-out]">
        <CheckCircle className="h-9 w-9" strokeWidth={2.5} />
      </div>
      <h2 className="font-pg-display text-2xl font-extrabold text-pg-fg">Message received!</h2>
      <p className="mx-auto mt-3 mb-8 max-w-xs font-pg-body leading-relaxed text-pg-muted-fg">
        We will reply to you within 1 business day.
        <br />
        Thank you for your inquiry — we never miss a single lead.
      </p>
      <div className="flex justify-center">
        <PopButton href="/">Back to Home</PopButton>
      </div>
    </motion.div>
  );
}

// ── Contact form ──
export default function ContactPage() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    social: "",
    studioType: "",
    plan: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/mjgdnjek", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          FullName: form.name,
          "IG / FB Account": form.social,
          BusinessType: form.studioType,
          InterestedPlan: form.plan,
        }),
      });

      if (res.ok) {
        setState("success");
      } else {
        throw new Error("form error");
      }
    } catch {
      // Fallback: open mailto
      const body = encodeURIComponent(
        `Name: ${form.name}\nIG/FB: ${form.social}\nBusiness Type: ${form.studioType}\nInterested Plan: ${form.plan}`
      );
      window.location.href = `mailto:hello@replai.tw?subject=Free Consult Request&body=${body}`;
      setState("idle");
    }
  };

  const isValid = form.name.trim() && form.studioType && form.plan;

  return (
    <main className="relative min-h-screen overflow-hidden bg-pg-bg pt-16">
      {/* Decorative paper texture + floating shapes */}
      <div aria-hidden className="pg-dots pointer-events-none absolute inset-0 opacity-60" />
      <Confetti />

      <div className="relative mx-auto max-w-xl px-5 py-16 sm:px-8 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: BOUNCE }}
          className="mb-10"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pg-fg)] bg-pg-tertiary px-4 py-1.5 font-pg-display text-sm font-bold text-pg-fg shadow-[3px_3px_0_0_var(--pg-fg)]">
            <span className="h-2 w-2 rounded-full bg-pg-secondary motion-safe:animate-pulse" />
            Free Consultation
          </span>
          <h1 className="font-pg-display text-4xl font-extrabold leading-[1.1] text-pg-fg sm:text-5xl">
            Tell us your business needs,
            <br />
            <span className="relative inline-block text-pg-accent">
              we’ll find the right plan for you.
              <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-pg-secondary" />
            </span>
          </h1>
          <p className="mt-6 font-pg-body leading-relaxed text-pg-muted-fg">
            Submit your form and we’ll reach out within 1 business day.
            <br />
            No pressure — just a casual consultation to explore your options.
          </p>
        </motion.div>

        {/* Sticker card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: BOUNCE }}
          className="rounded-2xl border-2 border-[var(--pg-fg)] bg-white p-7 shadow-[4px_4px_0_0_var(--pg-secondary)] sm:p-9 sm:shadow-[8px_8px_0_0_var(--pg-secondary)]"
        >
          {state === "success" ? (
            <SuccessCard />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <Field label="Your Name" required>
                <input
                  type="text"
                  placeholder="e.g. Amy Studio"
                  value={form.name}
                  onChange={set("name")}
                  required
                  className={inputClass}
                />
              </Field>

              <Field label="IG or FB Account">
                <input
                  type="text"
                  placeholder="@your_business"
                  value={form.social}
                  onChange={set("social")}
                  className={inputClass}
                />
              </Field>

              <Field label="Business Type" required>
                <div className="relative">
                  <select
                    value={form.studioType}
                    onChange={set("studioType")}
                    required
                    className={selectClass}
                  >
                    <option value="" disabled>Select an option...</option>
                    {STUDIO_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {/* Custom arrow */}
                  <svg
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pg-fg"
                    fill="none" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </Field>

              <Field label="Which plan are you interested in?" required>
                <div className="relative">
                  <select
                    value={form.plan}
                    onChange={set("plan")}
                    required
                    className={selectClass}
                  >
                    <option value="" disabled>Select an option...</option>
                    {PLANS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 24 24"
                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-pg-fg"
                    fill="none" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </Field>

              {state === "error" && (
                <p className="rounded-lg border-2 border-pg-secondary bg-pg-secondary/10 px-4 py-3 font-pg-body text-sm text-pg-fg">
                  Submission failed, please email us directly at hello@replai.tw
                </p>
              )}

              <PopButton
                type="submit"
                fullWidth
                disabled={!isValid || state === "submitting"}
                icon={
                  state === "submitting" ? (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <Send className="h-3.5 w-3.5" strokeWidth={2.5} />
                  )
                }
                className="mt-2"
              >
                {state === "submitting" ? "Sending..." : "Send Inquiry"}
              </PopButton>

              <p className="mt-1 text-center font-pg-body text-xs text-pg-muted-fg">
                By submitting, you agree to be contacted by Replai. We will never send spam messages.
              </p>
            </form>
          )}
        </motion.div>

        {/* Alternative contact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-8 text-center font-pg-body text-sm text-pg-muted-fg"
        >
          You can also reach us via{" "}
          <a
            href="https://linktr.ee/replai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-pg-accent underline decoration-2 underline-offset-2 transition-colors hover:text-pg-secondary"
          >
            Linktree
          </a>
        </motion.p>
      </div>
    </main>
  );
}