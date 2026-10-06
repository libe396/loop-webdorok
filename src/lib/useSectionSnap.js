import { useEffect } from 'react'
import { scrollToTarget } from './scroll'

/** Settle near chapter boundaries without skipping content in long sections. */
export default function useSectionSnap(root) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer
    let intent = false
    let snapping = false
    const onInput = event => {
      if (event.target.closest?.('.phone, input, textarea, [data-lenis-prevent]')) {
        intent = false
        clearTimeout(timer)
        return
      }
      intent = true
    }
    const settle = () => {
      if (!intent || snapping || !root.current) return
      intent = false
      const header = document.querySelector('.gnb')?.offsetHeight || 0
      const viewport = window.innerHeight - header
      const points = [...root.current.children].filter(el => el.tagName === 'SECTION').flatMap(el => {
        const rect = el.getBoundingClientRect()
        const start = Math.max(0, rect.top + window.scrollY - header)
        // Long chapters can settle at either edge without jumping past their content.
        return rect.height > viewport + 100
          ? [start, Math.max(start, rect.bottom + window.scrollY - window.innerHeight)]
          : [start]
      })
      const nearest = points.reduce((best, point) => Math.abs(point - window.scrollY) < Math.abs(best - window.scrollY) ? point : best, Infinity)
      const distance = Math.abs(nearest - window.scrollY)
      if (distance < 8 || distance > (window.innerWidth >= 1200 ? Math.min(380, window.innerHeight * .36) : Math.min(240, window.innerHeight * .28))) return
      snapping = true
      scrollToTarget(nearest)
      timer = setTimeout(() => { snapping = false }, 900)
    }
    const onScroll = () => {
      if (snapping || !intent) return
      clearTimeout(timer)
      timer = setTimeout(settle, 140)
    }
    window.addEventListener('wheel', onInput, { passive: true })
    window.addEventListener('touchstart', onInput, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('wheel', onInput)
      window.removeEventListener('touchstart', onInput)
      window.removeEventListener('scroll', onScroll)
    }
  }, [root])
}
