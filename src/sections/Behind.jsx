import { Link } from 'react-router-dom'
import { CHAPTERS } from '../data/archive'

export default function Behind() {

  return (
    <section className="chapter archive-entry" id="behind">
      <header className="chapter-heading"><p className="kicker">03 / THE DECISIONS</p><h2>리서치는 화면을 바꿉니다.</h2><p>12주 리서치 · 설문 70명<br />경쟁 앱 리뷰 2,562개에서 시작한 결정</p></header>
      <div className="decision-list">
        <article><div className="decision-icon icon-stack" aria-hidden="true"><i /><i /><i /></div><span>01 / 구조</span><h3>탭 5개 → 4개</h3><p>실내·실외 운동을 루틴 안에서 함께 보여주고, 측정과 처방에 집중했습니다.</p></article>
        <article><div className="decision-icon icon-target" aria-hidden="true"><i /><b /></div><span>02 / 경험</span><h3>장소 목록 → 운동 미션</h3><p>코스를 찾아보는 경험에서, 오늘 실천할 운동을 안내하는 경험으로 바꿨습니다.</p></article>
        <article><div className="decision-icon icon-blocks" aria-hidden="true"><i /><i /><i /><i /></div><span>03 / 정보</span><h3>정보 블록 8개 → 4개</h3><p>한 화면의 정보량을 줄여, 지금 필요한 행동이 먼저 보이도록 했습니다.</p></article>
      </div>
      <div className="archive-gallery-heading"><p>장표로 살펴보는 전체 과정</p></div>
      <div className="archive-marquee"><div className="archive-marquee-track">{[0,1].map(copy => <div className="archive-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{CHAPTERS.map(item => { const slide = item.sections.flatMap(section => section.slides)[0]; return <Link className="archive-slide" key={item.id} to={`/archive/${item.id}`} tabIndex={copy === 1 ? -1 : undefined}><img src={slide.src.replace('.webp', '@960.webp')} alt={`${item.title} 미리보기`} loading="lazy" /><div><b>{item.title}</b><span>{item.count}장 보기 ↗</span></div></Link> })}</div>)}</div></div>
      <div className="archive-index">{CHAPTERS.map((item, i) => <Link key={item.id} to={`/archive/${item.id}`}><span>0{i + 1}</span><b>{item.title}</b><span>{item.count}장</span><i aria-hidden="true">↗</i></Link>)}</div>
    </section>
  )
}
