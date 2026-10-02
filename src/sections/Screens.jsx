import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import { screen } from '../data/screens'
import './screens.css'

/* S04b 핵심 화면 — 목업 없이 평면 화면을 크게. 설명·캡션은 인쇄도록 포스터 3492:18147 SOLUTION 문구 그대로.
   화면은 Hi-Fi LOOP · IA Screen Flow(2954:20125) 원본, 긴 화면은 첫 화면(402:874) 높이까지만 */
const SCREENS = [
  { code: 'm0', name: 'M-01 · 측정 홈', caption: '예약부터 측정까지' },
  { code: 'm05', name: 'M-05 · 센터 측정 진행', caption: '실시간 측정 기록' },
  { code: 'hr01', name: 'HR-01 · 건강 리포트 홈', caption: '나의 체력과 변화를 한눈에' },
  { code: 'r00', name: 'R-01 · 루틴 홈', caption: '맞춤 운동을 일상의 습관으로' },
  { code: 'c13', name: 'C-13 · AR 코칭 진행', caption: '운동 현장 AR 안내' },
  { code: 'hr04', name: 'HR-04 · 체력 변화 리포트', caption: '재측정으로 변화 확인' },
]

export default function Screens() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const [entered, setEntered] = useState(reduced)
  useEffect(() => {
    if (reduced) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setEntered(true)
      observer.disconnect()
    }, { threshold: 0.08 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section className={`section scr ${entered ? 'is-on' : ''}`} id="screens" ref={ref}>
      <div className="inner scr-in">
        <div className="head">
          <h2 className="t56 semibold">핵심 화면</h2>
          <p className="t24 semibold scr-desc">국민체력100의 측정 경험을 12주의 건강 루프로 연결했습니다</p>
        </div>
        <ul className="scr-grid">
          {SCREENS.map((s, i) => (
            <li key={s.code} className="scr-item" style={{ '--d': `${i * 0.1}s` }}>
              <div className="scr-frame">
                <img src={screen(s.code)} alt={`LOOP 앱 화면 · ${s.caption}`} loading="lazy" draggable="false" />
              </div>
              <p className="t20 semibold">{s.caption}</p>
            </li>
          ))}
        </ul>
        <Link className="more-link t16 semibold" to="/archive/result?section=mobile">전체 화면 보기 <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}
