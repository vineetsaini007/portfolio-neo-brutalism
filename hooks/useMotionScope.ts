"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export type MotionScope = {
  root: HTMLElement;
  select: <T extends Element = HTMLElement>(selector: string) => T[];
  reduced: boolean;
  finePointer: boolean;
  cleanup: (dispose: () => void) => void;
};

/** Every animation, trigger, media listener and DOM listener belongs to one scope. */
export function useMotionScope<T extends HTMLElement>(
  ref: RefObject<T | null>,
  setup: (scope: MotionScope) => void,
  enabled = true,
) {
  useLayoutEffect(() => {
    if (!ref.current || !enabled) return;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const root = ref.current;
    const media = gsap.matchMedia();
    media.add({
      reduced: "(prefers-reduced-motion: reduce)",
      finePointer: "(hover: hover) and (pointer: fine)",
      all: "(min-width: 0px)",
    }, context => {
      const disposers: (() => void)[] = [];
      setup({
        root,
        select: <E extends Element = HTMLElement>(selector: string) => Array.from(root.querySelectorAll<E>(selector)),
        reduced: !!context.conditions?.reduced,
        finePointer: !!context.conditions?.finePointer,
        cleanup: dispose => disposers.push(dispose),
      });
      // Fonts can change trigger positions. SplitText also reflows its line masks.
      let disposed = false;
      document.fonts?.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
      return () => {
        disposed = true;
        disposers.reverse().forEach(dispose => dispose());
      };
    }, root);
    return () => media.revert();
  }, [ref, setup, enabled]);
}

export { gsap, ScrollTrigger, SplitText };
