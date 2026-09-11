"use client";

import type { RefObject } from "react";
import { useMotionScope, gsap, ScrollTrigger, SplitText, type MotionScope } from "@/hooks/useMotionScope";
import { marqueeSpeed, pointerOffset } from "@/lib/motionMath";

const enter = (trigger: Element, start = "top 88%") => ({ trigger, start, once: true });

function setupPortfolio(scope: MotionScope) {
  const { root, select, reduced, finePointer, cleanup } = scope;
  const first = <T extends Element = HTMLElement>(selector: string) => select<T>(selector)[0];
  const listen = (el: EventTarget, type: string, fn: EventListener) => {
    el.addEventListener(type, fn);
    cleanup(() => el.removeEventListener(type, fn));
  };

  // Navigation/progress convey position even when decorative motion is disabled.
  const links = select<HTMLAnchorElement>(".nav nav a");
  let active = "home";
  const setActive = (id: string) => {
    active = id;
    links.forEach(link => {
      const selected = link.hash === `#${id}`;
      link.classList.toggle("active", selected);
      if (selected) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };
  const navSections = select<HTMLElement>("#home,#projects,#about,#skills,#experience");
  // About/skills share a row on desktop. Preserve an explicit anchor selection.
  navSections.forEach(section => ScrollTrigger.create({
    trigger: section,
    start: "top 160px",
    end: "bottom 160px",
    onToggle: self => {
      if (!self.isActive) return;
      const peer = navSections.find(item => item.id === active);
      const sharesRow = peer && peer !== section && Math.abs(peer.offsetTop - section.offsetTop) < 5;
      if (!sharesRow) setActive(section.id);
    },
    onRefresh: self => { if (self.isActive) setActive(section.id); },
  }));
  links.forEach(link => listen(link, "click", () => setActive(link.hash.slice(1))));
  listen(window, "hashchange", () => {
    const id = location.hash.slice(1);
    if (navSections.some(section => section.id === id)) setActive(id);
  });
  cleanup(() => links.forEach(link => { link.classList.remove("active"); link.removeAttribute("aria-current"); }));
  const progress = first("#scroll-progress");
  gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
  const setProgress = gsap.quickSetter(progress, "scaleX");
  ScrollTrigger.create({
    start: 0, end: () => ScrollTrigger.maxScroll(window),
    onUpdate: self => setProgress(self.progress),
    onRefresh: self => setProgress(self.progress),
  });
  if (reduced) return;

  // Real rendered lines, not word-by-word approximations. autoSplit handles font
  // loading and width changes; returned animations retain progress on re-split.
  const lines = (selector: string, trigger?: Element, delay = 0) => {
    select(selector).forEach(element => {
      let complete = false;
      const split = SplitText.create(element, {
        type: "lines", mask: "lines", linesClass: "motion-line", autoSplit: true,
        onSplit: instance => {
          if (complete) return;
          return gsap.from(instance.lines, {
            yPercent: 110, duration: 0.58, stagger: 0.075, delay,
            ease: "power4.out",
            ...(trigger ? { scrollTrigger: enter(trigger) } : {}),
            onComplete: () => { complete = true; },
          });
        },
      });
      cleanup(() => split.revert());
    });
  };

  // HERO — a short mechanical assembly, followed by independently owned depth.
  lines(".hero h1", undefined, 0.08);
  lines(".hero h2", undefined, 0.22);
  lines(".hero-copy > p", undefined, 0.38);
  gsap.from(select(".hero-copy .eyebrow"), { clipPath: "inset(0 100% 0 0)", duration: 0.38, ease: "power4.out" });
  gsap.from(select(".hero .actions > *"), { y: 14, clipPath: "inset(100% 0 0 0)", stagger: 0.08, duration: 0.4, delay: 0.5, ease: "power3.out" });
  gsap.from(select(".hero .geo-square,.hero-copy .eyebrow > span"), { scale: 0, transformOrigin: "50% 50%", stagger: 0.09, duration: 0.35, delay: 0.35, ease: "back.out(1.7)" });
  gsap.from(select(".hero .geo-block"), {
    x: i => (i % 2 ? 1 : -1) * (i > 5 ? 22 : 12),
    y: i => i > 5 ? -30 : (i % 2 ? -18 : 18),
    scale: 0.94, opacity: 0, transformOrigin: "50% 50%",
    duration: 0.65, stagger: 0.055, delay: 0.12, ease: "power4.out",
  });
  const hero = first(".hero");
  const depth = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.65 } });
  depth.to(select('.hero .geo-depth[data-depth="front"]'), { y: 65, ease: "none" }, 0)
    .to(select('.hero .geo-depth[data-depth="back"]'), { y: 27, ease: "none" }, 0)
    .to(select(".hero .geo-background"), { y: -18, ease: "none" }, 0)
    .to(select(".hero .geo-wireframe"), { y: -35, ease: "none" }, 0);

  // PROJECTS — shutter + image settle + stamped number, row-aware on mobile.
  const cards = select<HTMLElement>(".project-card");
  let rowTop = -1, rowIndex = 0;
  cards.forEach(card => {
    if (card.offsetTop !== rowTop) { rowTop = card.offsetTop; rowIndex = 0; }
    const sequence = gsap.timeline({ delay: rowIndex++ * 0.075, scrollTrigger: enter(card), defaults: { ease: "power4.out" } });
    sequence.from(card, { clipPath: "inset(100% 0 0 0)", y: 18, duration: 0.6 })
      .from(card.querySelector(".project-preview"), { scale: 1.08, duration: 0.72 }, 0)
      .from(card.querySelector(".project-number"), { scale: 0.2, y: -12, rotation: -8, duration: 0.32, ease: "back.out(1.5)" }, 0.25);
    const arrow = card.querySelector(".arrow-box svg");
    const arrowMotion = gsap.timeline({ paused: true })
      .to(arrow, { x: 15, y: -15, duration: 0.12, ease: "power2.in" })
      .set(arrow, { x: -15, y: 15 })
      .to(arrow, { x: 0, y: 0, duration: 0.2, ease: "power3.out" });
    listen(card, "pointerenter", () => arrowMotion.restart());
    listen(card, "focus", () => arrowMotion.restart());
  });

  // FEATURED — a horizontal aperture, not the card grid's vertical shutters.
  const featured = first(".featured");
  gsap.from(select(".featured-screen"), { clipPath: "inset(0 50% 0 50%)", duration: 0.8, ease: "power4.out", scrollTrigger: enter(featured) });
  lines(".featured-copy h2", featured);

  // ABOUT — pixel matrix locks together, then the narrative is typeset by line.
  const about = first(".about-panel");
  gsap.from(select(".avatar-pixel"), {
    scale: 0, x: i => (i % 3 - 1) * 12, y: i => i % 2 ? 10 : -10,
    transformOrigin: "center", stagger: { each: 0.055, from: "center" },
    duration: 0.3, ease: "back.out(1.4)", scrollTrigger: enter(about),
  });
  lines(".about-panel h2,.about-content p", about, 0.12);

  // SKILLS — title bar opens the app, body rises, segments initialize in order.
  const skills = first(".skills-panel");
  const appOpen = gsap.timeline({ scrollTrigger: enter(skills), defaults: { ease: "power3.out" } });
  appOpen.from(skills, { y: 24, duration: 0.5 }, 0)
    .from(skills.querySelector(".window-bar"), { scaleX: 0, transformOrigin: "left center", duration: 0.3 }, 0)
    .from(skills.querySelector(".skill-content"), { clipPath: "inset(0 0 100% 0)", y: 12, duration: 0.45 }, 0.16);
  let nextBar = 0.35;
  select(".skills-panel .skill").forEach(skill => {
    const segments = skill.querySelectorAll(".filled");
    appOpen.from(segments, { scaleX: 0, transformOrigin: "left center", duration: 0.1, stagger: 0.018 }, nextBar);
    nextBar += Math.max(0, segments.length - 1) * 0.018 + 0.15;
  });
  appOpen.from(skills.querySelectorAll(".window-controls svg"), { scale: 0, duration: 0.16, stagger: 0.065 }, ">-0.02");

  // STATS — only numerical values count. Text metrics remain truthful.
  const stats = first(".stats-panel");
  gsap.from(select(".stat-divider-horizontal"), { scaleX: 0, transformOrigin: "center", duration: 0.48, ease: "power3.out", scrollTrigger: enter(stats) });
  gsap.from(select(".stat-divider-vertical"), { scaleY: 0, transformOrigin: "center", duration: 0.48, ease: "power3.out", scrollTrigger: enter(stats) });
  select<HTMLElement>(".stats-grid [data-count]").forEach(number => {
    const final = number.dataset.count || "0";
    const counter = { value: 0 };
    const render = () => { number.textContent = String(counter.value).padStart(final.length, "0"); };
    render();
    gsap.to(counter, { value: Number(final), snap: { value: 1 }, duration: 0.85, ease: "power2.out", scrollTrigger: enter(stats), onUpdate: render });
    cleanup(() => { number.textContent = final; });
  });
  gsap.from(select(".stats-grid .stat-copy:not([data-count])"), { yPercent: 100, stagger: 0.075, duration: 0.4, ease: "power3.out", scrollTrigger: enter(stats) });

  // EXPERIENCE — scrubbing owns only the rail; entries/node stamps fire once.
  const timeline = first(".timeline");
  gsap.fromTo(select(".timeline-rail"), { scaleY: 0 }, { scaleY: 1, transformOrigin: "top", ease: "none", scrollTrigger: { trigger: timeline, start: "top 76%", end: "bottom 72%", scrub: 0.4 } });
  select(".timeline-item").forEach((entry, i) => {
    gsap.from(entry.querySelectorAll(".experience-copy,.tags"), { x: i % 2 ? 28 : -28, clipPath: i % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", duration: 0.58, stagger: 0.06, ease: "power4.out", scrollTrigger: enter(entry, "top 76%") });
    gsap.from(entry.querySelector(".checkpoint-fill"), { scale: 0, duration: 0.24, ease: "back.out(1.9)", scrollTrigger: enter(entry, "top 76%") });
  });

  // Continuous motion only runs while visible; no offscreen ticker work.
  const loops: { animation: gsap.core.Animation; visible: boolean; hovered: boolean }[] = [];
  const manageLoop = (animation: gsap.core.Animation, trigger: HTMLElement, hoverPause = false) => {
    const state = { animation, visible: false, hovered: false };
    loops.push(state);
    const sync = () => animation.paused(!state.visible || state.hovered || document.hidden);
    ScrollTrigger.create({ trigger, start: "top bottom", end: "bottom top", onToggle: self => { state.visible = self.isActive; sync(); }, onRefresh: self => { state.visible = self.isActive; sync(); } });
    if (hoverPause) {
      listen(trigger, "pointerenter", () => { state.hovered = true; sync(); });
      listen(trigger, "pointerleave", () => { state.hovered = false; sync(); });
    }
  };
  const marquee = first(".marquee");
  const belt = first(".marquee > div");
  const loop = gsap.to(belt, { xPercent: -50, duration: 45, repeat: -1, ease: "none", paused: true });
  manageLoop(loop, marquee, true);
  const rate = { value: 1 };
  const changeSpeed = gsap.quickTo(rate, "value", { duration: 0.45, ease: "power2.out", onUpdate: () => loop.timeScale(rate.value) });
  const settle = gsap.delayedCall(0.18, () => changeSpeed(1)).pause();
  ScrollTrigger.create({ trigger: marquee, start: "top bottom", end: "bottom top", onUpdate: self => { changeSpeed(marqueeSpeed(self.getVelocity())); settle.restart(true); } });
  select<HTMLElement>(".grid-signal-track").forEach(track => {
    const signal = track.querySelector(".grid-signal");
    const travel = gsap.timeline({ repeat: -1, repeatDelay: 5, paused: true })
      .fromTo(signal, { scale: 0 }, { scale: 1, duration: 0.12 })
      .fromTo(signal, { x: 0 }, { x: () => Math.max(0, track.clientWidth - 7), duration: 1.6, ease: "power2.inOut" })
      .to(signal, { scale: 0, duration: 0.12 });
    manageLoop(travel, track.parentElement!);
  });
  listen(document, "visibilitychange", () => loops.forEach(state => state.animation.paused(document.hidden || !state.visible || state.hovered)));

  // CERTIFICATIONS — fast row-by-row scan, including the current empty state.
  select(".education-row,.education-empty").forEach((row, i) => gsap.from(row, { clipPath: "inset(0 100% 0 0)", x: -12, delay: i * 0.065, duration: 0.45, ease: "power3.out", scrollTrigger: enter(row) }));

  // TERMINAL / CONTACT — terminal types in its own scoped hook.
  gsap.from(select(".terminal-panel .window-bar"), { clipPath: "inset(0 100% 0 0)", duration: 0.3, ease: "power3.out", scrollTrigger: enter(first(".terminal-panel")) });
  const contact = first(".contact-grid");
  gsap.from(select(".contact-panel"), { clipPath: "inset(0 100% 0 0)", duration: 0.65, ease: "power4.out", scrollTrigger: enter(contact) });
  gsap.from(select(".contact-art .geo-block"), { y: 20, x: i => i % 2 ? 12 : -12, scale: 0.94, opacity: 0, transformOrigin: "center", duration: 0.4, stagger: 0.055, ease: "power3.out", scrollTrigger: enter(contact) });
  gsap.from(select("footer .footer-logo"), { scaleY: 0, transformOrigin: "bottom", duration: 0.3, ease: "power3.out", scrollTrigger: enter(first("footer"), "top 98%") });

  // Mechanical index wheels roll through digits without changing their footprint.
  select<HTMLElement>(".section-index").forEach(index => {
    const original = index.textContent || "";
    const wheel = document.createElement("span");
    wheel.className = "index-wheel";
    wheel.setAttribute("aria-hidden", "true");
    ["00/", "01/", original].forEach(value => { const digit = document.createElement("span"); digit.textContent = value; wheel.appendChild(digit); });
    index.setAttribute("aria-label", original);
    index.textContent = "";
    index.appendChild(wheel);
    gsap.to(wheel, { yPercent: -200 / 3, duration: 0.45, ease: "steps(5)", scrollTrigger: enter(index) });
    cleanup(() => { index.textContent = original; index.removeAttribute("aria-label"); });
  });

  if (!finePointer) return;
  // Cache hit rectangles on entry; pointermove performs no layout measurement.
  const parallax = (hit: HTMLElement, targets: Element[], amount: number, depths?: number[]) => {
    let rect: DOMRect | null = null;
    let inside = false;
    const setters = targets.map(target => ({
      x: gsap.quickTo(target, "x", { duration: 0.4, ease: "power3.out" }),
      y: gsap.quickTo(target, "y", { duration: 0.4, ease: "power3.out" }),
    }));
    const reset = () => { if (!inside) return; inside = false; rect = null; setters.forEach(set => { set.x(0); set.y(0); }); };
    listen(hit, "pointerenter", () => { rect = hit.getBoundingClientRect(); inside = true; });
    listen(hit, "pointermove", event => {
      if (!inside || !rect) return;
      const pointer = event as PointerEvent;
      const offset = pointerOffset(pointer.clientX, pointer.clientY, rect, amount);
      setters.forEach((set, i) => { set.x(offset.x * (depths?.[i] ?? 1)); set.y(offset.y * (depths?.[i] ?? 1)); });
    });
    listen(hit, "pointerleave", reset);
    listen(window, "scroll", reset);
    listen(window, "resize", reset);
  };
  parallax(first(".hero-art"), select(".hero .geo-parallax"), 6, [0.5,0.4,0.6,0.9,0.7,1,1.4,1.2,1.5]);
  cards.forEach(card => parallax(card, Array.from(card.querySelectorAll(".project-image-motion")), 4));
  select<HTMLElement>(".button.blue,.button.black,.connect").forEach(button => parallax(button, Array.from(button.querySelectorAll(".magnetic-content")), 5));
}

export default function usePortfolioMotion(ref: RefObject<HTMLElement | null>) {
  useMotionScope(ref, setupPortfolio);
}
