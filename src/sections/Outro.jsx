import { useRef, useState } from 'react'
import { WORDMARK_PATH } from '../data/logo'
import Button from '../components/Button'
import { scrollToTarget } from '../lib/scroll'
import './outro.css'

/* S10 Outro — 화면 폭을 채운 워드마크가 커서를 따라 그라디언트로 차오르고, "D-90 ↺"로 맨 위(S00)로 돌아간다 */
export default function Outro() {
  const svgRef = useRef(null)
  const ctaRef = useRef(null)
  const [pt, setPt] = useState(null) // viewBox 좌표 (0~271, 0~142)
  const [mag, setMag] = useState({ x: 0, y: 0 })

  const onMove = (e) => {
    const r = svgRef.current.getBoundingClientRect()
    setPt({ x: ((e.clientX - r.left) / r.width) * 271, y: ((e.clientY - r.top) / r.height) * 142 })
  }
  // 마그네틱 CTA: 버튼 반경 120px 안에서 커서 쪽으로 살짝 끌려옴
  const onCta = (e) => {
    const r = ctaRef.current.getBoundingClientRect()
    const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2)
    setMag(Math.hypot(dx, dy) < 120 ? { x: dx * 0.25, y: dy * 0.35 } : { x: 0, y: 0 })
  }
  const toTop = (e) => { e.preventDefault(); scrollToTarget(0) }

  return (
    <section className="section outro" id="prototype" onPointerMove={onCta} onPointerLeave={() => setMag({ x: 0, y: 0 })}>
      <div className="inner">
        <div className="outro-top">
          <h2 className="t48 semibold">직접 한 바퀴<br />돌아보세요.</h2>
          <div className="outro-cta">
            <span ref={ctaRef} className="magnet" style={{ transform: `translate(${mag.x}px, ${mag.y}px)` }}>
              <Button href="#">프로토타입 체험</Button>
            </span>
          </div>
        </div>

        <svg ref={svgRef} className={`outro-word ${pt ? 'is-live' : ''}`} viewBox="0 0 271 142" role="img" aria-label="loop"
          onPointerMove={onMove} onPointerLeave={() => setPt(null)}>
          <defs>
            <linearGradient id="oGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#495AEE" /><stop offset="1" stopColor="#DBDEFF" />
            </linearGradient>
            <radialGradient id="oSpot" gradientUnits="userSpaceOnUse" cx={pt?.x ?? 135} cy={pt?.y ?? 71} r={pt ? 90 : 400}>
              <stop offset="0" stopColor="#fff" /><stop offset=".55" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="oMask"><rect width="271" height="142" fill="url(#oSpot)" /></mask>
          </defs>
          <path d={WORDMARK_PATH} className="ow-base" />
          <path d={WORDMARK_PATH} fill="url(#oGrad)" mask="url(#oMask)" className="ow-fill" />
        </svg>

        <a href="#top" className="outro-again t24 semibold" onClick={toTop}>다음 측정까지 D-90 <span aria-hidden="true">↺</span></a>
        <footer className="foot t14 medium muted"><span>국민체력100 서비스 경험 리뉴얼 · 디자인씽킹스튜디오 2026</span><span>김제인 · 이서연</span></footer>
      </div>
    </section>
  )
}
