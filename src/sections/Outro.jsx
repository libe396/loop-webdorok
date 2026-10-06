import { Link } from 'react-router-dom'
import { Wordmark } from '../components/Wordmark'
import { scrollToTarget } from '../lib/scroll'
import { PROTOTYPE_URL } from '../data/links'

export default function Outro() {
  return (
    <section className="closing" id="prototype">
      <div className="closing-in"><p className="kicker">A HEALTHIER LOOP</p><h2>공공의 체력 관리가,<br />나의 지속 가능한 습관으로</h2><div className="closing-actions"><Link className="text-action" to="/archive/result">최종 화면 살펴보기 ↗</Link>{PROTOTYPE_URL && <a className="text-action" href={PROTOTYPE_URL} target="_blank" rel="noopener">프로토타입 체험 ↗</a>}</div><div className="closing-word"><Wordmark height="100%" /></div><footer className="closing-footer"><span>국민체력100 서비스 경험 리뉴얼<br />디자인씽킹스튜디오 2026</span><span>김제인 · 이서연</span><a href="#top" onClick={e => { e.preventDefault(); scrollToTarget(0) }}>맨 위로 ↑</a></footer></div>
    </section>
  )
}
