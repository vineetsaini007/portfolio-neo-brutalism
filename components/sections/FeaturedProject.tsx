"use client";

import {useEffect,useRef,useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {projects,featuredCopy,type Project} from '@/data/portfolio';
import ProjectPreview from '@/components/graphics/ProjectPreview';

function getFeaturedCopy(project:Project){
 return featuredCopy[project.id] ?? {heading:[project.name,'IN FOCUS.'],description:project.description,caption:project.type,label:'PROJECT_SHOWCASE',tags:project.tags.slice(0,2)};
}

export default function FeaturedProject({onSelect}:{onSelect:(project:Project)=>void}) {
  // Retain CodeSyncX as the initial featured project.
  const [index,setIndex]=useState(1);
  const [paused,setPaused]=useState(false);
  const [hovered,setHovered]=useState(false);
  const [focused,setFocused]=useState(false);
  const [visible,setVisible]=useState(true);
  const [reduced,setReduced]=useState(false);
  const root=useRef<HTMLElement>(null);
  const project=projects[index];
  const copy=getFeaturedCopy(project);

  useEffect(()=>{
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const preference=()=>{setReduced(media.matches);setPaused(media.matches)};
    const visibility=()=>setVisible(!document.hidden);
    preference();visibility();
    media.addEventListener('change',preference);
    document.addEventListener('visibilitychange',visibility);
    return()=>{media.removeEventListener('change',preference);document.removeEventListener('visibilitychange',visibility)};
  },[]);
  useEffect(()=>{
    if(paused||hovered||focused||!visible)return;
    const timer=window.setInterval(()=>setIndex(current=>(current+1)%projects.length),5000);
    return()=>window.clearInterval(timer);
  },[paused,hovered,focused,visible]);

  return <section ref={root} className="featured reveal" aria-roledescription="carousel" aria-label="Featured projects"
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
    onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setFocused(false)}}>
    <div className="featured-visual">
      <div className="featured-label mono"><button className="featured-playback" onClick={()=>setPaused(value=>!value)} aria-pressed={paused} aria-label={paused?'Play featured projects, changing every five seconds':'Pause featured project rotation'} title={paused?'Resume rotation':'Pause rotation'}>FEATURED_PROJECT <span aria-hidden="true">{paused?'▶':'Ⅱ'}</span></button><span>{copy.label} / 2026</span></div>
      <div className="featured-screen featured-stack">{projects.map((item,i)=><div key={item.id} className="featured-slide" data-active={i===index} aria-hidden={i!==index} inert={i!==index}><ProjectPreview kind={item.kind} large/></div>)}</div>
      <span className="featured-coordinate mono">[ {copy.caption} ]</span>
    </div>
    <div className="featured-copy"><div className="featured-stack" aria-live={paused&&!reduced?'polite':'off'}>{projects.map((item,i)=>{
      const content=getFeaturedCopy(item);
      return <div key={item.id} className="featured-slide featured-copy-slide" data-active={i===index} aria-hidden={i!==index} inert={i!==index} role="group" aria-roledescription="slide" aria-label={`${i+1} of ${projects.length}: ${item.name}`}>
        <span className="eyebrow">IN FOCUS / {item.id}</span>
        <h2>{content.heading[0]}<br/><em>{content.heading[1]}</em></h2>
        <p>{content.description}</p>
        <div className="tags">{content.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        <button className="button blue" onClick={()=>onSelect(item)}><span className="magnetic-content">EXPLORE {item.name} <ArrowUpRight/></span></button>
      </div>;
    })}</div></div>
  </section>;
}
