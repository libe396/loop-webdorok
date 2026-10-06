import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/useScrollProgress'

// An original projected particle sculpture: two connected loops, lit in depth.
export default function LoopField({ mode = 0 }) {
  const canvas = useRef(null)
  const selected = useRef(mode)
  const repaint = useRef(null)
  useEffect(() => { selected.current = mode; repaint.current?.() }, [mode])
  useEffect(() => {
    const el = canvas.current
    const ctx = el.getContext('2d')
    if (!ctx) return
    const reduced = prefersReducedMotion()
    const points = []
    for (let j = 0; j < 24; j++) {
      const v = j / 24 * Math.PI * 2
      for (let i = 0; i < 140; i++) {
        const t = i / 140 * Math.PI * 2
        const denominator = 1 + Math.sin(t) ** 2
        const x = Math.cos(t) / denominator
        const y = Math.sin(t) * Math.cos(t) / denominator
        const dt = .001
        const tx = (Math.cos(t + dt) / (1 + Math.sin(t + dt) ** 2) - x) / dt
        const ty = (Math.sin(t + dt) * Math.cos(t + dt) / (1 + Math.sin(t + dt) ** 2) - y) / dt
        const norm = Math.hypot(tx, ty)
        points.push([x - ty / norm * .14 * Math.cos(v), y + tx / norm * .14 * Math.cos(v), .14 * Math.sin(v) + .12 * Math.sin(t)])
      }
    }
    let width = 0, height = 0, frame = 0, visible = true, angle = 0
    let pointerX = 0, pointerY = 0, easedX = 0, easedY = 0
    const render = () => {
      if (!width || !height) return
      ctx.clearRect(0, 0, width, height)
      easedX += (pointerX - easedX) * .045
      easedY += (pointerY - easedY) * .045
      if (!reduced) angle += .002
      const yaw = -.3 + easedX * .28
      const pitch = .52 + easedY * .24 + Math.sin(angle) * .08
      const roll = -.38 + Math.sin(angle * .5) * .05
      const scale = Math.min(width * .43, height * .61)
      const hues = [237, 198, 272]
      const hue = hues[selected.current]
      const projected = points.map(([x, y, z]) => {
        const a = x * Math.cos(yaw) + z * Math.sin(yaw)
        const b = z * Math.cos(yaw) - x * Math.sin(yaw)
        const c = y * Math.cos(pitch) - b * Math.sin(pitch)
        const depth = b * Math.cos(pitch) + y * Math.sin(pitch)
        const perspective = 3 / (3 - depth)
        return [(a * Math.cos(roll) - c * Math.sin(roll)) * scale * perspective + width * .5, (a * Math.sin(roll) + c * Math.cos(roll)) * scale * perspective + height * .48, depth, perspective]
      }).sort((a, b) => a[2] - b[2])
      for (const [x, y, z, perspective] of projected) {
        const light = Math.max(0, Math.min(1, (z + .5)))
        ctx.fillStyle = `hsla(${hue + light * 15}, ${75 + light * 20}%, ${42 + light * 40}%, ${.24 + light * .66})`
        ctx.beginPath()
        ctx.arc(x, y, (1 + light * 1.4) * perspective, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    repaint.current = render
    const tick = () => { if (visible && !document.hidden) render(); frame = requestAnimationFrame(tick) }
    const resize = () => {
      const bounds = el.getBoundingClientRect()
      width = bounds.width; height = bounds.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      el.width = Math.round(width * dpr); el.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      render()
    }
    const onMove = (event) => {
      if (reduced || event.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      pointerX = (event.clientX - r.left) / r.width - .5
      pointerY = (event.clientY - r.top) / r.height - .5
    }
    const onLeave = () => { pointerX = 0; pointerY = 0 }
    const surface = el.parentElement
    surface.addEventListener('pointermove', onMove)
    surface.addEventListener('pointerleave', onLeave)
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    io.observe(el)
    resize()
    if (!reduced) tick()
    else { frame = requestAnimationFrame(render) }
    return () => { repaint.current = null; cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); surface.removeEventListener('pointermove', onMove); surface.removeEventListener('pointerleave', onLeave) }
  }, [])
  // Reduced-motion still updates the selected palette without continuous motion.
  return <canvas ref={canvas} className="loop-field" aria-hidden="true" />
}
