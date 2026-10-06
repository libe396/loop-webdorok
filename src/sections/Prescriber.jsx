import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { prefersReducedMotion } from '../lib/useScrollProgress'
import { screen } from '../data/screens'
import ArchiveLightbox from '../components/ArchiveLightbox'
import './prescriber.css'

/* S07 처방사 대시보드 — 카피는 인쇄도록 3490:33242, 캡션은 발표 PPT 「추출」 DH-01·02·07·09 장표 문장 그대로.
   화면은 Figma 9wJzEafnp4YRzPSR6oswWX 섹션 3224:43093 (1440×1000, 2배수). 'lOOP' 소문자 l은 의도된 표기 */
const MAIN = { code: 'dash-home', name: '대시보드', caption: '상담 대기·AI 처방 검토·측정 기기 현황을 한 화면에서 확인합니다.' }
const SUBS = [
  { code: 'dash-queue', name: '측정 대기 목록', caption: '사전 문진·준비물 상태를 목록에서 바로 확인합니다.' },
  { code: 'dash-ai', name: 'AI 처방 검토', caption: 'AI 초안과 판단 근거를 보고, 처방사가 강도·구성을 수정해 확정합니다.' },
  { code: 'dash-member', name: '회원 상세', caption: '신체 정보·체력 유형·리포트 요약을 한 화면에서 확인합니다.' },
]

const ALL = [MAIN, ...SUBS]
const SLIDES = ALL.map(s => ({ id: s.code, src: screen(s.code), alt: s.name }))

function Shot({ code, name, caption, hint, onOpen, className = '', style }) {
  return (
    <figure className={`dash-shot ${className}`} style={style}>
      <button type="button" className="dash-open" onClick={onOpen} aria-label={`${name} 크게 보기`}>
        <img className="dash-img" src={screen(code)} alt={`처방사 대시보드 · ${name} 화면`} width="2880" height="2000" loading="lazy" draggable="false" />
      </button>
      <figcaption className="dash-cap">
        <b className="t16 semibold">{name}{hint && <span className="t14 medium dash-hint">눌러서 크게 보기</span>}</b>
        {caption && <span className="t16 medium">{caption}</span>}
      </figcaption>
    </figure>
  )
}

export default function Prescriber() {
  const ref = useRef(null)
  const reduced = prefersReducedMotion()
  const [entered, setEntered] = useState(reduced)
  const [lightbox, setLightbox] = useState(null)
  const [selected, setSelected] = useState(0)
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

  return (
    <section className={`section dash ${entered ? 'is-on' : ''}`} id="prescriber" ref={ref}>
      <span className="dash-blob" aria-hidden="true" />
      <div className="inner dash-in">
        <div className="head">
          <h2 className="t56 semibold">처방사 대시보드</h2>
          <p className="t24 semibold dash-desc">AI가 제안하고, 전문가가 확정합니다.</p>
        </div>
        <p className="t20 medium muted">측정 결과와 AI 초안을 함께 보고, 처방사가 운동 강도와 구성을 조정합니다.</p>
        <div className="showcase-tabs" aria-label="대시보드 화면 선택">
          {ALL.map((s, i) => <button type="button" key={s.code} aria-pressed={selected === i} onClick={() => setSelected(i)}>{s.name}</button>)}
        </div>
        <Shot {...ALL[selected]} className="dash-main" hint onOpen={() => setLightbox(selected)} />
        <Link className="more-link t16 semibold" to="/archive/result?section=dashboard">전체 화면 보기 <span aria-hidden="true">→</span></Link>
      </div>
      {lightbox !== null && <ArchiveLightbox slides={SLIDES} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} loop noun="화면" label="처방사 대시보드 화면 크게 보기" />}
    </section>
  )
}
