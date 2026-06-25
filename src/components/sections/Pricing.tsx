"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Zap, Star, Building2 } from "lucide-react";
import { Squiggle, Confetti } from "@/components/pg/decorations";

// 精簡版功能清單，大幅縮短卡片長度
const PLANS = [
  {
    id: "starter",
    icon: Zap,
    name: "STARTER",
    tagline: "Lead Capture System | Solo Artists",
    setupFee: "249",
    monthly: "39",
    cta: "Get Free Consultation",
    highlighted: false,
    features: [
      "24/7 text auto-reply for IG, WhatsApp & Facebook Messenger",
      "Embeddable website text chat widget",
      "AI answers pricing, hours & service FAQs",
      "Auto collect client info & preferred booking time",
      "One-click Calendly booking redirect",
      "Email-only technical support",
    ],
  },
  {
    id: "growth",
    icon: Star,
    name: "GROWTH",
    tagline: "AI Receptionist | Top Pick for Independent Studios",
    badge: "Most Popular",
    setupFee: "499",
    monthly: "99",
    cta: "Get Free Consultation",
    highlighted: true,
    features: [
      "All STARTER features fully included",
      "Unified multi-channel social text inbox",
      "AI conversation flow to turn chats into bookings",
      "Auto sort Hot / Warm / Cold potential clients",
      "24h & 72h opt-in automated text follow-ups",
      "Calendar sync + booking confirmation SMS",
      "Priority text & email technical support",
    ],
  },
  {
    id: "pro",
    icon: Building2,
    name: "PRO",
    tagline: "AI Sales System | Multi-Location Salons & Clinics",
    setupFee: "1499",
    monthly: "199",
    cta: "Get Free Consultation",
    highlighted: false,
    features: [
      "All GROWTH features fully included",
      "Full social platform + custom text tool integrations",
      "Cross-border compliant HubSpot / Airtable CRM sync",
      "3 dedicated text AI agents for reception & sales",
      "Complete revenue conversion funnel data tracking",
      "Separate dashboards for every store branch",
      "Exclusive text/email-only dedicated account manager",
    ],
  },
] as const;

const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

// 熱門標籤元件
function PopularBadge({ label }: { label: string }) {
  return (
    <div className="absolute -right-3 -top-4 z-20 rotate-12">
      <div className="flex items-center gap-1 rounded-full border-2 border-[var(--pg-fg)] bg-pg-tertiary px-3 py-1.5 shadow-[3px_3px_0_0_var(--pg-fg)]">
        <Star className="h-3.5 w-3.5 text-pg-fg" strokeWidth={2.5} fill="currentColor" />
        <span className="font-pg-display text-sm font-extrabold text-pg-fg">{label}</span>
      </div>
    </div>
  );
}

// 價格顯示區塊，字體放大
function PriceBlock({
  setupFee,
  monthly,
  highlighted,
}: {
  setupFee: string;
  monthly: string;
  highlighted: boolean;
}) {
  const main = highlighted ? "text-white" : "text-pg-fg";
  const sub = highlighted ? "text-white/80" : "text-pg-muted-fg";

  return (
    <div className="mb-6">
      <div className={`mb-2 ${sub}`}>
        <span className="font-pg-body text-base">One-time setup ${setupFee}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`font-pg-display text-4xl font-extrabold sm:text-5xl ${main}`}>
          ${monthly}
        </span>
        <span className={`font-pg-body text-base ${sub}`}>/month</span>
      </div>
    </div>
  );
}

// 功能清單文字放大 text-base
function FeatureList({
  features,
  highlighted,
}: {
  features: readonly string[];
  highlighted: boolean;
}) {
  const circle = highlighted ? "bg-white text-pg-accent" : "bg-pg-quaternary text-white";
  const text = highlighted ? "text-white/90" : "text-pg-muted-fg";

  return (
    <ul className="mb-8 flex-1 space-y-3">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2.5">
          <span className={`mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border-2 border-[var(--pg-fg)] ${circle}`}>
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className={`font-pg-body text-base leading-snug ${text}`}>{f}</span>
        </li>
      ))}
    </ul>
  );
}

