import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useScrollProgress, { prefersReducedMotion } from '../lib/useScrollProgress'
import { Wordmark } from '../components/Wordmark'
import './brand.css'

/* S09 Brand — 스크롤하면 워드마크가 옷을 갈아입는다. 한 화면엔 그라디언트 하나만 */
const LOOKS = [
  { k: 'Violet', when: '기본', g: null },
  { k: 'Intelligence', when: 'AI 해석', g: { id: 'bI', from: '#495AEE', to: '#DBDEFF' } },
  { k: 'Delight', when: '환영과 성취의 순간', g: { id: 'bD', from: '#F7A27A', to: '#EFB9EE' } },
  { k: 'Clarity', when: '데이터가 선명해지는 순간', g: { id: 'bC', from: '#8ED6E4', to: '#D2F964' } },
]

export default function Brand() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const p = useScrollProgress(ref, 'entry')
  const i = reduced ? 0 : Math.min(3, Math.floor(p * 4.4))
  return (
    <section className="brand-s" id="brand" ref={ref}>
      <div className="brand-pin section">
        <div className="inner brand-in">
          <div className="head brand-copy">
            <p className="eyebrow">BRAND &amp; DESIGN SYSTEM</p>
            <h2 className="t48 semibold">100이 loop가<br />되기까지.</h2>
            <p className="t20 medium muted">숫자 100과 이어지는 고리. 측정과 실천이 반복되는 선순환을 로고로 만들고, 컴포넌트 40개와 아이콘 371개로 넓혔습니다.</p>
            <ol className="looks">
              {LOOKS.map((l, k) => (
                <li key={l.k} className={k === i ? 'is-on' : ''}>
                  <b className="t18 semibold">{l.k}</b>
                  <span className="t16 medium">{l.when}</span>
                </li>
              ))}
            </ol>
            <Link to="/archive/make" className="brand-more t16 semibold">브랜드 · 디자인 시스템 장표 보기 →</Link>
          </div>

          <div className="brand-stage">
            <div className="brand-marks">
              {LOOKS.map((l, k) => (
                <span key={l.k} className={`brand-mark ${k === i ? 'is-on' : ''}`} style={{ color: 'var(--violet-500)' }}>
                  <Wordmark height="100%" gradient={l.g} />
                  <span className="brand-tile-caption t14 medium">{l.k} · {l.when}</span>
                </span>
              ))}
            </div>
            <p className="brand-note t18 medium" key={i}><span className="t14 semibold">{LOOKS[i].k}</span>{LOOKS[i].when}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
