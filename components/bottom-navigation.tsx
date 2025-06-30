"use client"

import { Home, Upload, BarChart2, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  // Don't show navigation on admin page
  if (pathname === "/admin") {
    return null
  }

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Submit",
      href: "/submit",
      icon: Upload,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: BarChart2,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-md mx-auto">
        {/* Glassmorphism navigation with enhanced styling */}
        <nav className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-white/20 dark:border-slate-700/50 h-20 px-4 shadow-2xl">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent dark:from-blue-950/50 pointer-events-none"></div>

          {/* Navigation items */}
          <div className="relative flex items-center justify-around h-full">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center w-full h-full relative transition-all duration-300 group",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-300",
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  )}

                  {/* Icon with enhanced effects */}
                  <div
                    className={cn(
                      "relative p-2 rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-blue-100 dark:bg-blue-900/50 scale-110 shadow-lg"
                        : "group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50 group-hover:scale-105",
                    )}
                  >
                    <item.icon
                      className={cn("h-5 w-5 transition-all duration-300", isActive && "animate-bounce-subtle")}
                    />

                    {/* Glow effect for active item */}
                    {isActive && (
                      <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-md animate-pulse"></div>
                    )}
                  </div>

                  <span
                    className={cn("text-xs mt-1 font-medium transition-all duration-300", isActive && "font-semibold")}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
