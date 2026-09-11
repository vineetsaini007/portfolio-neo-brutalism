"use client";
import { useRef } from "react";
import { useMotionScope, type MotionScope } from "@/hooks/useMotionScope";
function cursorMotion({root, reduced, finePointer, cleanup}:MotionScope) {
  if(reduced || !finePointer) return;
  let frame=0,x=0,y=0;
  let interactive=false;
  const move=(e:PointerEvent)=>{
    x=e.clientX; y=e.clientY;
    interactive=!!(e.target as Element|null)?.closest?.("a,button");
    if(!frame)frame=requestAnimationFrame(()=>{
      root.style.transform=`translate3d(${x+14}px,${y+14}px,0)`;
      root.style.opacity="1";
      root.textContent=interactive?"OPEN":"";
      root.classList.toggle("expanded",interactive);
      frame=0;
    });
  };
  const hide=()=>{root.style.opacity="0";};
  document.addEventListener("pointermove",move,{passive:true});
  document.addEventListener("pointerleave",hide);
  window.addEventListener("blur",hide);
  cleanup(()=>{
    document.removeEventListener("pointermove",move);
    document.removeEventListener("pointerleave",hide);
    window.removeEventListener("blur",hide);
    cancelAnimationFrame(frame);
    root.removeAttribute("style");root.classList.remove("expanded");root.textContent="";
  });
}
export default function Cursor(){const ref=useRef<HTMLDivElement>(null);useMotionScope(ref,cursorMotion);return <div className="cursor-accent" ref={ref} aria-hidden="true"/>}
