import React from 'react'
import Hero from './components/Hero'
import StoryPanels from './components/StoryPanels'
import MicroInteractions from './components/MicroInteractions'

function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Hero />
      <StoryPanels />
      <MicroInteractions />

      {/* Footer */}
      <footer className="relative bg-slate-950 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xl font-semibold">Neon Legend</h4>
              <p className="text-cyan-200/80 text-sm">An anime-inspired, cinematic web experience</p>
            </div>
            <div className="text-cyan-200/60 text-sm">Scroll-crafted with parallax, glow, and motion.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
