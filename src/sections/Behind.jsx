import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHAPTERS } from '../data/archive'
import './behind.css'

/* S08 Behind — 뒷면(아카이브)으로 가는 문. 실제 장표가 두 줄로 흘러서 "이만큼 했다"를 먼저 보여준다 */
const NUMS = [[12, '주', '리서치 기간'], [70, '명', '설문 응답'], [2562, '개', '경쟁 앱 리뷰 분석'], [6, '곳', '체력인증센터 넷노그라피']]

const DECISIONS = [
  { from: '탭 5개', to: '4개', why: '코스 탭을 없애고 루틴 안에서 실내·실외를 함께. 차별점은 측정 → 처방.' },
  { from: '코스 = 장소', to: '미션', why: '코스 자체를 처방되는 운동 세션으로. ‘10분 미션에 32분 코스’가 사라짐.' },
  { from: '8블록', to: '4블록', why: '구려 보이는 원인은 장식 부족이 아니라 정보 과다.' },
]

/* 챕터별 장표를 고르게 뽑아 썸네일(960) 목록으로 */
const pick = (ids, n) => {
  const all = CHAPTERS.filter((c) => ids.includes(c.id)).flatMap((c) => c.sections.flatMap((s) => s.slides.map((sl) => ({ ...sl, ch: c.id }))))
  const step = Math.max(1, Math.floor(all.length / n))
  return all.filter((_, i) => i % step === 0).slice(0, n)
}
const ROW_A = pick(['research'], 14)
const ROW_B = pick(['plan', 'make'], 12)

function Count({ to, unit }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / 1400)
        setV(Math.round(to * (1 - Math.pow(1 - k, 3))))
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <b ref={ref} className="t56 semibold">{v.toLocaleString('ko-KR')}{unit}</b>
}

function Row({ items, reverse }) {
  // 같은 목록 두 번 → -50% 이동하면 이음새 없이 반복
  return (
    <div className={`mq ${reverse ? 'is-rev' : ''}`}>
      <div className="mq-track">
        {[...items, ...items].map((s, i) => (
          <Link key={`${s.id}-${i}`} to={`/archive/${s.ch}`} className="mq-item" aria-hidden={i >= items.length} tabIndex={i >= items.length ? -1 : 0}>
            <img src={s.src.replace(/\.webp$/, '@960.webp')} alt={i < items.length ? `${s.ch} 장표 ${s.id}` : ''} loading="lazy" draggable="false" />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Behind() {
  return (
    <section className="behind" id="behind">
      <div className="section behind-top">
        <div className="inner">
          <div className="head">
            <p className="eyebrow">BEHIND LOOP</p>
            <h2 className="t48 semibold">12주 동안,<br />측정 다음을 파고들었습니다.</h2>
          </div>
          <div className="nums">
            {NUMS.map(([v, u, l]) => <div key={l}><Count to={v} unit={u} /><span className="t16 medium muted">{l}</span></div>)}
          </div>
        </div>
      </div>

      <div className="mqs" aria-label="리서치·기획·제작 장표">
        <Row items={ROW_A} />
        <Row items={ROW_B} reverse />
      </div>

      <div className="section behind-dec">
        <div className="inner dec-in">
          <div className="head dec-head">
            <p className="eyebrow">DECISIONS</p>
            <h3 className="t36 semibold">리서치가 바꾼 것들</h3>
            <p className="t18 medium muted">장표는 결과가 아니라 결정의 근거입니다.</p>
            <div className="ch-links">
              {CHAPTERS.map((c, i) => (
                <Link key={c.id} to={`/archive/${c.id}`} className={`ch-link ${c.count ? '' : 'is-empty'}`}>
                  <span className="t14 medium label">{String(i + 1).padStart(2, '0')}</span>
                  <b className="t18 semibold">{c.title}</b>
                  <span className="t14 medium muted">{c.count ? `${c.count}장` : '공개 예정'}</span>
                  <i aria-hidden="true">→</i>
                </Link>
              ))}
            </div>
          </div>
          <ol className="dec-stack">
            {DECISIONS.map((d, i) => (
              <li key={d.from} className="dec-card" style={{ '--i': i }}>
                <span className="t14 medium dec-no">DECISION {String(i + 1).padStart(2, '0')}</span>
                <p className="t48 semibold dec-ft"><s>{d.from}</s><span aria-hidden="true">→</span>{d.to}</p>
                <p className="t20 medium">{d.why}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
