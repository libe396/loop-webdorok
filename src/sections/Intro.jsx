import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Wordmark } from '../components/Wordmark'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import './intro.css'

/**
 * S00 인트로 — 도트 숫자 100 → l o o → + p → loop 워드마크 → GNB 로고 자리로.
 * 세션당 1회. 스킵 가능. reduced-motion이면 생략.
 * 끝나면 window에 'loop:intro-done' 이벤트 (Hero 등장 모션이 이걸 기다림)
 */
const KEY = 'loop-intro-seen'
const seen = () => { try { return sessionStorage.getItem(KEY) === '1' } catch { return false } }
export const introDone = () => {
  try { sessionStorage.setItem(KEY, '1') } catch { /* 무시 */ }
  window.__loopIntroDone = true
  window.dispatchEvent(new Event('loop:intro-done'))
}

export default function Intro() {
  const root = useRef(null)
  const tl = useRef(null)
  const [show, setShow] = useState(() => !seen() && !prefersReducedMotion() && !location.hash.startsWith('#/'))

  useEffect(() => {
    if (!show) { introDone(); return }
    document.documentElement.style.overflow = 'hidden'
    const finish = () => { document.documentElement.style.overflow = ''; setShow(false); introDone() }
    const ctx = gsap.context(() => {
      const logo = document.querySelector('.gnb-logo svg')
      const wm = root.current.querySelector('.intro-wm')
      const t = gsap.timeline({ onComplete: finish })
      t.from('.intro-num', { opacity: 0, scale: 0.94, duration: 0.6, ease: 'power2.out' })
        // 1 → l, 0 → o
        .to('.g-a', { yPercent: -40, opacity: 0, duration: 0.45, stagger: 0.06, ease: 'power3.in' }, '+=0.35')
        .fromTo('.g-b', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out' }, '<0.25')
        // + p
        .to('.g-p', { width: '0.6em', opacity: 1, duration: 0.6, ease: 'expo.out' }, '+=0.15')
        // 글자 → 워드마크
        .to('.intro-num', { opacity: 0, duration: 0.35 }, '+=0.3')
        .fromTo(wm, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, '<')
        .add(() => {
          if (!logo) return
          const a = wm.getBoundingClientRect(), b = logo.getBoundingClientRect()
          gsap.to(wm, { x: b.left + b.width / 2 - (a.left + a.width / 2), y: b.top + b.height / 2 - (a.top + a.height / 2), scale: b.width / a.width, duration: 0.8, ease: 'expo.inOut' })
        }, '+=0.25')
        .to('.intro-bg', { opacity: 0, duration: 0.5, ease: 'power1.out' }, '+=0.55')
        .to(wm, { opacity: 0, duration: 0.2 }, '-=0.1')
      tl.current = t
    }, root)
    const onKey = (e) => { if (e.key === 'Escape') tl.current?.progress(1) }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); ctx.revert(); document.documentElement.style.overflow = '' }
  }, [show])

  if (!show) return null
  return (
    <div className="intro" ref={root} role="presentation">
      <div className="intro-bg" />
      <div className="intro-num" aria-hidden="true">
        <span className="g"><span className="g-a">1</span><span className="g-b">l</span></span>
        <span className="g"><span className="g-a">0</span><span className="g-b">o</span></span>
        <span className="g"><span className="g-a">0</span><span className="g-b">o</span></span>
        <span className="g g-p">p</span>
      </div>
      <div className="intro-wm"><Wordmark height="100%" /></div>
      <button className="intro-skip t14 medium" onClick={() => tl.current?.progress(1)}>건너뛰기</button>
    </div>
  )
}
