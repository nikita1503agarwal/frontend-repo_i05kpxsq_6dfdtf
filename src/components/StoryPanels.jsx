import React, { useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Flame, Star, Swords, Wand2 } from 'lucide-react'

const Panel = ({ index, title, copy, bgFrom, bgTo, icon: Icon }) => {
  const { scrollYProgress } = useScroll({ offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50 * (index + 1), -50 * (index + 1)])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.6, 1], [0, 1, 1, 0.75])

  return (
    <motion.section
      id={index === 0 ? 'story' : undefined}
      style={{ y, opacity }}
      className="relative min-h-[85svh] flex items-center justify-center overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${bgFrom} ${bgTo} opacity-20`} />
      <div className="absolute inset-0 bg-[radial-gradient(100%_60%_at_50%_40%,rgba(255,255,255,0.08),transparent)]" />

      <div className="relative z-10 max-w-5xl px-6 py-24">
        <div className="grid md:grid-cols-[120px_1fr] items-center gap-8">
          <motion.div initial={{ rotate: -6, scale: 0.9 }} whileInView={{ rotate: 0, scale: 1 }} viewport={{ once: false, amount: 0.6 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="hidden md:flex h-28 w-28 items-center justify-center rounded-2xl bg-black/40 border border-white/10 shadow-[0_10px_40px_rgba(255,59,245,0.25)]">
            <Icon className="h-12 w-12 text-white drop-shadow-[0_0_12px_rgba(255,59,245,0.6)]" />
          </motion.div>

          <div>
            <motion.h3 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: 0.5, once: false }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              {title}
            </motion.h3>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.4 }} transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-4 text-cyan-100/90 text-lg md:text-xl max-w-3xl">
              {copy}
            </motion.p>
          </div>
        </div>
      </div>

      {/* cinematic streaks */}
      <div className="pointer-events-none absolute -inset-x-20 bottom-10 h-24 rotate-1 opacity-50">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(155,255,59,0)_0%,rgba(155,255,59,0.35)_20%,rgba(255,59,245,0.4)_60%,rgba(59,245,255,0.35)_100%)] blur-2xl" />
      </div>
    </motion.section>
  )
}

export default function StoryPanels() {
  const panels = [
    {
      title: 'Call of the Neon Horizon',
      copy: 'A spark ignites in the city that never dims. You are drawn to a legend whispered in cyber-alleys and sky-bridges.',
      from: 'from-fuchsia-500/40', to: 'to-cyan-400/40', icon: Flame,
    },
    {
      title: 'Allies of Light Speed',
      copy: 'A crew assembles—sharpshooters, summoners, and hackers. Each frame cuts to a new hero as drums kick in.',
      from: 'from-orange-500/40', to: 'to-lime-400/40', icon: Swords,
    },
    {
      title: 'Arcana of the Skyway',
      copy: 'Glyphs spin and gates open. Momentum surges—your path glows with kinetic typography and luminous signs.',
      from: 'from-cyan-500/40', to: 'to-fuchsia-400/40', icon: Wand2,
    },
    {
      title: 'Final Cut: Become the Legend',
      copy: 'The city breathes with you. Zoom, pan, blur—until silence. Then a single note. Step in.',
      from: 'from-lime-500/40', to: 'to-orange-400/40', icon: Star,
    },
  ]

  return (
    <div className="relative bg-slate-950">
      {panels.map((p, i) => (
        <Panel key={i} index={i} title={p.title} copy={p.copy} bgFrom={p.from} bgTo={p.to} icon={p.icon} />
      ))}
    </div>
  )
}
