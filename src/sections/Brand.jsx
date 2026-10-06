import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wordmark } from '../components/Wordmark'
import './brand.css'

const LOOKS = [
  { k: 'Violet', when: '기본', g: null },
  { k: 'Intelligence', when: 'AI 해석', g: { id: 'brandIntelligence', from: '#495AEE', to: '#DBDEFF' } },
  { k: 'Delight', when: '환영과 성취', g: { id: 'brandDelight', from: '#F7A27A', to: '#EFB9EE' } },
  { k: 'Clarity', when: '선명한 데이터', g: { id: 'brandClarity', from: '#8ED6E4', to: '#D2F964' } },
]
export default function Brand() {
  const [active, setActive] = useState(0)
  const current = LOOKS[active]
  return (
    <section className="brand-s" id="brand">
      <div className="brand-pin section">
        <div className="inner brand-in">
          <div className="head brand-copy">
            <p className="eyebrow">브랜드 · 디자인 시스템</p>
            <h2 className="t48 semibold">100에서,<br />끝없는 가능성으로.</h2>
            <p className="t16 medium muted">100과 고리, 12종의 동물, 그리고 도트.<br />체력 정보를 쉽고 친근한 언어로 바꿨습니다.</p>
            <div className="brand-swatches" aria-label="브랜드 팔레트 선택">
              {LOOKS.map((look, i) => <button key={look.k} type="button" data-palette={i} aria-label={`${look.k} · ${look.when}`} aria-pressed={active === i} onClick={() => setActive(i)}><span /></button>)}
            </div>
            <Link to="/archive/make" className="brand-more t14 semibold">디자인 시스템 살펴보기 ↗</Link>
          </div>
          <div className="brand-palette-stage" data-palette={active}>
            <span className="palette-index">lOOP / IDENTITY <span>0{active + 1}</span></span>
            <div className="palette-mark" key={current.k}><Wordmark height="100%" gradient={current.g} /></div>
            <span className="palette-caption"><b>{current.k}</b><span>{current.when}</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
