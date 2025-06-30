"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Flame,
  Target,
  Calendar,
  Sunrise,
  Zap,
  Star,
  Crown,
  Shield,
  Gem,
  Medal,
  Dumbbell,
  Fish,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Custom SVG Icon Components - Made slightly bigger
const JustDoTrackBruhIcon = ({ className }: { className?: string }) => (
  <img src="/icons/just-do-track-bruh.svg" alt="Just Do Track Bruh" className={cn(className, "w-6 h-6")} />
)

const FreshLegsIcon = ({ className }: { className?: string }) => (
  <img src="/icons/fresh-legs.svg" alt="Fresh Legs" className={cn(className, "w-6 h-6")} />
)

const LendAHandIcon = ({ className }: { className?: string }) => (
  <img src="/icons/lend-a-hand.svg" alt="Lend A Hand" className={cn(className, "w-6 h-6")} />
)

const TriIcon = ({ className }: { className?: string }) => (
  <img src="/icons/tri.svg" alt="Tri" className={cn(className, "w-6 h-6")} />
)

const ErgMasterIcon = ({ className }: { className?: string }) => (
  <img src="/icons/erg-master.svg" alt="Erg Master" className={cn(className, "w-6 h-6")} />
)

// Zigzag Icon Component
const ZigzagIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("w-6 h-6", className)}
  >
    <path d="M3 12L7 8L11 12L15 8L19 12L23 8" />
    <path d="M3 16L7 12L11 16L15 12L19 16L23 12" />
  </svg>
)

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  earned: boolean
  earnedDate?: Date
  progress?: number
  maxProgress?: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface BadgeDisplayCaseProps {
  userId?: string
}

