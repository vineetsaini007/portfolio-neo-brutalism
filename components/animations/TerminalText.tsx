"use client";

import { useRef } from "react";
import { useMotionScope, gsap, ScrollTrigger, type MotionScope } from "@/hooks/useMotionScope";
import { profile } from "@/data/portfolio";

const transcript = [
  ["whoami", profile.name],
  ["role", profile.role],
  ["stack", "MERN / Next.js / TypeScript"],
  ["location", profile.location],
  ["status", "Available for opportunities"],
].map(([command, answer]) => `$ ${command}\n> ${answer}`).join("\n");

function typeTerminal({ select, root, reduced, cleanup }: MotionScope) {
  const lines = select<HTMLElement>(".typed-line");
  if (reduced) {
    lines.forEach(line => { line.textContent = line.dataset.text || ""; });
    return;
  }
  lines.forEach(line => { line.textContent = ""; });
  cleanup(() => lines.forEach(line => { line.textContent = line.dataset.text || ""; }));
  const sequence = gsap.timeline({ paused: true });
  lines.forEach(line => {
    const text = line.dataset.text || "";
    const state = { length: 0 };
    sequence.to(state, {
      length: text.length,
      duration: Math.max(0.15, text.length * (line.classList.contains("command") ? 0.032 : 0.015)),
      ease: "none",
      snap: { length: 1 },
      onUpdate: () => { line.textContent = text.slice(0, state.length); },
    }, "+=0.1");
  });
  ScrollTrigger.create({ trigger: root, start: "top 82%", once: true, onEnter: () => sequence.play() });
}

export default function TerminalText() {
  const ref = useRef<HTMLPreElement>(null);
  useMotionScope(ref, typeTerminal);
  return <><pre ref={ref} aria-hidden="true">{transcript.split("\n").map((text, i) =>
    <span key={i}><span className={`typed-line ${text.startsWith("$") ? "command" : ""}`} data-text={text}>{text}</span>{"\n"}</span>
  )}<span className="terminal-caret">▌</span></pre><span className="sr-only">{transcript}</span></>;
}
