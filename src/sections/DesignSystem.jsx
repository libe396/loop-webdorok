import { Link } from 'react-router-dom'
import { Symbol, Wordmark } from '../components/Wordmark'

const colors = [['Violet', '#495AEE'], ['Aqua', '#ADE3EE'], ['Lime', '#D2F964'], ['Peach', '#FEB28E'], ['Pink', '#EFB9EE']]
const gradients = [
  { name: 'blue', from: '#495AEE', to: '#DCE1F4', shadow: '#DCE1F4' },
  { name: 'peach', from: '#F7A27A', to: '#EFB9EE', shadow: '#F7F3EB' },
  { name: 'aqua', from: '#8ED6E4', to: '#D2F964', shadow: '#FFFFFF' },
]
export default function DesignSystem() {
  return <section className="chapter design-system" id="design-system">
    <header className="chapter-heading"><p className="kicker">04 / DESIGN SYSTEM</p><h2>하나의 언어로 이어지는 lOOP</h2><p>색상부터 작은 버튼까지, 앱과 웹을 잇는 디자인 시스템</p></header>
    <div className="ds-showcase">
      <article className="ds-brand-tile">
        <Wordmark height={48} />
        <h3>측정에서 끝나지 않는 건강의 선순환</h3>
        <p>국민체력100의 정체성을 잇고,<br />측정 이후의 일상까지 확장합니다.</p>
        <div className="ds-logo-formula"><span>100 → l o o</span><span>p = plus</span><span>loop = 순환</span></div>
        <div className="ds-logo-variants"><div><Wordmark height={22} /><span>Primary</span></div><div><Wordmark height={22} /><span>Inverse</span></div><div><Symbol height={32} /><span>App icon</span></div></div>
        <p className="ds-brand-note">40px 그리드로 구성한 로고 · 활동적 · 정확한 · 연결된 · 신뢰감</p>
      </article>
      <article className="ds-type-tile">
        <span className="kicker">TYPOGRAPHY</span><strong>Wanted Sans</strong><p>높은 가독성과 안정적인 구조로<br />공공 서비스의 신뢰와 친근함을 함께 전달합니다.</p>
        <div className="ds-type-scale"><div><b>오늘의 작은 실천</b><span>36 · SemiBold</span></div><div><b>내 생활에 맞는 건강</b><span>24 · Medium</span></div><div><p>쉽게 읽고, 편하게 이어가는 일상</p><span>16 · Regular</span></div></div>
        <span>14 / 16 / 18 / 20 / 24 / 36px<br />Regular · Medium · SemiBold · Bold</span>
      </article>
      <article className="ds-colors-tile">
        <h3>lOOP의 색</h3><p>바이올렛을 중심으로, 체력 유형과 경험을 다양한 색으로 표현합니다.</p>
        <div className="ds-color-list">{colors.map(([name, color]) => <div key={name}><i style={{ background: color }} /><span>{name}</span><small>{color}</small></div>)}</div>
        <div className="ds-status-colors"><span><i style={{ background: '#F04452' }} />Error</span><span><i style={{ background: '#03B26C' }} />Success</span><span><i style={{ background: '#FFC342' }} />Warning</span></div>
        <p className="ds-small-note">Paper #F7F3EB · White #FFFFFF<br />Gray 50–900으로 배경·경계·텍스트의 위계를 구분합니다.</p>
      </article>
      <article className="ds-components-tile">
        <h3>익숙하게 이어지는 컴포넌트</h3><p>같은 형태와 상태 표현으로, 화면이 바뀌어도 자연스럽게 이어집니다.</p>
        <div className="ds-button-demo"><span className="ds-demo-fill">오늘의 루틴</span><span className="ds-demo-weak">체력 결과</span></div>
        <div className="ds-chip-demo"><span>선택된 상태</span><span>기본 상태</span></div>
        <div className="ds-radius-demo"><span style={{ borderRadius: 8 }}>8</span><span style={{ borderRadius: 16 }}>16</span><span style={{ borderRadius: 28 }}>28</span><span style={{ borderRadius: 999 }}>Full</span></div>
        <p className="ds-small-note">버튼 높이 32 / 38 / 48 / 56px · 칩 간격 8px<br />4px 단위 간격 · 24px 아이콘 · 최소 44px 터치 영역</p>
      </article>
    </div>
    <div className="ds-gradient-showcase">
      <header><p className="kicker">GRADIENT LANGUAGE</p><h3>색의 중심에서, 부드럽게 연결되도록</h3><p>Radial 채움과 Inner Shadow를 함께 사용해<br />체력 카드와 작은 UI에 같은 깊이감을 만듭니다.</p></header>
      <div className="ds-gradient-samples">{gradients.map(item => <div key={item.name}><i className={`ds-gradient-${item.name}`} /><b>Radial {item.name}</b><span>{item.from} → {item.to}</span><small>Inner Shadow {item.shadow}</small></div>)}</div>
    </div>
    <Link className="text-action ds-source-link" to="/archive/make">브랜드와 디자인 시스템 장표 보기 ↗</Link>
  </section>
}
