import React, { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion'

export default function MicroInteractions() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = () => el.getBoundingClientRect()
    const handler = (e) => {
      const r = rect()
      x.set(e.clientX - r.left)
      y.set(e.clientY - r.top)
    }
    el.addEventListener('mousemove', handler)
    return () => el.removeEventListener('mousemove', handler)
  }, [x, y])

  const mask = useMotionTemplate`radial-gradient(120px at ${x}px ${y}px, rgba(255,255,255,0.25), transparent 60%)`
  const rotate = useTransform(x, [0, 400], [-2, 2])

  return (
    <section ref={ref} className="relative bg-slate-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {['Kinetic Panels', 'Parallax Depth', 'Playful Hover'].map((t, i) => (
            <motion.div key={i}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              style={{ rotate }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_20px_60px_rgba(59,245,255,0.12)]"
            >
              <div className="text-white font-bold text-xl">{t}</div>
              <p className="mt-2 text-cyan-100/90 text-sm">Hover to feel the bounce and glow. Cards respond to your movement with subtle 3D.</p>

              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ WebkitMaskImage: mask, maskImage: mask, background: 'radial-gradient(circle, rgba(59,245,255,0.30), rgba(255,59,245,0.30), rgba(255,154,59,0.25))' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
