import Lenis from 'lenis'
import { prefersReducedMotion } from './useScrollProgress'

/** 전역 Lenis 하나. reduced-motion이면 만들지 않음 */
let lenis = null

export function startLenis() {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ lerp: 0.1 })
  let id = requestAnimationFrame(function raf(t) { lenis.raf(t); id = requestAnimationFrame(raf) })
  return () => { cancelAnimationFrame(id); lenis.destroy(); lenis = null }
}

/** y(px) 또는 요소로 스크롤. offset은 요소 기준 위쪽 여백 */
export function scrollToTarget(target, { offset = 0, immediate = false } = {}) {
  const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY - offset
  if (lenis) {
    // 라우트 전환 직후에는 이전 페이지의 높이가 남아 있을 수 있습니다.
    if (immediate) lenis.resize()
    lenis.scrollTo(y, { immediate })
  }
  else window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
}

/** 모달을 보는 동안 배경 Lenis 스크롤만 일시 중지. */
export function pauseScroll() {
  const current = lenis
  const wasStopped = current?.isStopped
  current?.stop()
  return () => { if (current && lenis === current && !wasStopped) current.start() }
}
