import { useEffect } from 'react'
import { prefersReducedMotion } from './useScrollProgress'

export default function useLandingMotion(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    const targets = root.querySelectorAll('.chapter-heading, .sleep-copy, .care-heading, .care-step, .decision-list article, .archive-index')
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('motion-entered')
        observer.unobserve(entry.target)
      }
    }, { threshold: .1 })
    targets.forEach((el, i) => {
      el.classList.add('motion-reveal')
      el.style.setProperty('--reveal-delay', `${i % 3 * 65}ms`)
      observer.observe(el)
    })
    return () => { observer.disconnect(); targets.forEach(el => { el.classList.remove('motion-reveal', 'motion-entered'); el.style.removeProperty('--reveal-delay') }) }
  }, [ref])
}
