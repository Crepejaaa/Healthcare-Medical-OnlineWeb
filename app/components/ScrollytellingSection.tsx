'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── Step data ─────────────────────────────────────────────── */
const steps = [
  {
    badge: '📊 ข้อมูลในประเทศไทย',
    title: 'คนไทยกว่า',
    highlight: '10 ล้านคน',
    suffix: 'มีโรคหอบหืดหรือภูมิแพ้',
    desc: 'คิดเป็น 13% ของประชากรไทย แต่มีเพียง 30% เท่านั้นที่ได้รับการรักษาอย่างถูกต้องและต่อเนื่อง',
    color: 'from-blue-500 to-cyan-400',
    bg: 'from-blue-900/40 to-cyan-900/20',
  },
  {
    badge: '⚠️ ตัวกระตุ้นอาการ',
    title: 'ปัจจัยเสี่ยง',
    highlight: 'รอบตัวคุณ',
    suffix: 'ที่มองข้ามไม่ได้',
    desc: 'PM2.5 จากการจราจร ไรฝุ่น เกสรดอกไม้ ควันบุหรี่ และอากาศเย็น ล้วนทำให้อาการกำเริบได้ทุกเมื่อ',
    color: 'from-orange-500 to-red-400',
    bg: 'from-orange-900/40 to-red-900/20',
  },
];

/* ─── Visual: Step 0 — Stat counter ────────────────────────── */
function Visual0({ isActive }: { isActive: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) { setCount(0); return; }
    const target = 10, duration = 1600;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isActive]);

  const stats = [
    { label: 'ได้รับการรักษา', value: '30%', color: 'text-cyan-400' },
    { label: 'ไม่ได้รับการรักษา', value: '70%', color: 'text-red-400' },
    { label: 'เด็กอายุต่ำกว่า 15 ปี', value: '3.2M', color: 'text-blue-400' },
    { label: 'กำเริบเฉลี่ยต่อปี', value: '2–4 ครั้ง', color: 'text-yellow-400' },
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm">
      {/* Circular SVG */}
      <div className="relative w-44 h-44">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="50" fill="none"
            stroke="url(#g0)" strokeWidth="8" strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - (isActive ? 0.13 : 0))}`}
            style={{ transition: 'stroke-dashoffset 1.6s ease-out' }}
          />
          <defs>
            <linearGradient id="g0" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-black text-white leading-none">{count}</span>
          <span className="text-cyan-400 font-bold">ล้านคน</span>
        </div>
      </div>

      {/* Sub-stats grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white/8 border border-white/10 rounded-2xl p-3 text-center"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'none' : 'translateY(16px)',
              transition: `opacity 0.5s ease-out ${300 + i * 90}ms, transform 0.5s ease-out ${300 + i * 90}ms`,
            }}
          >
            <div className={`text-base font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-white/50 leading-snug mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Visual: Step 1 — Trigger icons ───────────────────────── */
function Visual1({ isActive }: { isActive: boolean }) {
  const triggers = [
    { icon: '🌫️', label: 'PM2.5', bg: 'bg-slate-700/80' },
    { icon: '🪲', label: 'ไรฝุ่น', bg: 'bg-amber-900/60' },
    { icon: '🌸', label: 'เกสรดอกไม้', bg: 'bg-pink-900/60' },
    { icon: '🚬', label: 'ควันบุหรี่', bg: 'bg-gray-700/80' },
    { icon: '❄️', label: 'อากาศเย็น', bg: 'bg-blue-900/60' },
    { icon: '🏃', label: 'ออกกำลังกาย', bg: 'bg-green-900/60' },
  ];

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm">
      <div className="grid grid-cols-3 gap-3 w-full">
        {triggers.map((t, i) => (
          <div
            key={i}
            className={`${t.bg} border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-2 cursor-default hover:border-white/30 transition-colors`}
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1)' : 'scale(0.7)',
              transition: `opacity 0.4s ease-out ${i * 80}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms`,
            }}
          >
            <span className="text-3xl">{t.icon}</span>
            <span className="text-xs text-white/70 font-medium text-center leading-snug">{t.label}</span>
          </div>
        ))}
      </div>
      <p
        className="text-white/30 text-sm"
        style={{ opacity: isActive ? 1 : 0, transition: 'opacity 0.5s ease-out 600ms' }}
      >
        + ปัจจัยอื่นๆ อีกหลายชนิด
      </p>
    </div>
  );
}

const Visuals = [Visual0, Visual1];

/* ─── Main Section ──────────────────────────────────────────── */
export default function ScrollytellingSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScroll = el.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(-rect.top, totalScroll));
      const step = Math.min(
        Math.floor((scrolled / totalScroll) * steps.length),
        steps.length - 1
      );
      setActiveStep(Math.max(0, step));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const step = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen bg-slate-900 overflow-hidden">
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${step.bg} transition-all duration-1000`}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/3 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/3 blur-3xl pointer-events-none" />

        <div className="relative z-10 h-full flex">
          {/* ── Left: Text panel ── */}
          <div className="flex flex-col justify-center w-full md:w-1/2 px-8 md:px-14 lg:px-20">
            {/* Step progress pills */}
            <div className="flex gap-2 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === activeStep ? 'w-8 bg-white' : i < activeStep ? 'w-3 bg-white/30' : 'w-3 bg-white/12'
                  }`}
                />
              ))}
            </div>

            {/* Animated text content — key forces re-mount & re-animation on step change */}
            <div key={activeStep} className="scrolly-text-enter">
              <p className="text-xs font-semibold text-white/40 tracking-widest uppercase mb-5">
                {step.badge}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-1">
                {step.title}
              </h2>
              <h2 className={`text-4xl md:text-5xl font-black leading-tight bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}>
                {step.highlight}
              </h2>
              <p className="text-xl md:text-2xl text-white/50 font-medium mb-6">
                {step.suffix}
              </p>
              <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-md">
                {step.desc}
              </p>
            </div>

            <div className="mt-10 font-mono text-sm text-white/20">
              {String(activeStep + 1).padStart(2, '0')} — {String(steps.length).padStart(2, '0')}
            </div>
          </div>

          {/* ── Right: Visual panel ── */}
          <div className="hidden md:flex w-1/2 items-center justify-center px-10 relative">
            {Visuals.map((Visual, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center px-10"
                style={{
                  opacity: i === activeStep ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: i === activeStep ? 'auto' : 'none',
                }}
              >
                <Visual isActive={i === activeStep} />
              </div>
            ))}
          </div>
        </div>

        {/* Side step indicator */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-500 ${
                i === activeStep ? 'h-7 bg-white' : 'h-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
