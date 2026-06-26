"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Squiggle, Shapes } from "@/components/pg/decorations";

// 磁吸按鈕
function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 26 });
  const springY = useSpring(y, { stiffness: 280, damping: 26 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// 逐字彈出動畫
function CharReveal({
  text,
  delay = 0,
  className = "",
  isInView,
}: {
  text: string;
  delay?: number;
  className?: string;
  isInView: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const chars = text.split("");

  return (
    <span className={`inline ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom" }}
          aria-hidden
        >
          <motion.span
            className="inline-block"
            initial={prefersReduced ? {} : { y: "110%" }}
            animate={isInView ? { y: "0%" } : {}}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              delay: delay + i * 0.022,
            }}
          >
            {char === " " ? " " : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// 淡入模糊動畫工具
function useReveal(delay = 0) {
  const prefersReduced = useReducedMotion();
  return {
    initial: prefersReduced ? {} : { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

// 聊天對話流程
const CHAT_SEQUENCE = [
  { id: 1, type: "customer" as const, text: "Hi! I’d like to book a nail appointment this Saturday, any slots left?", delay: 0.6 },
  { id: 2, type: "typing" as const,   text: "",                                   delay: 1.3 },
  { id: 3, type: "ai" as const,       text: "Sure! We have slots at 2PM and 4PM, which works better for you?", delay: 2.1 },
  { id: 4, type: "customer" as const, text: "4PM sounds perfect!",                         delay: 3.0 },
  { id: 5, type: "typing" as const,   text: "",                                   delay: 3.6 },
  { id: 6, type: "ai" as const,       text: "Your 4PM slot on Saturday is reserved ✓ We’ll notify you once confirmed by the owner.", delay: 4.3 },
] as const;

// 輸入中動畫點點
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-pg-accent/50"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// 手機聊天視窗（手機最大寬度縮小，不溢出螢幕）
function ChatWindow({ shouldPlay }: { shouldPlay: boolean }) {
  const prefersReduced = useReducedMotion();
  const [visibleIds, setVisibleIds] = useState<number[]>([]);

  useEffect(() => {
    if (!shouldPlay) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    CHAT_SEQUENCE.forEach((msg) => {
      const t = setTimeout(
        () => setVisibleIds((prev) => [...prev, msg.id]),
        prefersReduced ? 0 : msg.delay * 1000
      );
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [shouldPlay, prefersReduced]);

  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
      {/* 手機外框 */}
      <div className="relative overflow-hidden rounded-[2.25rem] border-2 border-[var(--pg-fg)] bg-white shadow-[8px_8px_0_0_var(--pg-fg)]">
        {/* 頂部標題欄 */}
        <div className="bg-pg-accent px-4 pb-4 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/30 bg-white/20">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7H3a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13c-.83 0-1.5.67-1.5 1.5S6.67 16 7.5 16 9 15.33 9 14.5 8.33 13 7.5 13m9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5M12 19a7 7 0 0 1-5.46-2.61A9.01 9.01 0 0 0 12 17a9.01 9.01 0 0 0 5.46.39A7 7 0 0 1 12 19z" />
                </svg>
              </div>
              <div>
                <p className="font-pg-display text-base font-bold leading-none text-white">Replai Assistant</p>
                <p className="mt-0.5 font-pg-body text-base text-white/70">Auto-replying now</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 animate-pulse rounded-full bg-pg-tertiary" />
              <span className="font-pg-body text-base text-white/70">Live</span>
            </div>
          </div>
        </div>

        {/* 對話內容 text-base 放大 */}
        <div className="flex min-h-[280px] flex-col gap-2.5 bg-pg-muted px-3 py-4">
          {CHAT_SEQUENCE.map((msg) => {
            if (!visibleIds.includes(msg.id)) return null;
            if (msg.type === "typing") {
              if (visibleIds.includes(msg.id + 1)) return null;
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm border-2 border-[var(--pg-fg)] bg-white"><TypingDots /></div>
                </motion.div>
              );
            }
            const isAI = msg.type === "ai";
            return (
              <motion.div
                key={msg.id}
                initial={prefersReduced ? {} : { opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className={`flex ${isAI ? "justify-start" : "justify-end"}`}
              >
                <div className={`max-w-[80%] border-2 border-[var(--pg-fg)] px-3 py-2 font-pg-body text-base leading-relaxed ${isAI ? "rounded-2xl rounded-bl-sm bg-white text-pg-fg" : "rounded-2xl rounded-br-sm bg-pg-accent text-white"}`}>
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 底部輸入框 */}
        <div className="flex items-center gap-2 border-t-2 border-[var(--pg-fg)] bg-white px-3 py-2.5">
          <div className="flex-1 rounded-full bg-pg-muted px-3 py-2 font-pg-body text-base text-pg-muted-fg">Type a message...</div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--pg-fg)] bg-pg-accent">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </div>
        </div>
      </div>

      {/* 裝飾貼紙文字放大 */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, scale: 0.6, y: 10 }}
        animate={visibleIds.length > 0 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 10 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="absolute -right-2 -top-2 rotate-3 rounded-full border-2 border-[var(--pg-fg)] bg-pg-secondary px-2.5 py-1 font-pg-display text-sm font-bold text-white shadow-[3px_3px_0_0_var(--pg-fg)]"
      >
        Auto Reply
      </motion.div>
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, x: -10 }}
        animate={visibleIds.length >= 4 ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.4 }}
        className="absolute -bottom-2 -left-2 flex -rotate-2 items-center gap-1 rounded-full border-2 border-[var(--pg-fg)] bg-white px-2.5 py-1 font-pg-body text-base font-medium text-pg-fg shadow-[3px_3px_0_0_var(--pg-fg)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-pg-quaternary" />
        Replied at 2:13 AM
      </motion.div>
    </div>
  );
}

// 主Hero元件
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const reveal = useReveal;

  // 手機視窗滾動視差
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-pg-bg pb-16 pt-20 sm:pt-24"
    >
      {/* 背景點點紋路 */}
      <div aria-hidden className="pg-dots pointer-events-none absolute inset-0 opacity-50" />

      {/* 裝飾幾何圖案 僅桌機顯示 lg以上 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <div className="absolute -left-24 top-24 h-96 w-96 rounded-full border-2 border-[var(--pg-fg)]/10 bg-pg-tertiary/20" />
        <Shapes.Ring className="absolute right-[6%] top-[16%] h-12 w-12 text-pg-secondary" />
        <Shapes.Triangle className="absolute left-[44%] top-[12%] h-8 w-8 rotate-12 text-pg-quaternary" />
        <Shapes.Plus className="absolute bottom-[18%] left-[8%] h-7 w-7 text-pg-accent" />
        <Shapes.Dot className="absolute bottom-[24%] right-[40%] h-4 w-4 text-pg-tertiary" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* 左側文案區：手機取消左右偏移，僅桌機偏移 */}
          <div className="order-2 lg:order-1 lg:-ml-6 xl:-ml-12">
            {/* 頂部標籤：手機取消偏移 */}
            <motion.div {...reveal(0)} animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-[var(--pg-fg)] bg-pg-tertiary px-4 py-1.5 font-pg-display text-base font-bold text-pg-fg shadow-[3px_3px_0_0_var(--pg-fg)] lg:-ml-6 xl:-ml-12">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pg-secondary" />
                AI Customer Service, Open 24/7
              </span>
            </motion.div>

            {/* 大標題：手機縮小字號、行高更舒適 */}
            <h1 
              className="mb-3 font-pg-display text-4xl sm:text-5xl lg:text-[3.75rem] xl:text-7xl font-extrabold leading-[1.2] tracking-tight text-pg-fg"
            >
              <span className="block">
                <CharReveal text="Customers message you," delay={0.08} isInView={isInView} />
              </span>
              <span className="block">
                <CharReveal text="but you’re busy?" delay={0.26} isInView={isInView} />
              </span>
              <span className="relative block">
                <CharReveal text="We’ll handle it." delay={0.44} className="text-pg-accent" isInView={isInView} />
                <Squiggle className="absolute bottom-1 left-0 h-2 w-[5.5em] text-pg-secondary" />
              </span>
            </h1>

            {/* 副標：手機字體適中、換行自然 */}
            <motion.p
              {...reveal(0.62)}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              className="mb-6 mt-5 max-w-md font-pg-body text-lg sm:text-xl lg:text-2xl leading-relaxed text-pg-muted-fg"
            >
              No matter what you’re occupied with,
              <br className="hidden sm:block" />
              AI catches every incoming message for you.
              <br />
              <span className="font-bold text-pg-fg">Not a single lead missed.</span>
            </motion.p>

            {/* 按鈕手機上下堆疊、滿版寬度 */}
            <motion.div
              {...reveal(0.72)}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <MagneticLink
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-[var(--pg-fg)] bg-pg-accent px-6 py-3.5 font-pg-display text-base font-bold text-white shadow-[4px_4px_0_0_var(--pg-fg)] transition-shadow duration-300 hover:shadow-[6px_6px_0_0_var(--pg-fg)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pg-accent/40 sm:flex-1"
              >
                Get Free Consultation
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-pg-fg">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </MagneticLink>

              <MagneticLink
                href="/#how-it-works"
                className="inline-flex items-center justify-center rounded-full border-2 border-[var(--pg-fg)] bg-transparent px-6 py-3.5 font-pg-display text-base font-bold text-pg-fg transition-colors duration-200 hover:bg-pg-tertiary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pg-accent/40 sm:flex-1"
              >
                See How It Works
              </MagneticLink>
            </motion.div>

            {/* 客戶佐證 */}
            <motion.div
              {...reveal(0.82)}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              className="mt-8 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {[
                  { label: "Nail", bg: "bg-pg-accent" },
                  { label: "Pet", bg: "bg-pg-secondary" },
                  { label: "Fitness", bg: "bg-pg-tertiary" },
                ].map((item, i) => (
                  <div key={i} className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--pg-fg)] ${item.bg} font-pg-display text-[10px] font-bold ${item.label === "Fitness" ? "text-pg-fg" : "text-white"}`}>
                    {item.label}
                  </div>
                ))}
              </div>
              <p className="font-pg-body text-base text-pg-muted-fg">
                <span className="font-bold text-pg-fg">100+</span> studios are already using Replai
              </p>
            </motion.div>
          </div>

          {/* 右側手機聊天框：手機無左右偏移，居中顯示 */}
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 40, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 }}
            style={prefersReduced ? {} : { y: phoneY }}
            className="order-1 flex justify-center lg:order-2 lg:-mr-8 xl:-mr-16"
          >
            <ChatWindow shouldPlay={isInView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}