// 單一方案卡片，移除強制固定高度，自然內容高度
function PlanCard({
  plan,
  index,
  isInView,
}: {
  plan: (typeof PLANS)[number];
  index: number;
  isInView: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const Icon = plan.icon;

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 36, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, ease: BOUNCE, delay: index * 0.13 }}
      className={`
        relative flex flex-col rounded-2xl border-2 border-[var(--pg-fg)] p-7 sm:p-8
        transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${
          plan.highlighted
            ? "z-10 bg-pg-accent text-white shadow-[8px_8px_0_0_var(--pg-secondary)] motion-safe:lg:scale-[1.03]"
            : "bg-white shadow-[6px_6px_0_0_var(--pg-soft)]"
        }
      `}
    >
      {"badge" in plan && plan.badge && <PopularBadge label={plan.badge} />}

      {/* 圖示 + 套餐標題 */}
      <div className="mb-4 flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-full border-2 border-[var(--pg-fg)] shadow-[2px_2px_0_0_var(--pg-fg)] ${plan.highlighted ? "bg-white" : "bg-pg-accent"}`}>
          <Icon className={`h-5 w-5 ${plan.highlighted ? "text-pg-accent" : "text-white"}`} strokeWidth={2.5} />
        </div>
        <div>
          <h3 className={`font-pg-display text-xl font-extrabold ${plan.highlighted ? "text-white" : "text-pg-fg"}`}>
            {plan.name}
          </h3>
          <p className={`mt-0.5 font-pg-body text-base ${plan.highlighted ? "text-white/70" : "text-pg-muted-fg"}`}>
            {plan.tagline}
          </p>
        </div>
      </div>

      {/* 分隔線 */}
      <div className={`my-5 border-t-2 border-dashed ${plan.highlighted ? "border-white/25" : "border-pg-soft"}`} />

      <PriceBlock setupFee={plan.setupFee} monthly={plan.monthly} highlighted={plan.highlighted} />

      <FeatureList features={plan.features} highlighted={plan.highlighted} />

      {/* 諮詢按鈕 */}
      <a
        href="/contact"
        className={`
          group inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--pg-fg)]
          px-6 py-3 font-pg-display text-base font-bold
          transition-all duration-300
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pg-accent/40
          ${
            plan.highlighted
              ? "bg-white text-pg-accent shadow-[4px_4px_0_0_var(--pg-fg)]"
              : "bg-pg-accent text-white shadow-[4px_4px_0_0_var(--pg-fg)]"
          }
        `}
      >
        {plan.cta}
      </a>

      {/* 底部備註文字放大 */}
      <p className={`mt-3 text-center font-pg-body text-sm ${plan.highlighted ? "text-white/60" : "text-pg-muted-fg"}`}>
        No long-term locked contracts
      </p>
    </motion.div>
  );
}

// 區塊頂部標題（副文案同步優化）
function SectionHeader({ isInView }: { isInView: boolean }) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="mb-16 text-center lg:mb-20">
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: BOUNCE }}
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pg-fg)] bg-pg-tertiary px-4 py-1.5 font-pg-display text-base font-bold text-pg-fg shadow-[3px_3px_0_0_var(--pg-fg)]">
          Transparent US Pricing
        </span>
      </motion.div>

      <motion.h2
        initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1, ease: BOUNCE }}
        className="font-pg-display text-4xl font-extrabold leading-[1.1] text-pg-fg sm:text-5xl"
      >
        Simple AI Reception Packages,
        <span className="relative inline-block text-pg-accent">
          Zero Hidden Fees.
          <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-pg-secondary" />
        </span>
      </motion.h2>

      <motion.p
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto mt-8 max-w-lg font-pg-body text-xl leading-relaxed text-pg-muted-fg"
      >
        Simple one-time setup + predictable monthly subscription.
        <br />
        100% text-only automation, zero phone calls to handle.
      </motion.p>
    </div>
  );
}

// 主元件
export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative overflow-hidden bg-pg-bg py-20 lg:py-28 px-5 sm:px-8"
    >
      <div aria-hidden className="pg-dots pointer-events-none absolute inset-0 opacity-50" />
      <Confetti />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeader isInView={isInView} />

        {/* 卡片網格，底部自動對齊 */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3 md:gap-5 lg:gap-7">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} isInView={isInView} />
          ))}
        </div>

        {/* 原本塞在Starter裡的長合規文字，移到三張卡片下方全域統一顯示，卡片變短 */}
        <div className="mt-10 text-center max-w-3xl mx-auto">
          <p className="font-pg-body text-sm text-pg-muted-fg">
            All automations only reply to customer-initiated messages. No cold outreach, all follow-up sequences follow global privacy compliance rules.
          </p>
        </div>
      </div>
    </section>
  );
}