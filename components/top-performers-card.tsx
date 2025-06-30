"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { Calendar, Zap, Star, Crown } from "lucide-react"

export default function TopPerformersCard() {
  const { leaderboardData } = useLeaderboardData()

  if (!leaderboardData) {
    return <div>Loading top performers...</div>
  }

  // Mock data for weekly and daily - in real app this would come from API
  const weeklyTop = leaderboardData[1] // Sam Williams
  const overallTop = leaderboardData[0] // Alex Johnson
  const dailyTop = leaderboardData[2] // Jordan Smith

  const performers = [
    {
      title: "Weekly Champion",
      icon: Calendar,
      user: weeklyTop,
      meters: 45000, // Mock weekly meters
      iconColor: "text-emerald-600",
      bgGradient: "from-emerald-500/10 to-green-500/10",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      title: "Overall Leader",
      icon: Crown,
      user: overallTop,
      meters: overallTop.totalMeters,
      iconColor: "text-yellow-600",
      bgGradient: "from-yellow-500/10 to-orange-500/10",
      borderColor: "border-yellow-200 dark:border-yellow-800",
    },
    {
      title: "Daily Beast",
      icon: Zap,
      user: dailyTop,
      meters: 12000, // Mock daily meters
      iconColor: "text-purple-600",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
  ]

  return (
    <Card className="mb-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-0 shadow-xl">
      <CardContent className="p-6">
        {/* Header with sparkle effect */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Top Performers
            </h3>
            <Star className="h-5 w-5 text-yellow-500 animate-pulse delay-500" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {performers.map((performer, index) => (
            <div key={index} className="text-center group">
              {/* Enhanced card with glassmorphism */}
              <div
                className={`
                relative p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 
                bg-gradient-to-br ${performer.bgGradient} ${performer.borderColor}
                group-hover:scale-105 group-hover:shadow-2xl
                before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300
              `}
              >
                {/* Floating icon */}
                <div className="flex items-center justify-center mb-3">
                  <div
                    className={`
                    p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm
                    group-hover:animate-float transition-all duration-300
                  `}
                  >
                    <performer.icon className={`h-4 w-4 ${performer.iconColor}`} />
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Avatar with enhanced styling */}
                  <div className="relative mx-auto w-fit">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                    <Avatar className="h-12 w-12 relative border-2 border-white/50 shadow-lg">
                      <AvatarImage src={performer.user.profileImage || "/placeholder.svg"} alt={performer.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800 text-xs font-bold">
                        {performer.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Enhanced text */}
                  <div>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1 tracking-wide uppercase">
                      {performer.title}
                    </p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 truncate">
                      {performer.user.name}
                    </p>
                    <div className="relative">
                      <p className="text-sm font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {new Intl.NumberFormat().format(performer.meters)}m
                      </p>
                      {/* Subtle glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>

                {/* Rank indicator for overall leader */}
                {index === 1 && (
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <span className="text-xs font-bold text-white">1</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
