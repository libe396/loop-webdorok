import { useEffect, useState } from 'react'

/** pin: 고정 구간 0→1. entry: 요소 상단이 뷰포트 85%→20%를 통과하는 진입 구간. */
export default function useScrollProgress(ref, mode = 'pin') {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const viewport = window.innerHeight
      const total = mode === 'entry' ? viewport * 0.65 : r.height - viewport
      const offset = mode === 'entry' ? viewport * 0.85 - r.top : -r.top
      setP(Math.min(1, Math.max(0, offset / Math.max(total, 1))))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [ref, mode])
  return p
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
