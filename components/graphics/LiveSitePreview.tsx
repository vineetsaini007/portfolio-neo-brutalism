import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import styles from './ProjectPreview.module.css';

const siteCaptures:Record<string,{src:string;alt:string}>={
  portfolio:{src:'/project-thumbnails/dev-portfolio.png',alt:'Developer portfolio homepage with oversized introduction and illustrated portrait'},
  flowpilot:{src:'/project-thumbnails/flowpilot.png',alt:'FlowPilot AI productivity landing page with dark interface and lime typography'},
  launchcraft:{src:'/project-thumbnails/launchcraft.png',alt:'LaunchCraft course landing page with bold blue, orange and yellow campaign design'},
};

export function hasLiveSitePreview(kind:string){return kind in siteCaptures;}

export function LiveSitePreview({kind,large=false}:{kind:string;large?:boolean}){
  const capture=siteCaptures[kind];
  if(!capture)return null;

  return <div className={`project-preview ${styles.capture} ${kind} ${large?'large':''}`}>
    <Image className={styles.image} src={capture.src} alt={capture.alt} width={1440} height={1000} sizes={large?'(max-width: 600px) 100vw, 68vw':'(max-width: 600px) 78vw, 310px'} priority={large}/>
    <div className={`preview-caption ${styles.caption}`}>LIVE SITE CAPTURE <ArrowUpRight size={10}/></div>
  </div>;
}
