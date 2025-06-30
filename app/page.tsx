import TeamOverview from "@/components/team-overview"
import TopPerformersCard from "@/components/top-performers-card"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-blue-950 dark:to-cyan-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-200/20 dark:bg-cyan-800/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container px-4 py-6 relative z-10">
        {/* McLean Crew Header Card with Enhanced Styling */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 border-0 shadow-2xl relative overflow-hidden">
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] animate-[shine_3s_ease-in-out_infinite]"></div>

          <CardContent className="py-8 relative">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 relative">
                {/* Glowing ring around logo */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 animate-pulse"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20">
                  <img src="/images/mclean-crew-logo.png" alt="McLean Crew Logo" className="h-16 w-16 object-contain" />
                </div>
              </div>
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">McLean Crew</h1>
              <p className="text-xl text-blue-100 font-semibold tracking-wide">Million Meters Challenge</p>
              <div className="mt-4 flex items-center gap-2 text-blue-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Challenge Active</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <TopPerformersCard />
        <TeamOverview />
      </div>
    </div>
  )
}
