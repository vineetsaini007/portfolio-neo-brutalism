export const profile = {name:'Vineet Saini',role:'Full Stack Developer',location:'India',email:'',github:'',linkedin:'',cv:'',about:"I'm Vineet, a full-stack developer who enjoys turning complex ideas into scalable digital products. I work with JavaScript, TypeScript, React, Next.js and Node.js, with a particular interest in real-time and data-driven applications."};
export const projects = [
{id:'01',name:'PAYZO',type:'FINTECH / FULL STACK',description:'A simpler way to move money.',detail:'A digital wallet concept with account authentication, balance management and peer-to-peer transfers. Built around a clear, focused transaction experience.',tags:['React','Node.js','MongoDB','JWT'],kind:'wallet',live:'',source:''},
{id:'02',name:'CODESYNCX',type:'DEVELOPER TOOLS / REAL TIME',description:'Different places. One workspace.',detail:'A collaborative code editor concept for shared development sessions, with live editing, room-based collaboration and connected presence.',tags:['React','Socket.io','CodeMirror'],kind:'editor',live:'',source:''},
{id:'03',name:'CRYPTORADAR',type:'DATA / MARKET ANALYTICS',description:'Market noise, made clear.',detail:'A cryptocurrency analytics concept bringing market trends, asset discovery and price data into one readable interface.',tags:['React','CoinGecko','Tailwind'],kind:'crypto',live:'',source:''},
{id:'04',name:'TMS',type:'OPERATIONS / WEB PLATFORM',description:'Complex logistics. Clear control.',detail:'A transport management platform concept for organizing fleet operations, trip information and reporting in one workspace.',tags:['Next.js','TypeScript','PostgreSQL'],kind:'transport',live:'',source:''}
];
export type Project = typeof projects[number];
export const skills=[{name:'FRONTEND',tools:'React · Next.js · TypeScript · JavaScript · Tailwind CSS',segments:12},{name:'BACKEND',tools:'Node.js · Express · MongoDB · PostgreSQL',segments:10},{name:'TOOLS',tools:'Git · GitHub · Postman · Docker · Vercel',segments:11},{name:'EXPLORING',tools:'System design · WebSockets · AI integration',segments:8}];
// Add verified employment, qualifications, URLs and a real CV here before sharing publicly.
export const experience: {year:string;role:string;company:string;description:string;tags:string[]}[]=[];
export const education: {year:string;title:string;organization:string;url:string}[]=[];
