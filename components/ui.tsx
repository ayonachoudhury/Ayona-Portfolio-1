"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${p}`;

export function Roll({ children }: { children: string }) {
  return <span className="roll"><span>{children}</span><span aria-hidden>{children}</span></span>;
}

export function Magnetic({ children, className = "", href, onClick, ext, type }: { children: ReactNode; className?: string; href?: string; onClick?: () => void; ext?: boolean; type?: "submit" }) {
  const ref = useRef<any>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current as HTMLElement, r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  const p = { ref, onMouseMove: move, onMouseLeave: leave, "data-hover": true, className: `rollh inline-flex items-center gap-2 transition-transform duration-300 ${className}` } as any;
  if (href) return <a {...p} href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  return <button {...p} type={type || "button"} onClick={onClick}>{children}</button>;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover:hover)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, s = 1, ts = 1, raf = 0;
    const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; ts = (e.target as HTMLElement).closest("a,button,input,[data-hover]") ? 3.2 : 1; };
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; s += (ts - s) * 0.15;
      if (dot.current) dot.current.style.transform = `translate(${cx - 10}px,${cy - 10}px) scale(${s})`; raf = requestAnimationFrame(loop); };
    window.addEventListener("mousemove", mv); loop();
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full bg-white mix-blend-difference [@media(hover:hover)]:block" />;
}

export function EyeBadge() {
  const pupil = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      const p = pupil.current; if (!p) return; const r = p.parentElement!.getBoundingClientRect();
      const a = Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2));
      const d = Math.min(14, Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) / 12);
      p.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`;
    };
    window.addEventListener("mousemove", mv); return () => window.removeEventListener("mousemove", mv);
  }, []);
  const t = "AYONA CHOUDHURY · SCROLL TO EXPLORE · STRATEGY & STORIES · ";
  return (
    <div className="relative h-[clamp(110px,16vw,190px)] w-[clamp(110px,16vw,190px)]" aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" style={{ animation: "spin 18s linear infinite" }}>
        <defs><path id="c" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
        <text fontSize="13.5" fontWeight="600" letterSpacing="2.2" fill="#0B0B0C"><textPath href="#c" textLength="500">{t}</textPath></text>
      </svg>
      <div className="absolute left-1/2 top-1/2 flex h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_2px_#0B0B0C]">
        <div ref={pupil} className="h-[45%] w-[45%] rounded-full bg-ink transition-transform duration-75" />
      </div>
    </div>
  );
}

export function Portrait({ className = "" }: { className?: string }) {
  const [bad, setBad] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-lilac2 ${className}`}>
      {bad ? <div className="flex h-full w-full items-center justify-center font-display text-6xl font-bold text-ink/70">AC</div>
        : <img src={asset("portrait.jpg")} alt="Ayona Choudhury" onError={() => setBad(true)} className="h-full w-full object-cover" />}
    </div>
  );
}
