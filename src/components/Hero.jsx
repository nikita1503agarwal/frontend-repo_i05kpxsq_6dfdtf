import React, { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { Sparkles, Play, ArrowDown, Zap } from 'lucide-react'

const neon = {
  blue: '#3BF5FF',
  pink: '#FF3BF5',
  orange: '#FF9A3B',
  lime: '#9BFF3B',
}

export default function Hero() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    const handler = (e) => {
      setCursor({ x: e.clientX, y: e.clientY })
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  const fgTranslate = {
    x: useTransform(mx, (v) => v * 20),
    y: useTransform(my, (v) => v * 20),
  }
  const mgTranslate = {
    x: useTransform(mx, (v) => v * 10),
    y: useTransform(my, (v) => v * 10),
  }
  const bgTranslate = {
    x: useTransform(mx, (v) => v * 4),
    y: useTransform(my, (v) => v * 4),
  }

  const particles = useMemo(() => new Array(24).fill(0).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 4,
    color: [neon.blue, neon.pink, neon.orange, neon.lime][i % 4],
  })), [])

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-slate-950">
      {/* 3D Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/atN3lqky4IzF-KEP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft neon gradient wash over the 3D scene (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60" style={{
        background:
          'radial-gradient(60% 60% at 30% 30%, rgba(59,245,255,0.30) 0%, transparent 55%),\n radial-gradient(50% 50% at 70% 40%, rgba(255,59,245,0.25) 0%, transparent 60%),\n radial-gradient(40% 40% at 50% 80%, rgba(255,154,59,0.25) 0%, transparent 60%)',
      }} />

      {/* Background parallax streaks */}
      <motion.div style={bgTranslate} className="pointer-events-none absolute -inset-x-10 -top-24 h-64 rotate-6 opacity-60">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(59,245,255,0.0)_0%,rgba(59,245,255,0.35)_20%,rgba(255,59,245,0.25)_60%,rgba(255,154,59,0.3)_100%)] blur-2xl" />
      </motion.div>

      {/* Floating particles / embers */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full blur-[1px] shadow-[0_0_12px_currentColor]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: p.color,
            color: p.color,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="mx-auto max-w-7xl px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span className="text-xs tracking-wider uppercase text-cyan-200">Cinematic Anime Storyworld</span>
            </div>

            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight text-white">
              Step Into
              <span className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-300 drop-shadow-[0_0_25px_rgba(255,59,245,0.35)]">
                Neon Legend
              </span>
            </h1>

            <p className="mt-6 text-cyan-100/90 text-lg md:text-xl max-w-xl">
              A hyper-visual anime landing where motion, color, and depth pull you straight into the adventure.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-400 px-6 py-3 text-slate-900 font-semibold shadow-[0_10px_30px_rgba(255,59,245,0.35)]">
                <Play className="h-5 w-5" /> Enter the Opening
              </motion.button>
              <motion.a href="#story" whileHover={{ y: -2 }} className="inline-flex items-center gap-2 text-cyan-200">
                <ArrowDown className="h-5 w-5" /> Scroll to Begin
              </motion.a>
            </div>
          </motion.div>

          {/* Foreground "character" card (stylized placeholder) with parallax */}
          <motion.div style={fgTranslate} className="relative hidden md:block">
            <motion.div whileHover={{ rotate: -1, y: -6 }} className="relative mx-auto h-[440px] w-[340px] [perspective:1000px]">
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/30 via-cyan-400/20 to-orange-300/30 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(59,245,255,0.25)]"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ boxShadow: ['0 20px 60px rgba(59,245,255,0.15)', '0 20px 60px rgba(255,59,245,0.25)', '0 20px 60px rgba(59,245,255,0.15)'] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Faux character silhouette */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative h-64 w-64 rounded-full bg-gradient-to-b from-fuchsia-400 to-cyan-300 blur-[1px] shadow-[0_0_80px_rgba(255,59,245,0.45)]" />
                </div>
                <div className="absolute -left-8 -top-8 h-24 w-24 rounded-2xl bg-cyan-400/40 blur-xl" />
                <div className="absolute -right-6 -bottom-10 h-28 w-28 rounded-full bg-fuchsia-500/40 blur-xl" />

                {/* Neon chips */}
                <motion.div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10" style={mgTranslate}>
                  <Zap className="h-4 w-4 text-lime-300" />
                  <span className="text-xs text-lime-200">Energy Sync</span>
                </motion.div>
                <motion.div className="absolute right-6 bottom-6 inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 border border-white/10" style={mgTranslate}>
                  <Sparkles className="h-4 w-4 text-orange-300" />
                  <span className="text-xs text-orange-200">Aura Bloom</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Cursor lens glow */}
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: cursor.x,
          top: cursor.y,
          width: 240,
          height: 240,
          background: 'radial-gradient(closest-side, rgba(59,245,255,0.30), rgba(255,59,245,0.18), transparent 70%)',
          filter: 'blur(20px)',
          mixBlendMode: 'screen',
        }}
      />
    </section>
  )
}
