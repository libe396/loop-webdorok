import { useEffect, useRef } from 'react'
import Phone from '../components/Phone'
import { screen, img } from '../data/screens'
import useScrollProgress from '../lib/useScrollProgress'
import './hero-scene.css'

export default function Hero() {
  const root = useRef(null)
  const question = useRef(null)
  useEffect(() => {
    const bubble = question.current
    if (!bubble || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    bubble.classList.add('is-waiting')
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return
      bubble.classList.remove('is-waiting')
      bubble.classList.add('is-popped')
      observer.disconnect()
    }, { threshold: .7 })
    observer.observe(bubble)
    return () => {
      observer.disconnect()
      bubble.classList.remove('is-waiting', 'is-popped')
    }
  }, [])
  const progress = useScrollProgress(root)
  const action = progress > .42
  const travel = Math.min(1, progress / .7)
  return (
    <section className="hero-scene" id="top" ref={root} style={{ '--scene-progress': travel }}>
      <div className="hero-scene-sticky" data-action={action}>
        <img className="hero-scene-photo" src={img('landing-running-violet.png')} alt="" aria-hidden="true" fetchPriority="high" />
        <header className="hero-scene-heading">
          <p className="kicker">체력 측정 결과를 오늘의 운동 루틴으로</p>
          <h1>측정의 끝에서,<br /><span>나의 lOOP가 시작됩니다.</span></h1>
        </header>
        <div className="hero-scene-stage">
          <div className="hero-dot-field" aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ '--dot-angle': `${i * 7.5}deg`, '--dot-size': `${4 + (i % 4) * 2}px` }} />)}</div>
          <div className="hero-scene-phone">
            <Phone key={action ? 'routine' : 'result'} src={screen(action ? 'r00' : 'h0')} code={action ? '오늘의 루틴' : '측정 후 홈'} width="100cqw" />
            <span className="hero-scene-tag">02 · 오늘의 실천</span>
          </div>

        </div>
        <footer className="hero-scene-footer">
          <span className="hero-scroll-cue">스크롤로 이어보기 <span aria-hidden="true">↓</span></span>
        </footer>
      </div>
      <div className="hero-bridge">
        <h2 className="hero-bridge-question" ref={question}><span className="hero-question-badge" aria-hidden="true">Q</span>체력 측정은 완료했는데, 오늘은 무엇부터 시작해야 할까요?</h2>
      </div>
    </section>
  )
}
