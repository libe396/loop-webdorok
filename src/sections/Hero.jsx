import { useRef } from 'react'
import Phone from '../components/Phone'
import { screen, img } from '../data/screens'
import useScrollProgress from '../lib/useScrollProgress'
import './hero-scene.css'

export default function Hero() {
  const root = useRef(null)
  const progress = useScrollProgress(root)
  const action = progress > .42
  const travel = Math.min(1, progress / .7)
  return (
    <section className="hero-scene" id="top" ref={root} style={{ '--scene-progress': travel }}>
      <div className="hero-scene-sticky" data-action={action}>
        <img className="hero-scene-photo" src={img('landing-running-violet.png')} alt="" aria-hidden="true" fetchPriority="high" />
        <header className="hero-scene-heading">
          <p className="kicker">체력 측정 결과를 오늘의 운동 루틴으로</p>
          <h1>측정의 끝에서,<br /><span>나의 lOOP가 시작됩니다.</span></h1>
        </header>
        <div className="hero-scene-stage">
          <div className="hero-dot-field" aria-hidden="true">{Array.from({ length: 48 }, (_, i) => <i key={i} style={{ '--dot-angle': `${i * 7.5}deg`, '--dot-size': `${4 + (i % 4) * 2}px` }} />)}</div>
          <div className="hero-scene-phone">
            <Phone key={action ? 'routine' : 'result'} src={screen(action ? 'r00' : 'h0')} code={action ? '오늘의 루틴' : '측정 후 홈'} width="100cqw" />
            <span className="hero-scene-tag">02 · 오늘의 실천</span>
          </div>
          <div className="hero-scene-caption" aria-live="polite">
            <span>{action ? '02 / EVERYDAY ACTION' : '01 / UNDERSTAND YOURSELF'}</span>
            <h2>{action ? <>알게 된 나를,<br />움직이는 나로</> : <>체력 숫자 속에서,<br />나의 강점을 발견하다.</>}</h2>
            <p>{action ? <>5분 첫 행동부터 이어지는<br />나만의 루틴</> : <>12가지 동물 유형으로<br />이해하는 나의 체력</>}</p>
          </div>
        </div>
        <footer className="hero-scene-footer">
          <span className="hero-scroll-cue">스크롤로 이어보기 <span aria-hidden="true">↓</span></span>
        </footer>
      </div>
      <div className="hero-bridge">
        <h2 className="hero-bridge-question"><span className="hero-question-badge" aria-hidden="true">Q</span>체력은 알았는데, 오늘은 무엇부터 시작할까요?</h2>
      </div>
    </section>
  )
}
