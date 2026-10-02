import {ArrowUpRight} from 'lucide-react';
import {hasLiveSitePreview,LiveSitePreview} from './LiveSitePreview';

function LearningPreview(){return <><div className="mock-heading">Your next chapter starts here.</div><div className="mock-label">JAVASCRIPT / FOUR-WEEK PATH</div>{['Find your foundations','Think in functions','Bring the page to life','Build something real'].map((title,index)=><div className="mock-row" key={title}><i>{String(index+1).padStart(2,'0')}</i><span>{title}<small>{index===0?'Start here':'Learn · practice · build'}</small></span></div>)}<div className="editor-status"><span>15 curated resources</span><span>AI assisted</span></div></>}

function WalletPreview(){return <><div className="mock-heading">Your money. In motion.</div><div className="wallet-balance"><span>TOTAL BALANCE</span><strong>₹24,580<span>.00</span></strong><div>↗ Send money <span>+ Add funds</span></div></div><div className="mock-label">RECENT ACTIVITY</div>{['Payment received','Monthly subscription','Money transferred'].map((item,index)=><div className="mock-row" key={item}><i>{index===0?'↙':'↗'}</i><span>{item}<small>Today · Completed</small></span><b>{['+ ₹5,000','− ₹499','− ₹1,200'][index]}</b></div>)}</>}

function EditorPreview(){const lines=['import { useState } from "react";','','export default function App() {','  const [ideas, build] = useState([]);','','  return (','    <Workspace room="together">','      <Editor language="typescript" />','      <Presence users={team} />','    </Workspace>','  );','}'];return <><div className="editor-tabs"><span>workspace /</span> App.tsx <i>● ● ●</i></div><div className="code-lines">{lines.map((line,index)=><div key={index}><span>{index+1}</span><code>{line||' '}</code></div>)}</div><div className="editor-status"><span>● Connected</span><span>TypeScript · UTF-8</span></div></>}

function CryptoPreview(){return <><div className="mock-heading">Market overview <span>↗</span></div><div className="coin-stats"><div>MARKET CAP<strong>$2.41T</strong><small>↗ 3.24%</small></div><div>24H VOLUME<strong>$86.2B</strong><small>↗ 5.18%</small></div></div><svg viewBox="0 0 280 85" className="chart" aria-hidden="true"><path d="M0 70H280M0 40H280M0 10H280" stroke="#333"/><path d="M0 70l15-5 15 8 15-24 15 7 15-12 15 9 15-28 15 12 15-8 15 13 15-27 15 8 15-12 15 5 15-15 15 10 15-17 25 8" stroke="#caff35" strokeWidth="2" fill="none"/></svg>{['Bitcoin','Ethereum'].map((item,index)=><div className="mock-row" key={item}><i>{index?'Ξ':'₿'}</i><span>{item}</span><b>{index?'$3,420':'$67,281'}</b></div>)}</>}

function TransportPreview(){return <><div className="mock-heading">Operations overview</div><div className="transport-stats"><div><strong>24</strong>ACTIVE TRIPS</div><div><strong>86</strong>VEHICLES</div><div><strong>98%</strong>ON TIME</div></div><div className="mock-label">ONGOING TRIPS</div>{['TRP—2048','TRP—2049','TRP—2050','TRP—2051'].map((trip,index)=><div className="mock-row" key={trip}><span>{trip}</span><span>{['Delhi → Jaipur','Mumbai → Pune','Delhi → Agra','Pune → Nashik'][index]}</span><small>IN TRANSIT</small></div>)}</>}

function PreviewBody({kind}:{kind:string}){if(kind==='learning')return <LearningPreview/>;if(kind==='wallet')return <WalletPreview/>;if(kind==='editor')return <EditorPreview/>;if(kind==='crypto')return <CryptoPreview/>;return <TransportPreview/>}

const logos:Record<string,string>={wallet:'p/ payzo',editor:'⌘ codesyncx',crypto:'◈ cryptoradar',learning:'↗ devpath',transport:'▤ transport / os',portfolio:'VS/ selected work',flowpilot:'⚡ flowpilot',launchcraft:'↗ launchcraft'};

export default function ProjectPreview({kind,large=false}:{kind:string;large?:boolean}){
  if(hasLiveSitePreview(kind))return <LiveSitePreview kind={kind} large={large}/>;

  return <div className={`project-preview ${kind} ${large?'large':''}`} aria-label="Illustrative project interface, not a live application"><div className="mock-top"><span className="mock-logo">{logos[kind]??'▤ project'}</span><span>•••</span></div><div className="mock-body"><div className="mock-sidebar"><span className="selected">◫</span><span>◈</span><span>▤</span><span>⚙</span></div><div className="mock-content"><PreviewBody kind={kind}/></div></div><div className="preview-caption">INTERFACE CONCEPT <ArrowUpRight size={10}/></div></div>;
}
