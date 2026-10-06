import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import './problem.css'

// 인쇄도록 포스터 3492:18147 PROBLEM 설문 수치 · 근거 장표는 리서치 survey r037·r038·r039
const STATS = [
  { value: '44%', label: '운동 루틴이 없는 응답자', source: '출처 · 설문조사 70명 · Q7', section: 'survey', slide: 'r037' },
  { value: '64%', label: '꾸준히 못 하는 이유 1위, 시간 부족', source: '출처 · 설문조사 70명 · Q9', section: 'survey', slide: 'r038' },
  { value: '60%', label: '전문가 대면 서비스가 필요하다는 응답', source: '출처 · 설문조사 70명 · Q14', section: 'survey', slide: 'r039' },
]

export default function Problem() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const [entered, setEntered] = useState(reduced)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <section className={`problem ${entered ? 'is-entered' : ''}`} ref={ref} id="problem">
      <div className="problem-pin section">
        <div className="inner problem-in">
          <p className="t24 medium accent">문제</p>
          <h2 className="t36 semibold">측정은 했지만, 꾸준히 운동하기는 어려웠습니다.</h2>
          <div className="problem-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <b className="t56 semibold">{s.value}</b>
                <span className="t16 medium muted">{s.label}</span>
                <Link className="problem-source t14 medium label" to={`/archive/research?section=${s.section}&slide=${s.slide}`}>{s.source} →</Link>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
