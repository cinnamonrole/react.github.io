"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Activity, Trophy, Flame, Calculator, Award, Sparkles } from "lucide-react"
import { useUserData } from "@/hooks/use-user-data"
import { UserProgressChart } from "@/components/user-progress-chart"
import { WorkoutGallery } from "@/components/workout-gallery"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLeaderboardData } from "@/hooks/use-leaderboard-data"
import { BadgeDisplayCase } from "@/components/badge-display-case"

interface ProfilePageProps {
  userId?: string
}

// Mock function to get badge count for a user
const getBadgeCount = (userId: string): number => {
  // This would normally come from your badge system
  // For now, returning mock data based on user
  const badgeCounts: Record<string, number> = {
    "current-user": 6,
    "1": 8, // Alex Johnson
    "2": 5, // Sam Williams
    "3": 7, // Jordan Smith
    "4": 4, // Taylor Brown
    "5": 6, // Morgan Davis
    "6": 3, // Casey Miller
    "7": 5, // Riley Wilson
    "8": 4, // Jamie Garcia
    "9": 6, // Avery Martinez
    "10": 3, // Drew Thompson
  }

  return badgeCounts[userId] || 2
}

export default function ProfilePage({ userId }: ProfilePageProps) {
  const [selectedUserId, setSelectedUserId] = useState(userId || "current-user")
  const { leaderboardData } = useLeaderboardData()
  const { userData } = useUserData(selectedUserId === "current-user" ? undefined : selectedUserId)
  const [metersPerDay, setMetersPerDay] = useState("5000")
  const [calculatedDays, setCalculatedDays] = useState<number | null>(null)
  const [isMoreStatsOpen, setIsMoreStatsOpen] = useState(false)

  if (!userData || !leaderboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  const { name, profileImage, totalMeters, deficit, dailyRequired, dailyRequiredWithRest, workouts } = userData

  const percentComplete = Math.min(100, (totalMeters / 1000000) * 100)
  const workoutCount = workouts.length
  const dayStreak = 7 // Mock data - consecutive days with workouts
  const badgeCount = getBadgeCount(selectedUserId)

  // Calculate current rank based on leaderboard data
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.totalMeters - a.totalMeters)
  const currentRank =
    sortedLeaderboard.findIndex((user) => {
      if (selectedUserId === "current-user") {
        // For current user, find by total meters (assuming current user is Alex Johnson with 450k meters)
        return user.totalMeters === totalMeters
      }
      return user.id === selectedUserId
    }) + 1

  const calculateDays = () => {
    const metersPerDayNum = Number.parseFloat(metersPerDay)
    if (isNaN(metersPerDayNum) || metersPerDayNum <= 0) return

    const days = Math.ceil(deficit / metersPerDayNum)
    setCalculatedDays(days)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-200/10 dark:bg-blue-800/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-200/10 dark:bg-purple-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container px-4 py-6 relative z-10">
        {/* Profile Selector with enhanced styling */}
        <div className="mb-6">
          <Select defaultValue={selectedUserId} onValueChange={(value) => setSelectedUserId(value)}>
            <SelectTrigger className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg">
              <SelectValue placeholder="Select profile" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-white/20">
              <SelectItem value="current-user">Your Profile</SelectItem>
              {leaderboardData?.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Enhanced Profile Header */}
        <Card className="mb-6 bg-gradient-to-r from-white/90 to-slate-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="relative mr-4">
                {/* Glowing ring around avatar */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-md opacity-30 animate-pulse"></div>
                <Avatar className="h-20 w-20 relative border-4 border-white/50 shadow-xl">
                  <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-800 text-lg font-bold">
                    {name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {name}
                  </h1>

                  {/* Enhanced badge counter */}
                  <div className="relative group">
                    {/* Multiple glow rings */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse scale-150"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300 animate-pulse delay-300 scale-125"></div>

                    {/* Main badge container */}
                    <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white text-sm font-bold rounded-full shadow-2xl transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {/* Inner shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent rounded-full"></div>

                      {/* Floating sparkles */}
                      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 opacity-80 animate-bounce" />
                      <Award className="absolute top-0.5 left-0.5 w-2.5 h-2.5 text-yellow-300 opacity-60" />

                      {/* Badge count */}
                      <span className="relative z-10 font-black">{badgeCount}</span>

                      {/* Animated sparkle effects */}
                      <div className="absolute -top-2 -right-2 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-700"></div>
                      <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-pulse delay-1000"></div>
                    </div>

                    {/* Enhanced tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-2xl">
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-yellow-400" />
                        <span className="font-semibold">
                          {badgeCount} Badge{badgeCount !== 1 ? "s" : ""} Earned
                        </span>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Rower</p>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Main Progress Card */}
        <Card className="mb-6 bg-gradient-to-br from-blue-600 to-purple-600 border-0 shadow-2xl relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-white/10"></div>
          </div>

          <CardContent className="pt-8 pb-6 relative">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <span className="text-5xl font-black text-white drop-shadow-lg">
                  {new Intl.NumberFormat().format(totalMeters)}
                </span>
                <span className="text-xl text-blue-100 ml-2 font-semibold">meters</span>
                {/* Floating sparkle */}
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-80"></div>
              </div>
            </div>

            {/* Enhanced progress bar */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
              <Progress value={percentComplete} className="h-6 relative bg-white/10 border-white/20" />
              {/* Progress glow effect */}
              <div
                className="absolute top-0 left-0 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-md opacity-50 transition-all duration-1000"
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>

            <div className="text-center">
              <span className="text-lg text-blue-100 font-semibold">
                {percentComplete.toFixed(1)}% of 1,000,000m goal
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Main Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: Activity, value: workoutCount, label: "Workouts", color: "from-blue-500 to-cyan-500" },
            { icon: Trophy, value: `#${currentRank}`, label: "Current Rank", color: "from-yellow-500 to-orange-500" },
            { icon: Flame, value: dayStreak, label: "Day Streak", color: "from-red-500 to-pink-500" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
            >
              <CardContent className="p-4 text-center relative overflow-hidden">
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div className="flex items-center justify-center mb-3">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-br ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-black text-slate-800 dark:text-slate-200 mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Statistics - Collapsible */}
        <Collapsible open={isMoreStatsOpen} onOpenChange={setIsMoreStatsOpen} className="mb-6">
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              More Statistics
              {isMoreStatsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Personal Deficit</p>
                  <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                    {new Intl.NumberFormat().format(deficit)}m
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Daily Required</p>
                  <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                    {new Intl.NumberFormat().format(dailyRequired)}m
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl">
                <CardContent className="p-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">With 1 Rest Day/Week</p>
                  <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                    {new Intl.NumberFormat().format(dailyRequiredWithRest)}m
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Calculator */}
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Completion Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 mb-4">
                  <div className="flex-1">
                    <Label htmlFor="meters-per-day" className="text-sm">
                      If I row this many meters per day:
                    </Label>
                    <Input
                      id="meters-per-day"
                      type="number"
                      min="1"
                      value={metersPerDay}
                      onChange={(e) => setMetersPerDay(e.target.value)}
                      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20"
                    />
                  </div>
                  <Button
                    onClick={calculateDays}
                    className="mb-[2px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Calculate
                  </Button>
                </div>

                {calculatedDays !== null && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-4 rounded-lg text-center border border-blue-200/50 dark:border-blue-800/50">
                    <p className="text-sm text-slate-600 dark:text-slate-400">You will complete the challenge in:</p>
                    <p className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {calculatedDays} days
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        {/* Enhanced Charts and Gallery */}
        <Tabs defaultValue="progress" className="mb-6">
          <TabsList className="grid grid-cols-2 mb-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20">
            <TabsTrigger
              value="progress"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Progress
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Workout Gallery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Meters Per Day</CardTitle>
              </CardHeader>
              <CardContent>
                <UserProgressChart />

                <div className="mt-4">
                  <Tabs defaultValue="all">
                    <TabsList className="grid grid-cols-4 bg-slate-100/80 dark:bg-slate-800/80">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="erg">Erg</TabsTrigger>
                      <TabsTrigger value="run">Run</TabsTrigger>
                      <TabsTrigger value="other">Other</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <WorkoutGallery workouts={workouts} />
          </TabsContent>
        </Tabs>

        {/* Badge Display Case */}
        <BadgeDisplayCase userId={selectedUserId} />
      </div>
    </div>
  )
}
