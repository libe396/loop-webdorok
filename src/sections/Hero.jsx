import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Phone from '../components/Phone'
import Glass from '../components/Glass'
import Button from '../components/Button'
import { PROTOTYPE_URL } from '../data/links'
import { screen, img } from '../data/screens'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import './hero.css'

function DotRing({ done = 11, total = 16 }) {
  const pts = Array.from({ length: total }, (_, i) => {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2
    return [28 + 22 * Math.cos(a), 28 + 22 * Math.sin(a)]
  })
  return (
    <svg viewBox="0 0 56 56" className="dotring" aria-hidden="true">
      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={2.6} fill={i < done ? 'var(--violet-500)' : 'var(--gray-200)'} />)}
    </svg>
  )
}

export default function Hero() {
  const root = useRef(null)
  const [bandOk, setBandOk] = useState(true)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      // S00 인트로가 끝난 뒤 재생
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      if (window.__loopIntroDone) tl.play()
      else window.addEventListener('loop:intro-done', () => tl.play(), { once: true })
      tl.from('.hero-line > span', { yPercent: 110, duration: 1.1, stagger: 0.12 })
        .from('.hero-eyebrow, .hero-sub, .hero-btns', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.8')
        .from('.hero-phone', { y: 80, opacity: 0, rotate: 2, duration: 1.3 }, '-=1.0')
        .from('.hero-card', { y: 32, opacity: 0, duration: 0.9, stagger: 0.14 }, '-=0.8')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-bg" style={{ backgroundImage: `url(${img('hero-ribbon.webp')})` }} aria-hidden="true" />
      <div className="hero-fade" aria-hidden="true" />
      <div className="hero-in">
        <div className="hero-copy">
          <p className="hero-eyebrow t24 medium accent">국민체력 LOOP</p>
          <h1 className="t56 semibold">
            <span className="hero-line"><span>측정에서 끝나지 않는</span></span>
            <span className="hero-line"><span>건강의 선순환</span></span>
          </h1>
          <p className="hero-sub t20 medium muted">
            국민체력100 측정 결과를 AI가 생활 언어로 풀고,<br className="br-l" />
            5분 첫 행동부터 12주 실천, 변화 확인까지 이어줍니다.
          </p>
          <div className="hero-btns">
            {PROTOTYPE_URL && <Button href={PROTOTYPE_URL} target="_blank" rel="noopener">프로토타입 체험</Button>}
            <Button variant="line" href="#/archive/research">리서치 과정 보기</Button>
          </div>
        </div>

        <div className="hero-visual">
          <Phone className="hero-phone" src={screen('h0')} code="H-0 홈" width="36.2cqw" />
          <Glass className="glass-frost hero-card card-cond">
            <span className="cond-ic">zZ</span>
            <span><span className="t14 medium muted">오늘 컨디션 · 회복 지연</span><b className="t20 semibold">20분 → 10분 걷기</b></span>
          </Glass>
          <Glass className="glass-frost hero-card card-band">
            <span className="band-img">
              {bandOk ? <img src={img('band.webp')} alt="LOOP band" onError={() => setBandOk(false)} /> : <span className="band-ph" />}
            </span>
            <b className="t16 semibold">LOOP band</b>
            <span className="t12 medium accent">Coming next</span>
          </Glass>
          <Glass className="glass-frost hero-card card-remeasure">
            <DotRing />
            <span><span className="t14 medium muted">재측정까지</span><b className="t20 semibold">11일 남았어요</b></span>
          </Glass>
        </div>
      </div>
      <div className="hero-foot t14 medium label">
        <span>SCROLL ↓</span>
        <span>국민체력100 서비스 경험 리뉴얼 · 디자인씽킹스튜디오 2026</span>
      </div>
    </section>
  )
}
