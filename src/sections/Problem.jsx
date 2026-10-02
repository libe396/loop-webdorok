import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollProgress, { prefersReducedMotion } from '../lib/useScrollProgress'
import './problem.css'

const SENT = '측정은 고도화됐지만, 변화로 이어지지는 않았습니다'.split(' ')
// 인쇄도록 포스터 3492:18147 PROBLEM 설문 수치 · 근거 장표는 리서치 survey r037·r038·r039
const STATS = [
  { value: '44%', label: '운동 루틴이 없는 응답자', source: '출처 · 설문조사 70명 · Q7', section: 'survey', slide: 'r037' },
  { value: '64%', label: '꾸준히 못 하는 이유 1위, 시간 부족', source: '출처 · 설문조사 70명 · Q9', section: 'survey', slide: 'r038' },
  { value: '60%', label: '전문가 대면 서비스가 필요하다는 응답', source: '출처 · 설문조사 70명 · Q14', section: 'survey', slide: 'r039' },
]
const clamp = (v) => Math.min(1, Math.max(0, v))

export default function Problem() {
  const ref = useRef(null)
  const progress = useScrollProgress(ref, 'entry')
  const reduced = prefersReducedMotion()
  const p = reduced ? 1 : progress
  const [entered, setEntered] = useState(reduced)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect() }
    }, { threshold: 0.15 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const line = clamp((p - 0.3) / 0.3)
  return (
    <section className={`problem ${entered ? 'is-entered' : ''}`} ref={ref} id="problem">
      <div className="problem-pin section">
        <div className="inner problem-in">
          <p className="t24 medium accent">문제</p>
          <h2 className="t56 semibold problem-sent">
            {SENT.map((w, i) => (
              <span key={i}><span style={{ opacity: p > ((i + 0.5) / SENT.length) * 0.4 ? 1 : 0.14 }}>{w}</span>{w.endsWith(',') ? <br /> : ' '}</span>
            ))}
          </h2>
          <div className="gapline" aria-hidden="true">
            <div className="gl-base" />
            <div className="gl-prog" style={{ width: `${line * 52}%` }} />
            <i className="gl-dot" style={{ left: 0 }} /><i className="gl-dot is-cut" style={{ left: '52%' }} />
            <span style={{ left: 0 }}>측정</span><span style={{ left: '52%' }}>결과지</span><span style={{ right: 0 }} className="is-faint">일상</span>
          </div>
          <div className="problem-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <b className="t56 semibold">{s.value}</b>
                <span className="t16 medium muted">{s.label}</span>
                <Link className="problem-source t14 medium label" to={`/archive/research?section=${s.section}&slide=${s.slide}`}>{s.source} →</Link>
              </div>
            ))}
          </div>
          <figure className="problem-quote">
            <span className="pq-av" aria-hidden="true" />
            <blockquote className="t24 semibold">“건강은 신경 쓰이는데, 운동을 어떻게 시작하고 꾸준히 해야 할지는 항상 막막해요.”</blockquote>
            <figcaption className="t14 medium muted">김지연, 27세 마케터 · 메인 퍼소나</figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
