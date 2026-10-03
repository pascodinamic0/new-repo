import type { Metadata, Viewport } from "next"
import { Newsreader } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import { LocaleProvider } from "@/components/locale"
import { Shell } from "@/components/Shell"

const verse = Newsreader({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-verse", display: "swap" })

export const metadata: Metadata = {
  title: "MTUSDA",
  description: "Bible, cantiques, leçons et communauté de l'église adventiste MTUSDA à Kinshasa.",
  applicationName: "MTUSDA",
  appleWebApp: { capable: true, title: "MTUSDA", statusBarStyle: "black-translucent" },
  // iOS still keys off this name. Next only emits mobile-web-app-capable.
  other: { "apple-mobile-web-app-capable": "yes" },
  icons: { icon: "/icon-192.png", apple: "/apple-touch-icon.png" },
}

export const viewport: Viewport = {
  themeColor: "#102848",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies()
  const locale = jar.get("mtusda_locale")?.value === "en" ? "en" : "fr"
  return (
    <html lang={locale} className={`${verse.variable}`}>
      <body>
        <LocaleProvider initial={locale}>
          <Shell>{children}</Shell>
        </LocaleProvider>
      </body>
    </html>
  )
}
