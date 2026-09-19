import { Wordmark } from '../components/Wordmark'
import Button from '../components/Button'
import './rest.css'

/* S05~S10 — 1차 개발에서는 구조와 카피만. Hi-Fi 확정 후 교체 */
function Todo({ children }) {
  return <div className="todo t14 medium">{children}</div>
}

export function Focus() {
  return (
    <section className="section focus" id="focus">
      <div className="inner rest-center">
        <p className="t24 medium focus-eb">FOCUS MODE</p>
        <h2 className="t48 semibold">움직이는 동안엔,<br />화면이 어두워집니다.</h2>
        <p className="focus-timer">02:30</p>
        <Todo>S05 · 스크롤 시 배경 Gray50 → Gray900 스크럽 · 다크 화면 3장 (Hi-Fi 대기)</Todo>
      </div>
    </section>
  )
}

export function Band() {
  return (
    <section className="section" id="next">
      <div className="inner head">
        <p className="eyebrow">COMING NEXT</p>
        <h2 className="t48 semibold">LOOP band</h2>
        <p className="t24 semibold">손목의 AIoT 밴드가 오늘 컨디션을 읽고, 루틴 강도를 알아서 조절합니다.</p>
        <Todo>S06 · 스크롤 회전 + 핫스팟 · AR 글래스 카드 (Hi-Fi 대기)</Todo>
      </div>
    </section>
  )
}

export function Prescriber() {
  return (
    <section className="section" id="prescriber">
      <div className="inner"><div className="empty-box"><p className="t14 medium label">FOR 처방사</p><p className="t24 semibold">처방사 대시보드</p><p className="t16 medium muted">작업 후 채울 자리</p></div></div>
    </section>
  )
}

const NUMS = [['12주', '리서치 기간'], ['70명', '설문 응답'], ['2,562개', '경쟁 앱 리뷰 분석'], ['6곳', '체력인증센터 넷노그라피']]
export function Behind() {
  return (
    <section className="section behind" id="behind">
      <div className="inner head">
        <p className="eyebrow">BEHIND LOOP</p>
        <h2 className="t48 semibold">12주 동안,<br />측정 다음을 파고들었습니다.</h2>
        <div className="nums">{NUMS.map(([v, l]) => <div key={l}><b className="t56 semibold">{v}</b><span className="t16 medium muted">{l}</span></div>)}</div>
        <Todo>S08 · 리서치 장표 썸네일 마퀴 2줄 + 결정 카드 스택 (아카이브 export 후)</Todo>
        <a className="more t18 semibold" href="#/archive/research">리서치 장표 전체 보기 →</a>
      </div>
    </section>
  )
}

export function Brand() {
  const G = [['Violet', null], ['Intelligence', { id: 'gI', from: '#495AEE', to: '#DBDEFF' }], ['Delight', { id: 'gD', from: '#F7A27A', to: '#EFB9EE' }], ['Clarity', { id: 'gC', from: '#8ED6E4', to: '#D2F964' }]]
  return (
    <section className="section" id="brand">
      <div className="inner brand">
        <div className="head">
          <p className="eyebrow">BRAND &amp; DESIGN SYSTEM</p>
          <h2 className="t48 semibold">100이 loop가<br />되기까지.</h2>
          <p className="t20 medium muted">숫자 100과 이어지는 고리. 측정과 실천이 반복되는 선순환을 로고로 만들고, 컴포넌트 40개와 아이콘 371개로 넓혔습니다.</p>
        </div>
        <div className="logos">
          {G.map(([k, g]) => (
            <div key={k} className="logo-tile"><span style={{ color: 'var(--violet-500)' }}><Wordmark height={72} gradient={g} /></span><span className="t14 semibold">{k}</span></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Outro() {
  return (
    <section className="section outro" id="prototype">
      <div className="inner">
        <div className="outro-top">
          <h2 className="t48 semibold">직접 한 바퀴 돌아보세요.</h2>
          <div className="outro-cta"><Button href="#">프로토타입 체험</Button><a href="#top" className="t16 medium accent">다음 측정까지 D-90 ↺</a></div>
        </div>
        <div className="outro-word"><Wordmark height="100%" gradient={{ id: 'gOut', from: '#495AEE', to: '#DBDEFF' }} /></div>
        <footer className="foot t14 medium muted"><span>국민체력100 서비스 경험 리뉴얼 · 디자인씽킹스튜디오 2026</span><span>김제인 · 이서연</span></footer>
      </div>
    </section>
  )
}
