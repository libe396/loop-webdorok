import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import './about.css'

/* S01b 서비스 소개 — 인쇄도록 작품 설명(3352:34063 · 텍스트 3426:8786)을 합니다체로. 'lOOP' 소문자 l은 의도된 표기 */
const PARTS = [
  { name: '모바일 앱', desc: '측정 결과를 쉬운 말로 풀고 12주 루틴으로 잇는 앱', href: '#screens' },
  { name: 'AIoT 디바이스', desc: '개인이 집에서도 운동을 이어갈 수 있도록 돕는 가정용 AIoT 코칭 기기', href: '#aiot' },
  { name: '처방사 대시보드', desc: '국민체력100 처방사를 위한 회원 운동 관리 대시보드', href: '#prescriber' },
]

export default function About() {
  const ref = useRef(null)
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

  return (
    <section className={`section about ${entered ? 'is-on' : ''}`} id="about" ref={ref}>
      <div className="inner about-in">
        <h2 className="t48 semibold about-title">건강을 위한 공공서비스가 우리의 일상에 더 오래 함께할 수는 없을까?</h2>
        <div className="about-body">
          <p className="t20 medium">국민체력100은 국민의 건강 증진을 위해 체력 측정과 맞춤형 운동 처방을 무료로 제공하는 공공 스포츠 복지 서비스입니다. 그러나 자신의 체력을 이해하고 운동 방법을 안내받더라도, 이를 일상에서 꾸준히 실천하는 일은 여전히 쉽지 않습니다.</p>
          <p className="t20 medium">lOOP는 체력 측정과 일상 속 실천 사이의 간격을 좁히는 맞춤형 체력 관리 서비스입니다. 앱과 AIoT 디바이스로 전문가의 코칭을 집까지 연결하고, 주변 공원과 공공 운동시설을 실천의 장소로 확장합니다.</p>
          <ul className="about-parts">
            {PARTS.map(p => (
              <li key={p.href}>
                <a href={p.href}>
                  <b className="t18 semibold">{p.name}</b>
                  <span className="t16 medium">{p.desc}</span>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
