import { useEffect, useRef } from 'react'
import useScrollProgress, { prefersReducedMotion } from '../lib/useScrollProgress'
import Phone from '../components/Phone'
import { screen } from '../data/screens'
import './focus.css'

/* S05 Focus — 측정·운동 중엔 앱이 다크로 바뀌는 규칙을 사이트가 그대로 따라 한다.
   Hi-Fi 페이지 "무인 측정 진행 — 다크 v2" 섹션 화면 순서 그대로 (카피 = 화면 제목) */
const STEPS = [
  { code: 's0', label: 'S0', title: '측정 모드로 전환되었어요', body: '측정이 시작되면 화면부터 어두워져요.' },
  { code: 'a1', label: 'A1', title: '기기에 태그를 대주세요', body: '폰을 대면 기기와 종목이 바로 잡혀요.' },
  { code: 'a2', label: 'A2', title: '3초 후 측정을 시작해요', body: '자세 안내를 보고, 카운트다운 뒤 시작.' },
  { code: 'a3', label: 'A3', title: '천천히 앞으로 숙여요', body: '측정 중엔 지금 값 하나만 크게.' },
  { code: 'a4', label: 'A4', title: '12.4cm 기록했어요', body: '끝나면 자동 기록, 다음 종목으로.' },
  { code: 's9', label: 'S9', title: '6종목 측정을 모두 마쳤어요', body: '측정이 끝나면 다시 밝아져요.' },
]

export default function Focus() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const p = useScrollProgress(ref)
  // 0→.12 어두워짐 · .12→.86 다크 화면 5장 · .86→.94 다시 밝아짐(S9)
  const d = reduced ? 0 : p < 0.12 ? p / 0.12 : p < 0.86 ? 1 : Math.max(0, 1 - (p - 0.86) / 0.08)
  const i = p >= 0.86 ? 5 : Math.min(4, Math.floor(Math.max(0, p - 0.06) / 0.16))

  // GNB도 같이 어두워지게
  useEffect(() => {
    document.documentElement.classList.toggle('is-focus-dark', d > 0.5)
    return () => document.documentElement.classList.remove('is-focus-dark')
  }, [d])

  return (
    <section className="focus" id="focus" ref={ref} style={{ '--d': d }}>
      <div className="focus-pin section">
        <div className="inner focus-in">
          <div className="focus-copy">
            <div className="head">
              <p className="eyebrow focus-eb">FOCUS MODE</p>
              <h2 className="t48 semibold">움직이는 동안엔,<br />화면이 어두워집니다.</h2>
              <p className="t20 medium focus-sub">측정과 운동 중엔 다크 모드로. 필요한 값 하나만 남기고 다 끕니다.</p>
            </div>
            <ol className="focus-steps">
              {STEPS.map((s, k) => (
                <li key={s.code} className={k === i ? 'is-on' : k < i ? 'is-done' : ''}>
                  <span className="t14 medium focus-no">{String(k + 1).padStart(2, '0')}</span>
                  <div>
                    <b className="t20 semibold">{s.title}</b>
                    <span className="t16 medium focus-body">{s.body}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="focus-visual">
            <span className="focus-glow" aria-hidden="true" />
            <div className="focus-phones">
              {STEPS.map((s, k) => (
                <Phone key={s.code} src={screen(s.code)} code={s.label} width="100cqw"
                  className={`focus-phone ${k === i ? 'is-on' : ''}`} />
              ))}
            </div>
            <p className="focus-count t14 medium" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
