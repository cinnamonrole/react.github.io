import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import BottomNavigation from "@/components/bottom-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Million Meters Challenge",
  description: "Track your progress in the Million Meters Rowing Challenge",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen max-w-md mx-auto relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 -z-10"></div>

            <main className="flex-1 pb-20 relative z-10">{children}</main>
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
