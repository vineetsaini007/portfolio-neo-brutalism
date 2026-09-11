"use client";
import {useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import type {ReactNode} from 'react';

export default function ProjectRail({children}:{children:ReactNode}){
 const rail=useRef<HTMLDivElement>(null);
 const [edges,setEdges]=useState({start:true,end:false});
 useEffect(()=>{
  const el=rail.current;if(!el)return;
  const update=()=>setEdges({start:el.scrollLeft<=2,end:el.scrollLeft+el.clientWidth>=el.scrollWidth-2});
  const observer=new ResizeObserver(update);observer.observe(el);Array.from(el.children).forEach(child=>observer.observe(child));
  el.addEventListener('scroll',update,{passive:true});update();
  return()=>{observer.disconnect();el.removeEventListener('scroll',update)};
 },[]);
 const move=(direction:number)=>{const el=rail.current;if(!el)return;const card=el.firstElementChild as HTMLElement|null;el.scrollBy({left:direction*((card?.offsetWidth||260)+14),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})};
 return <div className="project-rail-shell"><div ref={rail} id="project-rail" className="project-grid" tabIndex={0} role="region" aria-label="Selected projects, scroll horizontally" onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}}}>{children}</div><div className="project-rail-controls"><span className="mono">SCROLL TO EXPLORE <span aria-hidden="true">↔</span></span><div><button aria-label="Previous projects" aria-controls="project-rail" disabled={edges.start} onClick={()=>move(-1)}><ArrowLeft size={17}/></button><button aria-label="Next projects" aria-controls="project-rail" disabled={edges.end} onClick={()=>move(1)}><ArrowRight size={17}/></button></div></div></div>;
}
