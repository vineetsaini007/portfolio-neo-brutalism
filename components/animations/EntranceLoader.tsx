"use client";
import {useLayoutEffect,useRef} from 'react';
import gsap from 'gsap';
export default function EntranceLoader({onComplete}:{onComplete:()=>void}){
 const ref=useRef<HTMLDivElement>(null);
 const skip=useRef<HTMLButtonElement>(null);
 useLayoutEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){onComplete();return}
  const previous=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';skip.current?.focus({preventScroll:true});
  const escape=(e:KeyboardEvent)=>{if(e.key==='Escape')onComplete()};
  window.addEventListener('keydown',escape);
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const preference=()=>{if(media.matches)onComplete()};media.addEventListener('change',preference);
  const ctx=gsap.context(()=>{
   gsap.timeline({onComplete})
    .from('.loader-mark',{scale:0.7,rotation:-8,duration:.3,ease:'power4.out'})
    .from('.loader-title span',{yPercent:105,stagger:.065,duration:.35,ease:'power4.out'},.08)
    .from('.loader-segments i',{scaleX:0,transformOrigin:'left',stagger:.045,duration:.12,ease:'steps(2)'},.25)
    .to(ref.current,{clipPath:'inset(0 0 100% 0)',duration:.4,ease:'power4.inOut'},1.05);
  },ref);
  return()=>{ctx.revert();window.removeEventListener('keydown',escape);media.removeEventListener('change',preference);document.body.style.overflow=overflow;if(previous?.isConnected)previous.focus({preventScroll:true})};
 },[onComplete]);
 return <div className="entrance-loader" ref={ref} role="dialog" aria-modal="true" aria-label="Opening Vineet Saini’s portfolio"><div className="loader-window"><div className="loader-bar mono"><span>PORTFOLIO.EXE</span><span aria-hidden="true">— □ ×</span></div><div className="loader-content"><div className="loader-mark" aria-hidden="true">VS<span>/</span></div><p className="mono">VINEET SAINI / FULL STACK DEVELOPER</p><h2 className="loader-title"><span>GOOD CODE.</span><span>GREAT EXPERIENCES<span className="loader-dot">_</span></span></h2><div className="loader-segments" aria-hidden="true">{Array.from({length:16},(_,i)=><i key={i}/>)}</div><div className="loader-footer mono"><span>INITIALIZING INTERFACE</span><button ref={skip} onClick={onComplete}>SKIP INTRO ↗</button></div></div></div></div>;
}
