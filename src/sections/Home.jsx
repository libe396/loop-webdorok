import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import { img, screen } from '../data/screens'
import './home.css'

/* S06b AIoT 기기 — 설명은 인쇄도록 3490:33243, 기능·캡션은 발표 PPT 「추출」 IOT-01~04 장표 문장 그대로.
   제품 컷: 인쇄도록 3490:33243의 이미지 채우기(「Iot목업 1」 3472:41263 자리)를 프레임 크롭 그대로. 원형 화면: 3059:24260 · 3054:267xx (2배수) */
const ROLES = [
  { k: '코칭 노트 동기화', v: '센터에서 처방사가 잡아준 첫 동작 코칭 정보가 집 기기로 전송됩니다.' },
  { k: '관절 17점 모션트래킹', v: '카메라가 자세를 관절 단위로 확인하고, 12주 전후 움직임을 비교합니다.' },
  { k: '음성 코칭', v: '운동 중에는 화면을 보기 어렵습니다. 다음 동작과 교정 포인트를 소리로 알려줍니다.' },
  { k: '컨디션 리마인드', v: '수면과 웨어러블 데이터를 반영해 오늘 루틴의 강도를 조정해 제안합니다.' },
]
const SCREENS = [
  { code: 'aiot-a00', name: '홈 (기본 화면)', caption: '날짜와 시계, 오늘의 루틴·걸음·심박 요약을 표시합니다.' },
  { code: 'aiot-a02', name: '리마인드 알림', caption: '수면 데이터를 반영해 강도를 조정한 루틴을 먼저 제안합니다.' },
  { code: 'aiot-a05', name: '운동 진행', caption: '외곽 도트로 세트 진행을, 가운데에 횟수와 지표를 표시합니다.' },
  { code: 'aiot-a06', name: '실시간 자세 코칭', caption: '과신전처럼 어긋난 자세를 짚고 음성 자막으로 알려줍니다.' },
  { code: 'aiot-a08', name: '루틴 완료', caption: '오늘 루틴의 수행 지표와 Day 진행 상황을 정리합니다.' },
  { code: 'aiot-a09', name: 'AI 음성 질문', caption: '말로 질문하면 루프 AI가 음성과 자막으로 답합니다.' },
]

export default function Home() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const [entered, setEntered] = useState(reduced)
  useEffect(() => {
    if (reduced) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setEntered(true)
      observer.disconnect()
    }, { threshold: 0.12 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [reduced])

  // GNB도 섹션 경계에서 바로 다크로 (데스크톱만, Focus와 같은 조건)
  useEffect(() => {
    const el = ref.current
    const update = () => {
      const r = el.getBoundingClientRect()
      const gnb = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gnb-h')) || 0
      document.documentElement.classList.toggle('is-aiot-dark', r.top <= gnb / 2 && r.bottom > gnb / 2 && window.innerWidth > 1024)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.documentElement.classList.remove('is-aiot-dark')
    }
  }, [])

  return (
    <section className={`section aiot ${entered ? 'is-on' : ''}`} id="aiot" ref={ref}>
      <div className="inner aiot-in">
        <div className="aiot-top">
          <figure className="aiot-product">
            <img src={img('aiot-front.webp')} alt="loop AIoT 디바이스 — 홈 화면을 띄운 원형 디스플레이와 볼조인트 베이스" width="1186" height="1495" loading="lazy" draggable="false" />
          </figure>
          <div className="aiot-copy">
            <div className="head">
              <h2 className="t56 semibold">AIoT 디바이스</h2>
              <p className="t24 semibold aiot-desc">개인이 집에서도 운동을 이어갈 수 있도록 <br className="br-l" />돕는 가정용 AIoT 코칭 기기</p>
            </div>
            <ul className="aiot-roles">
              {ROLES.map(r => (
                <li key={r.k}><b className="t20 semibold">{r.k}</b><span className="t16 medium">{r.v}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="aiot-screens">
          {SCREENS.map((s, i) => (
            <li key={s.code} className="aiot-screen" style={{ '--d': `${0.2 + i * 0.1}s` }}>
              <img src={screen(s.code)} alt={`AIoT 기기 원형 화면 · ${s.name}`} width="960" height="960" loading="lazy" draggable="false" />
              <b className="t16 semibold">{s.name}</b>
              {s.caption && <span className="t14 medium">{s.caption}</span>}
            </li>
          ))}
        </ol>
        <Link className="more-link t16 semibold" to="/archive/result?section=aiot">전체 화면 보기 <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  )
}