export function BadgeDisplayCase({ userId }: BadgeDisplayCaseProps) {
  // Mock achievements data based on your specifications
  const achievements: Achievement[] = [
    // Legendary Achievements
    {
      id: "million-meter-champion",
      name: "Million Meter Champion",
      description: "Complete the full 1,000,000 meter challenge",
      icon: Crown,
      earned: false,
      progress: 350000,
      maxProgress: 1000000,
      rarity: "legendary",
    },
    {
      id: "100k-day",
      name: "Centurion",
      description: "Complete 100,000 meters in a single day",
      icon: Zap,
      earned: false,
      progress: 25000,
      maxProgress: 100000,
      rarity: "legendary",
    },

    // Epic Achievements
    {
      id: "jack-of-all-trades",
      name: "Jack of All Trades",
      description: "Complete all 6 workout types in one day",
      icon: Star,
      earned: false,
      progress: 4,
      maxProgress: 6,
      rarity: "epic",
    },
    {
      id: "marathon",
      name: "Marathon",
      description: "Complete 42,195 meters in one sitting",
      icon: Target,
      earned: false,
      progress: 20000,
      maxProgress: 42195,
      rarity: "epic",
    },
    {
      id: "monthly-master",
      name: "Monthly Master",
      description: "30 consecutive days of workouts (each at least 5000m)",
      icon: Calendar,
      earned: false,
      progress: 12,
      maxProgress: 30,
      rarity: "epic",
    },
    {
      id: "nates-favorite",
      name: "Nate's Favorite",
      description: "Get a 2k PR",
      icon: Trophy,
      earned: true,
      earnedDate: new Date("2024-06-15"),
      rarity: "epic",
    },

    // Rare Achievements
    {
      id: "gym-rat",
      name: "Gym Rat",
      description: "Complete 20+ lifting workouts",
      icon: Dumbbell,
      earned: false,
      progress: 8,
      maxProgress: 20,
      rarity: "rare",
    },
    {
      id: "tri",
      name: "Tri",
      description: "Complete 30,000 meters in one day",
      icon: TriIcon,
      earned: true,
      earnedDate: new Date("2024-06-10"),
      rarity: "rare",
    },
    {
      id: "early-bird",
      name: "Early Bird",
      description: "Complete 10 workouts before 7 AM (each at least 5000m)",
      icon: Sunrise,
      earned: true,
      earnedDate: new Date("2024-06-05"),
      rarity: "rare",
    },
    {
      id: "erg-master",
      name: "Erg Master",
      description: "Complete 50+ erg workouts",
      icon: ErgMasterIcon,
      earned: false,
      progress: 32,
      maxProgress: 50,
      rarity: "rare",
    },
    {
      id: "fish",
      name: "Fish",
      description: "Complete 10+ swim workouts",
      icon: Fish,
      earned: false,
      progress: 6,
      maxProgress: 10,
      rarity: "rare",
    },
    {
      id: "zigzag-method",
      name: "Zigzag Method",
      description: "Complete an 8 x 6:35",
      icon: ZigzagIcon,
      earned: false,
      rarity: "rare",
    },
    {
      id: "mystery-badge",
      name: "???",
      description: "???",
      icon: HelpCircle,
      earned: false,
      rarity: "rare",
    },

    // Common Achievements
    {
      id: "just-do-track-bruh",
      name: "Just Do Track Bruh",
      description: "Complete 10+ running workouts",
      icon: JustDoTrackBruhIcon,
      earned: true,
      earnedDate: new Date("2024-05-20"),
      rarity: "common",
    },
    {
      id: "lend-a-hand",
      name: "Lend a Hand",
      description: "Go on a 3-mile run with someone who has less than 10k meters",
      icon: LendAHandIcon,
      earned: true,
      earnedDate: new Date("2024-06-08"),
      rarity: "common",
    },
    {
      id: "week-warrior",
      name: "Week Warrior",
      description: "7 consecutive days of workouts (each at least 5000m)",
      icon: Flame,
      earned: true,
      earnedDate: new Date("2024-06-12"),
      rarity: "common",
    },
    {
      id: "fresh-legs",
      name: "Fresh Legs",
      description: "Complete your first 10,000 meters",
      icon: FreshLegsIcon,
      earned: true,
      earnedDate: new Date("2024-05-15"),
      rarity: "common",
    },
  ]

  const getRarityColors = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return {
          bg: "bg-slate-100 dark:bg-slate-800",
          border: "border-slate-300 dark:border-slate-600",
          glow: "shadow-slate-200 dark:shadow-slate-700",
          text: "text-slate-700 dark:text-slate-300",
        }
      case "rare":
        return {
          bg: "bg-blue-50 dark:bg-blue-950",
          border: "border-blue-300 dark:border-blue-600",
          glow: "shadow-blue-200 dark:shadow-blue-700",
          text: "text-blue-700 dark:text-blue-300",
        }
      case "epic":
        return {
          bg: "bg-purple-50 dark:bg-purple-950",
          border: "border-purple-300 dark:border-purple-600",
          glow: "shadow-purple-200 dark:shadow-purple-700",
          text: "text-purple-700 dark:text-purple-300",
        }
      case "legendary":
        return {
          bg: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950",
          border: "border-yellow-400 dark:border-yellow-600",
          glow: "shadow-yellow-300 dark:shadow-yellow-600",
          text: "text-yellow-700 dark:text-yellow-300",
        }
    }
  }

  const earnedBadges = achievements.filter((a) => a.earned)
  const unlockedCount = earnedBadges.length
  const totalCount = achievements.length
  const completionPercentage = (unlockedCount / totalCount) * 100

  return (
    <Card className="mt-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Gem className="h-5 w-5 text-purple-600" />
            Badge Display Case
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {unlockedCount}/{totalCount}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Collection Progress</span>
            <span className="font-medium">{completionPercentage.toFixed(0)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        {/* Display Case with Glass Effect */}
        <div className="relative">
          {/* Glass Case Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 backdrop-blur-sm" />

          {/* Shelves */}
          <div className="relative p-4 space-y-6">
            {/* Legendary Shelf */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-yellow-700 dark:text-yellow-300">
                <Crown className="h-4 w-4" />
                Legendary
              </div>
              <div className="grid grid-cols-4 gap-3">
                {achievements
                  .filter((a) => a.rarity === "legendary")
                  .map((achievement) => (
                    <BadgeCard key={achievement.id} achievement={achievement} />
                  ))}
                {/* Add empty slots to fill the row */}
                {Array.from({ length: 4 - achievements.filter((a) => a.rarity === "legendary").length }).map((_, i) => (
                  <EmptySlot key={`legendary-empty-${i}`} />
                ))}
              </div>
            </div>

            {/* Epic Shelf */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-purple-700 dark:text-purple-300">
                <Shield className="h-4 w-4" />
                Epic
              </div>
              <div className="grid grid-cols-4 gap-3">
                {achievements
                  .filter((a) => a.rarity === "epic")
                  .map((achievement) => (
                    <BadgeCard key={achievement.id} achievement={achievement} />
                  ))}
                {/* Add empty slots to fill the row */}
                {Array.from({ length: 4 - achievements.filter((a) => a.rarity === "epic").length }).map((_, i) => (
                  <EmptySlot key={`epic-empty-${i}`} />
                ))}
              </div>
            </div>

            {/* Rare Shelf */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                <Star className="h-4 w-4" />
                Rare
              </div>
              <div className="grid grid-cols-4 gap-3">
                {achievements
                  .filter((a) => a.rarity === "rare")
                  .map((achievement) => (
                    <BadgeCard key={achievement.id} achievement={achievement} />
                  ))}
                {/* Add empty slots to fill the row */}
                {Array.from({ length: 8 - achievements.filter((a) => a.rarity === "rare").length }).map((_, i) => (
                  <EmptySlot key={`rare-empty-${i}`} />
                ))}
              </div>
            </div>

            {/* Common Shelf */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Medal className="h-4 w-4" />
                Common
              </div>
              <div className="grid grid-cols-4 gap-3">
                {achievements
                  .filter((a) => a.rarity === "common")
                  .map((achievement) => (
                    <BadgeCard key={achievement.id} achievement={achievement} />
                  ))}
                {/* Add empty slots to fill the row */}
                {Array.from({ length: 8 - achievements.filter((a) => a.rarity === "common").length }).map((_, i) => (
                  <EmptySlot key={`common-empty-${i}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Spotlight Effect */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-b from-yellow-200/30 to-transparent dark:from-yellow-400/20 rounded-b-full blur-sm" />
        </div>
      </CardContent>
    </Card>
  )
}

function BadgeCard({ achievement }: { achievement: Achievement }) {
  const colors = getRarityColors(achievement.rarity)
  const Icon = achievement.icon

  return (
    <div className="relative group">
      <div
        className={cn(
          "aspect-square p-3 rounded-lg border-2 transition-all duration-300 relative overflow-hidden",
          achievement.earned
            ? cn(
                colors.bg,
                colors.border,
                "shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer",
                colors.glow,
              )
            : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 opacity-40",
        )}
      >
        {/* Shine effect for earned badges */}
        {achievement.earned && (
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
        )}

        {/* Badge Icon */}
        <div className="flex items-center justify-center h-full">
          <Icon className={cn("h-6 w-6", achievement.earned ? colors.text : "text-slate-400 dark:text-slate-600")} />
        </div>

        {/* Progress indicator for unearned badges */}
        {!achievement.earned && achievement.progress && achievement.maxProgress && (
          <div className="absolute bottom-1 left-1 right-1">
            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
          </div>
        )}

        {/* Rarity indicator */}
        {achievement.earned && achievement.rarity === "legendary" && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          </div>
        )}
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="font-medium">{achievement.name}</div>
        <div className="text-slate-300">{achievement.description}</div>
        {!achievement.earned && achievement.progress && achievement.maxProgress && (
          <div className="text-slate-400">
            {new Intl.NumberFormat().format(achievement.progress)} /{" "}
            {new Intl.NumberFormat().format(achievement.maxProgress)}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptySlot() {
  return (
    <div className="aspect-square p-3 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 opacity-30">
      <div className="flex items-center justify-center h-full">
        <div className="w-6 h-6 rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600" />
      </div>
    </div>
  )
}

function getRarityColors(rarity: Achievement["rarity"]) {
  switch (rarity) {
    case "common":
      return {
        bg: "bg-slate-100 dark:bg-slate-800",
        border: "border-slate-300 dark:border-slate-600",
        glow: "shadow-slate-200 dark:shadow-slate-700",
        text: "text-slate-700 dark:text-slate-300",
      }
    case "rare":
      return {
        bg: "bg-blue-50 dark:bg-blue-950",
        border: "border-blue-300 dark:border-blue-600",
        glow: "shadow-blue-200 dark:shadow-blue-700",
        text: "text-blue-700 dark:text-blue-300",
      }
    case "epic":
      return {
        bg: "bg-purple-50 dark:bg-purple-950",
        border: "border-purple-300 dark:border-purple-600",
        glow: "shadow-purple-200 dark:shadow-purple-700",
        text: "text-purple-700 dark:text-purple-300",
      }
    case "legendary":
      return {
        bg: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950",
        border: "border-yellow-400 dark:border-yellow-600",
        glow: "shadow-yellow-300 dark:shadow-yellow-600",
        text: "text-yellow-700 dark:text-yellow-300",
      }
  }
}
