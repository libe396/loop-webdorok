import { Link } from 'react-router-dom'
import { screen, img } from '../data/screens'
import Phone from '../components/Phone'

const STEPS = [
  { n: '01', title: '센터에서 측정·상담', text: '체력을 측정하고, 전문가가 AI 처방을 검토합니다.', src: screen('dash-home'), alt: '처방사 대시보드', to: '/archive/result?section=dashboard', id: 'prescriber' },
  { n: '02', title: '앱에서 오늘의 실천', text: '체력과 생활 패턴에 맞는 5분 첫 행동부터 시작합니다.', src: screen('r00'), alt: '오늘의 루틴 앱 화면', to: '/archive/result?section=mobile', id: 'app' },
  { n: '03', title: '집과 동네에서 운동', text: '집에서는 AIoT 코칭을, 공원에서는 맞춤 운동 코스를 이어갑니다.', src: img('aiot-cutout.png'), alt: '가정용 AIoT 코칭 기기', to: '/archive/result?section=aiot', id: 'aiot' },
  { n: '04', title: '재측정으로 변화 확인', text: '12주의 실천과 움직임의 변화를 보고, 다음 루틴으로 이어갑니다.', src: screen('h4'), alt: '움직임 변화 리포트 화면', to: '/archive/result?section=mobile', id: 'report' },
]
export default function ConnectionFlow() {
  return (
    <section className="chapter care-flow" id="service"><span className="section-anchor" id="ecosystem" />
      <header className="care-heading"><p className="kicker">02 / ONE CONNECTED LOOP</p><h2>센터의 측정이,<br />집에서의 실천으로</h2><p>앱, 전문가, 가정용 기기와 공공 운동시설<br />각각의 기능을 하나의 건강 루프로 연결합니다.</p></header>
      <div className="care-track">{STEPS.map(step => <Link className="care-step" key={step.n} to={step.to} id={step.id}><div className="care-step-top"><span>{step.n}</span><span aria-hidden="true">↗</span></div><div className="care-object" data-kind={step.id}>{['app', 'report'].includes(step.id) ? <div className="care-phone"><Phone src={step.src} code={step.alt} width="100cqw" interactive={false} /></div> : step.id === 'prescriber' ? <div className="care-desktop"><span className="care-tablet-camera" aria-hidden="true" /><img src={step.src} alt={step.alt} loading="lazy" /></div> : <img src={step.src} alt={step.alt} loading="lazy" />}</div><h3>{step.title}</h3><p>{step.text}</p></Link>)}</div>
    </section>
  )
}
