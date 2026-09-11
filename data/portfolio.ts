export const profile = {
  name: 'Vineet Saini',
  role: 'Full Stack Developer',
  location: 'New Delhi, India',
  email: 'vineet31saini@gmail.com',
  phone: '+91-8595947790',
  phoneHref: 'tel:+918595947790',
  github: 'https://github.com/vineetsaini007',
  linkedin: 'https://www.linkedin.com/in/vineet-saini1111',
  cv: '/resume_vineet_saini.pdf',
  about: "I'm Vineet, a full-stack developer based in New Delhi with 1+ year of experience building production React and Node.js applications. I work with TypeScript, MongoDB, PostgreSQL, REST APIs and cloud deployment, taking products from requirements to release.",
};
export const projects = [
  {id:'01',name:'PAYZO',type:'FINTECH / FULL STACK',description:'A simpler way to move money.',detail:'A peer-to-peer payments platform with MongoDB session-based atomic debit-credit operations to prevent partial transfers. Financial endpoints use JWT authentication, short-lived access tokens, role-based access control and Zod validation across 8+ API routes.',tags:['React','Node.js','MongoDB','JWT'],kind:'wallet',live:'https://payzozo.netlify.app/signup',source:'https://github.com/vineetsaini007/payzo'},
  {id:'02',name:'CODESYNCX',type:'DEVELOPER TOOLS / REAL TIME',description:'Different places. One workspace.',detail:'A real-time collaborative code editor using Socket.IO event-based delta synchronization for conflict-aware rooms and sub-100ms latency across 5+ simultaneous editors. CodeMirror provides syntax highlighting, auto-bracket closing and live JavaScript execution previews, with support for 10+ languages. Deployed on Netlify and Render.',tags:['React','Socket.io','CodeMirror'],kind:'editor',live:'https://codesyncx.netlify.app',source:'https://github.com/vineetsaini007/codesyncx'},
  {id:'03',name:'CRYPTORADAR',type:'DATA / MARKET ANALYTICS',description:'Market noise, made clear.',detail:'A cryptocurrency analytics dashboard with a Context API caching layer that batches CoinGecko responses and reduces API calls by 40%. Supports USD, INR and EUR conversion with Google Charts, updating price-trend visualizations on currency changes without fetching the same data again.',tags:['React','CoinGecko','Context API','Google Charts'],kind:'crypto',live:'https://cryyptoradar.netlify.app/',source:'https://github.com/vineetsaini007/cryptoradar'},
  // Retained from the original brief; this concept is not listed in the résumé.
  {id:'04',name:'TMS',type:'OPERATIONS / WEB PLATFORM',description:'Complex logistics. Clear control.',detail:'A transport management platform concept for organizing fleet operations, trip information and reporting in one workspace.',tags:['Next.js','TypeScript','PostgreSQL'],kind:'transport',live:'',source:''},
];
export type Project = typeof projects[number];
// Segments are decorative indicators, not skill ratings.
export const skills = [
  {name:'FRONTEND',tools:'React.js · Next.js · HTML5 · CSS3 · Tailwind CSS · WordPress · CodeMirror',segments:12},
  {name:'BACKEND & DATA',tools:'Node.js · Express.js · REST APIs · Socket.IO · WebSockets · JWT · MongoDB · PostgreSQL · MySQL · Mongoose · Prisma · Supabase',segments:10},
  {name:'TOOLS & CLOUD',tools:'Git · GitHub · Postman · Docker · AWS · Vercel · Netlify · Render · GitHub Actions · VS Code',segments:11},
  {name:'LANGUAGES',tools:'JavaScript (ES6+) · TypeScript · Java · Python · C++',segments:8},
];
export const experience: {year:string;role:string;company:string;description:string;tags:string[]}[] = [
  {year:'JAN 2026 — PRESENT',role:'FULL STACK DEVELOPER',company:'Freelancing · Remote',description:'Delivered 5 client websites with React.js and WordPress, averaging a two-week turnaround from requirements to deployment. Built 15+ responsive pages across 3+ industries. Managed 5 concurrent client accounts with 100% on-time delivery and repeat engagement from 3 clients.',tags:['React.js','WordPress','Deployment']},
  {year:'JUL 2025 — DEC 2025',role:'FULL STACK DEVELOPER INTERN',company:'Milenium Erectors Pvt. Ltd. · New Delhi',description:'Delivered a full-stack application from requirement analysis to production. Built 8+ reusable React components adopted across 2 product teams, reducing implementation handoff from 3 days to under 1 day. Debugged 10+ REST API endpoints and fixed input validation issues, reducing failures from 30% to near zero within one sprint.',tags:['React.js','REST APIs','Postman','Jira']},
];
export const education: {year:string;title:string;organization:string;url:string}[] = [
  {year:'2022 — 2026',title:'B.Tech, Computer Science & Engineering',organization:'Guru Gobind Singh Indraprastha University · New Delhi',url:''},
  {year:'CERTIFICATION',title:'Software Engineer Role Certification',organization:'HackerRank',url:''},
  {year:'CERTIFICATION',title:'REST API Fundamentals',organization:'Postman Student Expert',url:''},
];
export const featuredCopy: Record<string, {heading: [string,string]; description: string; caption: string; label: string; tags: string[]}> = {
  '01': {heading:['MOVE MONEY.','SECURELY.'],description:'Payzo brings secure transfers and atomic transactions into a focused peer-to-peer payments experience.',caption:'PAYMENTS WITHOUT THE FRICTION',label:'PAYMENTS_SYSTEM',tags:['Atomic transfers','JWT authentication']},
  '02': {heading:['BUILD BETTER.','TOGETHER.'],description:'CodeSyncX brings developers into one shared workspace. Built around the idea that great code is a team sport.',caption:'COLLABORATION WITHOUT BOUNDARIES',label:'REALTIME_SYSTEM',tags:['WebSockets','Real-time sync']},
  '03': {heading:['MARKET NOISE.','MADE CLEAR.'],description:'CryptoRadar brings live market data, currency conversion and price trends into one readable dashboard.',caption:'A CLEARER VIEW OF THE MARKET',label:'ANALYTICS_SYSTEM',tags:['Live market data','Multi-currency']},
  '04': {heading:['COMPLEX ROUTES.','CLEAR CONTROL.'],description:'TMS is a platform concept for bringing fleet operations, trip information and reporting into one workspace.',caption:'OPERATIONS IN ONE WORKSPACE',label:'TRANSPORT_CONCEPT',tags:['Fleet operations','Trip management']},
};
