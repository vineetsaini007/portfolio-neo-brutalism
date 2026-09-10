import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Vineet Saini — Full Stack Developer",description:"Thoughtful code. Purposeful design. Explore Vineet Saini’s full-stack projects and digital experiments.",icons:{icon:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
