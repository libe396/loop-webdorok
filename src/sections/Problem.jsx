import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollProgress, { prefersReducedMotion } from '../lib/useScrollProgress'
import './problem.css'

const SENT = '측정은 AI로 고도화됐는데, 일상은 왜 그대로일까요?'.split(' ')
const STATS = [
  { value: '32만 명', label: '매년 국민체력100에서 체력을 인증합니다', source: '출처 · 데스크 리서치 r008', section: 'desk', slide: 'r008' },
  { value: '4.6%', label: '과학적 체력관리를 실천하는 국민', source: '출처 · 데스크 리서치 r009', section: 'desk', slide: 'r009' },
  { value: '3일~1주', label: '방문자 인터뷰에서 나타난 처방 중단 시점', source: '출처 · 방문자 인터뷰 6명(2026) · r062·r071', section: 'interview', slide: 'r071' },
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
          <p className="t24 medium accent">THE GAP</p>
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
