import { useRef } from 'react'
import useScrollProgress, { prefersReducedMotion } from '../lib/useScrollProgress'
import { img } from '../data/screens'
import './band.css'

/* S06 LOOP band — band-cut.webp = band.webp 흰 배경을 투명으로 뺀 것(그림자는 반투명 유지).
   스크롤하면 밴드가 돌아 서고, 멈춘 자리마다 기능 핫스팟이 켜진다.
   이미지 한 장(2701:56643)이라 3D 회전 대신 기울기·스케일로. 카피는 S01·S03에 쓴 문장 안에서만 */
const SPOTS = [
  { at: 0.22, x: 13, y: 47, side: 'l', k: '심박', v: '운동하는 동안 심박을 읽어요' },
  { at: 0.44, x: 76, y: 24, side: 'r', k: '수면', v: '어젯밤 수면으로 회복을 가늠해요' },
  { at: 0.66, x: 50, y: 60, side: 'b', k: '강도 자동 조절', v: '회복 지연이면 20분 → 10분 걷기' },
]

export default function Band() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const raw = useScrollProgress(ref)
  const p = reduced ? 1 : raw
  const e = 1 - Math.pow(1 - Math.min(1, p / 0.7), 3) // 0→.7 동안 제자리로
  const style = {
    '--rx': `${(1 - e) * 38}deg`,
    '--rz': `${(1 - e) * -14}deg`,
    '--s': 0.82 + e * 0.18,
    '--ty': `${(1 - e) * 60}px`,
  }
  return (
    <section className="band" id="next" ref={ref}>
      <div className="band-pin section">
        <span className="band-blob" aria-hidden="true" />
        <div className="inner band-in">
          <div className="head band-copy">
            <p className="eyebrow">COMING NEXT</p>
            <h2 className="t56 semibold">LOOP band</h2>
            <p className="t24 semibold">손목의 AIoT 밴드가 오늘 컨디션을 읽고,<br className="br-l" /> 루틴 강도를 알아서 조절합니다.</p>
            <span className="chip is-lime band-chip">Coming next</span>
          </div>

          <div className="band-stage" style={style}>
            <div className="band-obj">
              <img src={img('band-cut.webp')} alt="LOOP band — 로고가 새겨진 보라색 실리콘 밴드" draggable="false" />
              {SPOTS.map((s) => (
                <div key={s.k} className={`spot is-${s.side} ${p >= s.at ? 'is-on' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                  <i className="spot-dot" />
                  <span className="spot-line" />
                  <div className="spot-card glass-frost">
                    <b className="t16 semibold">{s.k}</b>
                    <span className="t14 medium">{s.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="band-list">
            {SPOTS.map((s) => (
              <li key={s.k} className={`glass-frost ${p >= s.at ? 'is-on' : ''}`}><b className="t16 semibold">{s.k}</b><span className="t14 medium">{s.v}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
