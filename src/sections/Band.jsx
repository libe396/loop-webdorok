import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/useScrollProgress'
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
  const stageRef = useRef(null)
  const objectRef = useRef(null)
  const cardsRef = useRef([])
  const [placements, setPlacements] = useState([])
  const reduced = prefersReducedMotion()
  const [entered, setEntered] = useState(reduced)
  useEffect(() => {
    if (reduced) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setEntered(true)
      observer.disconnect()
    }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [reduced])
  useLayoutEffect(() => {
    const stage = stageRef.current
    const object = objectRef.current
    let raf = 0
    const measure = () => {
      if (window.innerWidth <= 1024) {
        setPlacements(previous => previous.length ? [] : previous)
        return
      }
      const bounds = stage.getBoundingClientRect()
      const product = object.getBoundingClientRect()
      const gap = parseFloat(getComputedStyle(stage).getPropertyValue('--spot-gap'))
      const inset = gap / 2
      const placed = []
      const intersects = (a, b) => a.left < b.left + b.width + gap && a.left + a.width + gap > b.left && a.top < b.top + b.height + gap && a.top + a.height + gap > b.top
      SPOTS.forEach((spot, i) => {
        const card = cardsRef.current[i].getBoundingClientRect()
        const x = product.left - bounds.left + product.width * spot.x / 100
        const y = product.top - bounds.top + product.height * spot.y / 100
        const preferred = window.innerWidth <= 1600 ? ['b', 'l', 'b'][i] : spot.side
        const sides = [...new Set([preferred, preferred === 'l' ? 'r' : 'l', 'b', 'r'])]
        const candidate = (side) => ({
          side, x, y, width: card.width, height: card.height,
          left: side === 'l' ? x - gap - card.width : side === 'r' ? x + gap : x - card.width / 2,
          top: side === 'b' ? y + gap : y - card.height / 2,
        })
        const fits = c => c.left >= inset && c.left + c.width <= bounds.width - inset && c.top >= inset && c.top + c.height <= bounds.height - inset && !placed.some(p => p && intersects(c, p))
        let chosen
        for (const side of sides) {
          const c = candidate(side)
          // Below cards can shift along the stage edge; keep their connector attached.
          if (side === 'b') c.left = Math.max(inset, Math.min(c.left, bounds.width - c.width - inset))
          if (fits(c)) { chosen = c; break }
        }
        if (!chosen) {
          // Resolve card-to-card collisions without escaping the stage.
          for (const top of [y + gap, ...placed.filter(Boolean).map(p => p.top + p.height + gap)]) {
            for (const left of [inset, bounds.width - card.width - inset]) {
              const c = { ...candidate('b'), top, left }
              if (fits(c)) { chosen = c; break }
            }
            if (chosen) break
          }
        }
        placed[i] = chosen ?? null
      })
      setPlacements(previous => JSON.stringify(previous) === JSON.stringify(placed) ? previous : placed)
    }
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure) }
    const observer = new ResizeObserver(schedule)
    observer.observe(stage)
    observer.observe(object)
    cardsRef.current.forEach(card => { if (card) observer.observe(card) })
    window.addEventListener('resize', schedule)
    measure()
    return () => { observer.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('resize', schedule) }
  }, [])

  const e = entered ? 1 : 0
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

          <div className="band-stage" ref={stageRef} style={style}>
            <div className="band-obj" ref={objectRef}>
              <img className="band-product" src={img('band-cut.webp')} alt="LOOP band — 로고가 새겨진 보라색 실리콘 밴드" draggable="false" />
            </div>
            {SPOTS.map((s, i) => {
              const p = placements[i]
              const delay = reduced ? '0s' : `${i * 0.4}s`
              const endX = p ? p.side === 'l' ? p.left + p.width : p.side === 'r' ? p.left : Math.max(p.left + 16, Math.min(p.x, p.left + p.width - 16)) : 0
              const endY = p ? p.side === 'b' ? p.top : p.top + p.height / 2 : 0
              return (
                <div key={s.k} className={`spot ${entered ? 'is-on' : ''}`} data-side={p?.side} style={{ '--spot-delay': delay }}>
                  {p && <svg className="spot-connector" aria-hidden="true"><path d={`M ${p.x} ${p.y} L ${endX} ${endY}`} /></svg>}
                  <i className="spot-dot" style={{ left: p?.x ?? `${s.x}%`, top: p?.y ?? `${s.y}%` }} />
                  <div ref={el => { cardsRef.current[i] = el }} className="spot-card glass-frost" style={{ left: p?.left ?? 0, top: p?.top ?? 0, visibility: p ? 'visible' : 'hidden' }}>
                    <b className="t16 semibold">{s.k}</b>
                    <span className="t14 medium">{s.v}</span>
                  </div>
                </div>
              )
            })}
          </div>

          <ul className="band-list">
            {SPOTS.map((s, i) => (
              <li key={s.k} style={{ '--spot-delay': reduced ? '0s' : `${i * 0.4}s` }} className={`glass-frost ${entered ? 'is-on' : ''}`}><b className="t16 semibold">{s.k}</b><span className="t14 medium">{s.v}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
