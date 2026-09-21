import { useEffect, useMemo, useRef } from 'react'
import useScrollProgress from '../lib/useScrollProgress'
import Phone from '../components/Phone'
import Glass from '../components/Glass'
import { screen } from '../data/screens'
import './loop.css'

/* ∞ (Bernoulli lemniscate) — Figma S03 Hi-Fi와 같은 식 */
const W = 760, H = 400
const PTS = Array.from({ length: 241 }, (_, i) => {
  const t = (i / 240) * Math.PI * 2
  const s = 1 + Math.sin(t) ** 2
  return [W / 2 + (W / 2 - 28) * Math.cos(t) / s, H / 2 + (W / 2 - 28) * Math.sin(t) * Math.cos(t) / s * 1.2]
})
const pathOf = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
const FULL = pathOf(PTS)

const STATIONS = [
  { i: 30, n: '01', when: 'D-0', en: 'MEASURE', ko: '측정', code: 'm0', label: 'M-0 측정',
    title: '태그만 찍으면,\n언제든 측정', body: '무인 스테이션에서 혼자 측정하고, 결과는 생활 언어로 풀어줍니다.', chips: ['무인 측정', '일상 언어 해석', '체력 유형'] },
  { i: 90, n: '02', when: 'D-1', en: 'MOVE', ko: '실천', code: 'r00', label: 'R-00 루틴',
    title: '부족한 것부터,\n5분 첫 행동', body: '측정 결과로 우선순위를 정하고, 오늘 할 수 있는 한 가지부터 12주 미션으로 이어갑니다.', chips: ['5분 첫 행동', '12주 미션', '공공 운동 코스'] },
  { i: 150, n: '03', when: '6주차', en: 'GROW', ko: '성장', code: 'ai', label: 'AI 코치',
    title: '오늘 컨디션에 맞춰\n강도 조절', body: 'LOOP band가 수면과 심박을 읽고 강도를 바꿉니다. 궁금한 건 AI 코치에게 물어보세요.', chips: ['강도 사다리', 'LOOP band', 'AI 코치'] },
  { i: 210, n: '04', when: '12주차', en: 'REPORT', ko: '리포트', code: 'h4', label: 'H-4 무브바디',
    title: '눈바디 말고,\n무브바디', body: '움직임이 어떻게 달라졌는지 보여주고, 다음 측정으로 다시 이어집니다.', chips: ['무브바디', '변화 리포트', '재측정 D-90'] },
]
const START = 10, END = 240 + 10 // 한 바퀴 + Measure 직전까지

export default function Loop() {
  const ref = useRef(null)
  const pinRef = useRef(null)
  useEffect(() => {
    const pin = pinRef.current
    // A tall mobile panel must scroll far enough to reveal the card below the phone.
    const update = () => pin.style.setProperty('--loop-pin-top', `${Math.min(0, window.innerHeight - pin.offsetHeight)}px`)
    const observer = new ResizeObserver(update)
    observer.observe(pin)
    window.addEventListener('resize', update)
    update()
    return () => { observer.disconnect(); window.removeEventListener('resize', update) }
  }, [])
  const p = useScrollProgress(ref)
  const head = START + p * (END - START) // 0..250 (240 넘으면 다시 처음 = loop)
  const idx = Math.floor(head) % 240
  const runner = PTS[idx]
  const progPath = useMemo(() => pathOf(PTS.slice(START, Math.min(240, Math.floor(head)) + 1)), [head])
  let active = 0
  STATIONS.forEach((s, k) => { if (head >= s.i - 4) active = k })
  const looped = head >= 240
  if (looped) active = 0
  const st = STATIONS[active]
  const prev = STATIONS[(active + 3) % 4]

  return (
    <section className="loop" ref={ref} id="service">
      <div className="loop-pin section" ref={pinRef}>
        <div className="inner loop-in">
          <div className="loop-left">
            <div className="head">
              <p className="eyebrow">HOW LOOP WORKS</p>
              <h2 className="t48 semibold">한 번 측정하면,<br />루틴은 계속됩니다.</h2>
              <p className="t20 medium muted loop-sub">측정 → 실천 → 성장 → 리포트. 스크롤을 내리면 점이 한 바퀴를 돕니다.</p>
            </div>
            <div className="loop-mobile-progress" aria-label={`현재 단계 ${active + 1} / 4`}>
              <div className="loop-progress-dots" aria-hidden="true">{STATIONS.map((s, k) => <i key={s.en} className={k === active ? 'is-on' : ''} />)}</div>
              <p className="t16 medium accent">{st.when} · {st.en} · {st.ko}</p>
            </div>
            <svg className="inf" viewBox={`-20 -40 ${W + 40} ${H + 90}`} aria-hidden="true">
              <defs>
                <linearGradient id="infGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
                  <stop offset="0" stopColor="#495AEE" /><stop offset="1" stopColor="#B9C2FA" />
                </linearGradient>
              </defs>
              <path d={FULL} className="inf-track" />
              {!looped && <path d={progPath} className="inf-prog" />}
              {STATIONS.map((s, k) => {
                const [x, y] = PTS[s.i]
                const done = head >= s.i - 4 && !looped
                const on = k === active
                const below = y > H / 2
                return (
                  <g key={s.en}>
                    {on && <circle cx={x} cy={y} r="30" className="inf-halo" />}
                    <circle cx={x} cy={y} r={on ? 14 : 11} className={`inf-st ${done || on ? 'is-done' : ''} ${on ? 'is-on' : ''}`} />
                    {on ? (
                      <g transform={`translate(${x - 58} ${below ? y + 30 : y - 70})`}>
                        <rect width={s.en.length > 5 ? 156 : 132} height="40" rx="20" className="inf-pill" />
                        <text x="18" y="25" className="inf-pill-en">{s.n} {s.en}</text>
                        <text x={(s.en.length > 5 ? 156 : 132) - 18} y="26" textAnchor="end" className="inf-pill-ko">{s.ko}</text>
                      </g>
                    ) : (
                      <text x={x} y={below ? y + 40 : y - 26} className={`inf-lb ${done ? 'is-done' : ''}`}>{s.n} {s.en}</text>
                    )}
                  </g>
                )
              })}
              <circle cx={runner[0]} cy={runner[1]} r="34" className="inf-glow" />
              <circle cx={runner[0]} cy={runner[1]} r="16" className="inf-runner" />
            </svg>
          </div>

          <div className="loop-right">
            <div className="loop-phones">
              {STATIONS.map((s, k) => (
                <Phone key={s.code} src={screen(s.code)} code={s.label} width="100cqw"
                  className={`loop-phone ${s.code === 'ai' ? 'loop-phone--grow' : ''} ${k === active ? 'is-on' : k === (active + 3) % 4 ? 'is-prev' : ''}`} />
              ))}
            </div>
            <Glass className="loop-card glass-frost" key={st.en}>
              <p className="t18 semibold accent">{st.when} · {st.en}</p>
              <h3 className="t36 semibold">{st.title.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}</h3>
              <p className="t18 medium muted">{st.body}</p>
              <div className="loop-chips">
                {st.chips.map((c, i) => <span key={c} className={`chip ${i === 0 ? 'is-lime' : ''}`}>{c}</span>)}
              </div>
            </Glass>
          </div>

          <span className="loop-hint t14 medium label">{looped ? '↺ 다시 MEASURE로' : prev && 'SCROLL ↓'}</span>
        </div>
      </div>
    </section>
  )
}
