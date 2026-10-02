import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Church App",description:"Bible, hymns, lessons and church community",manifest:"/manifest.webmanifest"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}