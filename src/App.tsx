import MoodCheckIn from './components/MoodCheckIn'
import Recommendation from './components/Recommendation'
import Timeline from './components/Timeline'
import MoodChart from './components/MoodChart'
import TriggerAnalysis from './components/TriggerAnalysis'

export default function App() {
  return (
    <div className="min-h-screen bg-page">
      <header className="sticky top-0 z-10 border-b border-neutral-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">情绪日记 · 自我关怀</h1>
            <p className="text-sm text-neutral-500">记录此刻，温柔地照顾自己</p>
          </div>
          <span className="text-2xl" aria-hidden>🌿</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <MoodCheckIn />
          <Recommendation />
          <Timeline />
        </div>
        <div className="space-y-6">
          <MoodChart />
          <TriggerAnalysis />
        </div>
      </main>
    </div>
  )
}
