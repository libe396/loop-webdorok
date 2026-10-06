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
      const points = [...root.current.children].filter(el => el.tagName === 'SECTION').map(el => Math.max(0, el.getBoundingClientRect().top + window.scrollY - header))
      const nearest = points.reduce((best, point) => Math.abs(point - window.scrollY) < Math.abs(best - window.scrollY) ? point : best, Infinity)
      const distance = Math.abs(nearest - window.scrollY)
      if (distance < 8 || distance > Math.min(180, window.innerHeight * .22)) return
      snapping = true
      scrollToTarget(nearest)
      timer = setTimeout(() => { snapping = false }, 900)
    }
    const onScroll = () => {
      if (snapping || !intent) return
      clearTimeout(timer)
      timer = setTimeout(settle, 180)
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
