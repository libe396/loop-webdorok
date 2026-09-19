import { useRef } from 'react'
import useScrollProgress from '../lib/useScrollProgress'
import './problem.css'

const SENT = '측정은 AI로 고도화됐는데, 일상은 왜 그대로일까요?'.split(' ')
const STATS = [
  { to: 32, fmt: v => `${Math.round(v)}만 명`, label: '매년 국민체력100에서 체력을 인증합니다' },
  { to: 4.6, fmt: v => `${v.toFixed(1)}%`, label: '과학적 체력관리를 실천하는 국민' },
  { to: 1, fmt: v => (v >= 0.95 ? '3일~1주' : '3일~'), label: '처방을 받아도 대부분 이때 멈춥니다' },
]
const clamp = (v) => Math.min(1, Math.max(0, v))

export default function Problem() {
  const ref = useRef(null)
  const p = useScrollProgress(ref)
  const line = clamp((p - 0.3) / 0.3)
  const sp = clamp((p - 0.55) / 0.3)
  return (
    <section className="problem" ref={ref} id="problem">
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
                <b className="t56 semibold">{s.fmt(s.to * sp)}</b>
                <span className="t16 medium muted">{s.label}</span>
              </div>
            ))}
          </div>
          <figure className="problem-quote" style={{ opacity: clamp((p - 0.8) / 0.12) }}>
            <span className="pq-av" aria-hidden="true" />
            <blockquote className="t24 semibold">“건강은 신경 쓰이는데, 운동을 어떻게 시작하고 꾸준히 해야 할지는 항상 막막해요.”</blockquote>
            <figcaption className="t14 medium muted">김지연, 27세 마케터 · 메인 퍼소나</figcaption>
          </figure>
          <p className="t12 medium label">출처: 국민체육진흥공단 국민체력100 공식 자료 · 국민체력100 방문자 인터뷰(자체 조사)</p>
        </div>
      </div>
    </section>
  )
}
