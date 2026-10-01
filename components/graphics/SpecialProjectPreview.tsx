function PortfolioPreview() {
  return <><div className="mock-heading">Selected work / 07 projects</div><div className="transport-stats"><div><strong>07</strong>CASE STUDIES</div><div><strong>100%</strong>RESPONSIVE</div><div><strong>LIVE</strong>DEPLOYED</div></div><div className="mock-label">PROJECT INDEX</div>{['FlowPilot','Sage & Stone','Noura','PulseBoard'].map((name,index)=><div className="mock-row" key={name}><i>{String(index+1).padStart(2,'0')}</i><span>{name}<small>Design · develop · deploy</small></span></div>)}</>;
}

function FlowPilotPreview() {
  return <><div className="mock-heading">Good morning, Maya.</div><div className="mock-label">TODAY / FOCUSED PLAN</div>{[['09:00','Product strategy review'],['11:30','Protected focus block'],['14:00','Team planning'],['16:15','Weekly wrap-up']].map(([time,task],index)=><div className="mock-row" key={task}><i>{index===1?'●':'○'}</i><span>{task}<small>{time} · {index===1?'In progress':'Planned'}</small></span></div>)}<div className="editor-status"><span>82% focus protected</span><span>AI plan ready</span></div></>;
}

function LaunchCraftPreview() {
  return <><div className="mock-heading">Build a launch people remember.</div><div className="mock-label">LIVE COHORT / FOUR-WEEK COURSE</div>{['Position the promise','Shape the offer','Build the campaign','Launch with confidence'].map((title,index)=><div className="mock-row" key={title}><i>W{index+1}</i><span>{title}<small>{index===0?'Start here':'Workshop · practice · ship'}</small></span></div>)}<div className="editor-status"><span>Enrollment open</span><span>Live October 12</span></div></>;
}

const previews:Record<string,()=>React.ReactNode>={portfolio:PortfolioPreview,flowpilot:FlowPilotPreview,launchcraft:LaunchCraftPreview};

export function SpecialProjectPreview({kind}:{kind:string}){const Preview=previews[kind];return Preview?<Preview/>:null;}
export function hasSpecialPreview(kind:string){return kind in previews;}
