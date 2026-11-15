"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cursor, EyeBadge, Magnetic, Portrait, Roll, asset } from "./ui";
import { EMAIL, LINKEDIN, academics, projects, skills, topics } from "@/lib/data";

const NAV = ["Intro", "Academics", "Skills", "Projects", "Connect"];
const go = (id: string) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
const Ext = "↗";

export default function Site() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [flip, setFlip] = useState<number | null>(null);
  const [slide, setSlide] = useState(0);
  const car = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) =>
        gsap.from(el, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
      gsap.to(bar.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
      gsap.from(".hero-w", { yPercent: 100, opacity: 0, stagger: 0.04, duration: 1, ease: "power4.out", delay: 0.1 });
      ScrollTrigger.create({ trigger: "#projects", start: "top 60px", end: "bottom 60px", onToggle: (s) => setDark(s.isActive) });
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = async () => { try { await navigator.clipboard.writeText(EMAIL); } catch {} setToast("Email copied ✓"); setTimeout(() => setToast(""), 2200); };
  const scrollCar = (i: number) => { const n = (i + projects.length) % projects.length; setSlide(n); const c = car.current; if (c) c.scrollTo({ left: (c.children[n] as HTMLElement).offsetLeft - c.offsetLeft - 24, behavior: "smooth" }); };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    const body = `${f.get("msg")}\n\n— ${f.get("name")} (${f.get("email")})\nTopic: ${topic}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio note: " + topic)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const words = "First-year BBA Honours student turning science-trained logic into business strategy, startups, and stories people actually care about.".split(" ");

  return (
    <div ref={root} className="overflow-x-clip">
      <Cursor />
      <div ref={bar} className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left scale-x-0 bg-ink mix-blend-difference" style={{ background: "#fff" }} />

      {/* Header */}
      <header className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(16px,4vw,48px)] py-4 transition-colors duration-500 ${dark ? "text-white" : "text-ink"}`}>
        <a href="#intro" className="flex items-center gap-2 text-xl font-extrabold lowercase tracking-tight" data-hover>
          <svg width="28" height="28" viewBox="0 0 28 28"><rect x="1" y="1" width="26" height="26" rx="9" fill="currentColor" /><path d="M8 20l6-12 6 12M10.5 16h7" stroke={dark ? "#050505" : "#fff"} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>ayona.
        </a>
        <nav className="hidden gap-8 text-sm font-medium md:flex">
          {NAV.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={(e) => { e.preventDefault(); go(n); }} className="rollh"><Roll>{n}</Roll></a>)}
        </nav>
        <Magnetic onClick={() => go("Connect")} className={`rounded-full px-5 py-2.5 text-sm font-semibold backdrop-blur ${dark ? "bg-white text-ink" : "bg-ink text-white"}`}>
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400" style={{ animation: "ping 1.6s infinite" }} /><span className="relative h-2 w-2 rounded-full bg-emerald-400" /></span>
          <Roll>Let's talk</Roll>
        </Magnetic>
      </header>

      {/* 1 Intro */}
      <section id="intro" className="relative flex min-h-screen flex-col justify-center bg-white px-[clamp(16px,4vw,48px)] pb-20 pt-32">
        <div className="absolute right-[clamp(16px,4vw,48px)] top-24 hidden sm:block"><EyeBadge /></div>
        <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-stone px-4 py-2 text-xs font-semibold sm:text-sm">TAPMI Bengaluru · E-Cell Member · Class of 2029</p>
        <h1 className="max-w-[18ch] font-display text-[clamp(2.1rem,6.2vw,5.6rem)] font-semibold leading-[1.02] tracking-tight sm:max-w-[22ch]">
          {words.map((w, i) => <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom"><span className="hero-w inline-block">{w}</span></span>)}
        </h1>
        <div className="mt-10 flex flex-wrap gap-2">
          {["Business Strategy", "Startups", "Data Storytelling", "Visual Design"].map((c, i) => (
            <span key={c} className={`rollh rounded-full px-5 py-2 text-sm font-medium ${["bg-mint", "bg-lilac", "bg-blush/60", "bg-stone"][i]}`} data-hover><Roll>{c}</Roll></span>))}
        </div>

        <div className="rv mt-20 grid items-stretch gap-8 rounded-[2rem] bg-stone p-[clamp(16px,3vw,40px)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <Portrait className="aspect-[4/5] w-full rounded-[2rem]" />
          <div className="flex flex-col justify-center gap-6">
            <span className="text-sm font-semibold uppercase tracking-widest text-mute">The Backstory</span>
            <p className="text-[clamp(1.05rem,1.7vw,1.5rem)] leading-relaxed">I’m Ayona Choudhury—an ambivert by wiring and a detective by habit. Coming from a science background into business at T. A. Pai Management Institute (TAPMI), Bengaluru gave me an unfair advantage: I don't take numbers or assumptions at face value. Whether I'm leading a loud brainstorm at TAPMI’s E-Cell or quietly building dashboards at 2 AM, I love watching messy ideas turn into real, breathing products.</p>
            <div><Magnetic href="#projects" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"><Roll>See the work</Roll> ↓</Magnetic></div>
          </div>
        </div>
      </section>

      {/* 2 Academics */}
      <section id="academics" className="bg-white py-20">
        <div className="rv mb-10 px-[clamp(16px,4vw,48px)]"><h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none">Where the logic<br />was built.</h2></div>
        <div className="hs flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(16px,4vw,48px)] pb-4">
          {academics.map((a) => (
            <article key={a.n} className="rv relative flex min-h-[clamp(420px,62vh,560px)] w-[min(88vw,640px)] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2rem] p-[clamp(20px,3vw,44px)]" style={{ background: a.bg }}>
              <svg className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] opacity-40" viewBox="0 0 200 200" fill="none" stroke="#0B0B0C" strokeOpacity=".25">{[30, 55, 80, 100].map((r) => <circle key={r} cx="100" cy="100" r={r} />)}</svg>
              <span className="font-display text-[clamp(5rem,12vw,9rem)] font-bold leading-none" style={{ WebkitTextStroke: "2px #0B0B0C", color: "transparent" }}>{a.n}</span>
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-ink/60">{a.tag}</span>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,2.8vw,2.4rem)] font-semibold leading-tight">{a.title}</h3>
                <p className="mt-1 font-medium text-ink/70">{a.sub}</p>
                <p className="mt-5 max-w-[48ch] leading-relaxed">{a.story}</p>
              </div>
            </article>))}
        </div>
      </section>

      {/* 3 Skills */}
      <section id="skills" className="bg-stone px-[clamp(16px,4vw,48px)] py-20">
        <h2 className="rv mb-3 font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none">What I make.</h2>
        <p className="rv mb-10 text-mute">Tap or hover a card to see it in the wild.</p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <div key={s.name} className={`flip rv h-[clamp(240px,32vw,320px)] ${flip === i ? "on" : ""} ${i === 0 ? "lg:col-span-2" : ""}`} onMouseEnter={() => setFlip(i)} onMouseLeave={() => setFlip(null)} onClick={() => setFlip(flip === i ? null : i)} data-hover role="button" tabIndex={0}>
              <div className="relative h-full w-full">
                <div className="face absolute inset-0 flex flex-col justify-between rounded-[2rem] p-7" style={{ background: s.bg }}>
                  <span className="text-sm font-semibold">0{i + 1}</span><h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight">{s.name}</h3>
                </div>
                <div className="face absolute inset-0 flex rotate-y-180 flex-col justify-end gap-3 overflow-hidden rounded-[2rem] bg-ink p-7 text-white" style={{ transform: "rotateY(180deg)" }}>
                  {s.img && <img src={asset(s.img)} alt={s.cap} className="min-h-0 flex-1 rounded-2xl object-cover object-top" />}
                  <p className="text-[clamp(.95rem,1.3vw,1.15rem)] leading-snug">{s.text}</p>
                  {s.cap && <p className="text-xs text-mute">{s.cap}</p>}
                </div>
              </div>
            </div>))}
        </div>
        <p className="rv mt-6 text-sm text-mute">Power BI in action: the ChaiNest dashboard below, built from the Sales_2025 dataset.</p>
        <figure className="rv mt-3 overflow-hidden rounded-[2rem] bg-ink p-3 sm:p-4"><img src={asset("powerbi.jpg")} alt="ChaiNest Cafe Sales Overview 2025 Power BI dashboard" className="w-full rounded-2xl" /></figure>
      </section>

      {/* 4 Projects */}
      <section id="projects" className="bg-obs py-20 text-white">
        <div className="mb-10 flex items-end justify-between gap-6 px-[clamp(16px,4vw,48px)]">
          <h2 className="rv font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-none">Selected work.</h2>
          <div className="flex gap-2">{["←", "→"].map((a, i) => <button key={a} aria-label={i ? "Next project" : "Previous project"} onClick={() => scrollCar(slide + (i ? 1 : -1))} className="h-12 w-12 rounded-full border border-white/30 text-xl transition hover:bg-white hover:text-ink" data-hover>{a}</button>)}</div>
        </div>
        <div ref={car} onScroll={(e) => { const c = e.currentTarget; const w = (c.children[0] as HTMLElement).offsetWidth + 24; setSlide(Math.round(c.scrollLeft / w)); }} className="hs flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(16px,4vw,48px)]">
          {projects.map((p, i) => (
            <article key={p.name} className="flex min-h-[clamp(440px,64vh,600px)] w-[min(88vw,560px)] shrink-0 snap-start flex-col justify-between rounded-[2rem] border border-white/15 bg-white/[.04] p-[clamp(20px,3vw,40px)]">
              <div className="flex items-center justify-between text-sm"><span className="rounded-full bg-white/10 px-4 py-1.5 font-medium">{p.tag}</span><span className="text-mute">0{i + 1} / 0{projects.length}</span></div>
              <div>
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-tight">{p.name}</h3>
                <p className="mt-4 font-display text-lg italic text-blush">“{p.hook}”</p>
                <p className="mt-4 leading-relaxed text-mute">{p.story}</p>
              </div>
              <Magnetic href={p.link} ext className="w-fit rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink"><Roll>Explore Case Study</Roll> {Ext}</Magnetic>
            </article>))}
          <div className="w-4 shrink-0" />
        </div>
        <div className="mt-8 flex items-center gap-4 px-[clamp(16px,4vw,48px)]"><span className="text-sm tabular-nums">0{slide + 1} / 0{projects.length}</span>
          <div className="h-[2px] flex-1 bg-white/20"><div className="h-full bg-white transition-all duration-500" style={{ width: `${((slide + 1) / projects.length) * 100}%` }} /></div></div>
      </section>

      {/* 5 Connect */}
      <section id="connect" className="bg-white px-[clamp(16px,4vw,48px)] pt-24">
        <h2 className="rv max-w-[22ch] font-display text-[clamp(1.8rem,4.6vw,4.2rem)] font-semibold leading-[1.08]">
          Have a knotty idea, a startup brainstorm, or a project worth building? <span className="inline-block h-[0.9em] w-[0.9em] -translate-y-[0.08em] overflow-hidden rounded-full align-middle"><Portrait className="h-full w-full" /></span> Let’s talk.
        </h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <form onSubmit={submit} className="rv flex flex-col gap-8">
            {[["name", "Name", "text"], ["email", "Your Email", "email"]].map(([n, l, t]) => <input key={n} name={n} type={t} required placeholder={l} className="border-b-2 border-ink/20 bg-transparent py-3 text-lg outline-none transition focus:border-ink" />)}
            <input name="msg" required placeholder="What's on your mind?" className="border-b-2 border-ink/20 bg-transparent py-3 text-lg outline-none transition focus:border-ink" />
            <div className="flex flex-wrap gap-2">{topics.map((t) => <button type="button" key={t} onClick={() => setTopic(t)} data-hover className={`rollh rounded-full border px-5 py-2 text-sm font-medium transition ${topic === t ? "border-ink bg-ink text-white" : "border-ink/20"}`}><Roll>{t}</Roll></button>)}</div>
            <div className="flex flex-wrap items-center gap-4">
              <Magnetic type="submit" className="rounded-full bg-ink px-8 py-4 font-semibold text-white" ><Roll>Send the note</Roll></Magnetic>
              {sent && <p className="text-sm font-medium">Thanks! Your mail app should open. If not, <a className="underline" href={`mailto:${EMAIL}`}>email me directly</a>.</p>}
            </div>
          </form>
          <div className="rv flex flex-col gap-5">
            <Portrait className="aspect-square w-full max-w-[320px] rounded-[2rem]" />
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${EMAIL}`} className="break-all text-lg font-semibold underline underline-offset-4">{EMAIL}</a>
              <Magnetic onClick={copy} className="rounded-full bg-mint px-4 py-2 text-sm font-semibold"><Roll>Copy Email</Roll></Magnetic>
            </div>
            <Magnetic href={LINKEDIN} ext className="metal w-fit rounded-full px-6 py-3 text-sm font-bold text-ink"><Roll>LinkedIn</Roll> {Ext}</Magnetic>
          </div>
        </div>
        <footer className="mt-24 overflow-hidden border-t border-ink/10 pt-6">
          <div className="flex flex-wrap justify-between gap-2 text-sm text-mute"><span>Bengaluru, India · TAPMI BBA Honours '29</span><span>Built with curiosity.</span></div>
          <div className="select-none text-center font-display font-bold lowercase leading-[.8] tracking-tighter" style={{ fontSize: "clamp(6rem,30vw,32rem)" }}>ayona.</div>
        </footer>
      </section>

      <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" data-hover className="metal fixed bottom-5 right-5 z-50 rounded-full px-5 py-3 text-sm font-bold text-ink">in · LinkedIn</a>
      <div className={`fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm text-white transition-all duration-300 ${toast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>{toast}</div>
    </div>
  );
}
