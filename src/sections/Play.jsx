import { useEffect, useRef, useState } from 'react'
import { img } from '../data/screens'
import './play.css'

/* DS 원본 export (docs/claude-code-prompts.md #05) */
const A = {
  type: img('play/typecard.webp'),       // TypeCard · 저장용 2675:53968
  route: img('play/route.svg'),          // LOOP / Course Route · Light 2782:23838
  photo: img('play/rom-photo.webp'),     // Chart / Range of Motion 2388:11194 의 사진 fill
  before: img('play/pose-before.svg'),   // Previous / fine dashed line + dots 2389:21376
  current: img('play/pose-current.svg'), // Current / fine line + solid dots 2389:11193
}

/* export 전엔 깨진 이미지 아이콘 대신 빈 자리 */
const hide = (e) => { e.currentTarget.style.visibility = 'hidden' }

/* 01 — 체력 유형 카드: 호버 틸트 + 클릭하면 한 바퀴 돌며 섞임 */
function TypeCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [spin, setSpin] = useState(0)
  const shuffle = () => setSpin((s) => s + 1)
  return (
    <div className="toy glass-frost toy-type">
      <ToyHead n="01" title="측정하면 나오는 체력 유형 카드" hint="커서를 올리면 기울어져요 · 누르면 한 바퀴 돌아요" />
      <div className="type-stage">
        <span className={`type-back is-peach ${spin % 2 ? 'is-swap' : ''}`} />
        <span className={`type-back is-aqua ${spin % 2 ? 'is-swap' : ''}`} />
        <button className="type-card" aria-label="체력 유형 카드 한 바퀴 돌리기" onClick={shuffle}
          onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }) }}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ transform: `rotate(-3deg) rotateY(${tilt.x * 22 + spin * 360}deg) rotateX(${-tilt.y * 22}deg)` }}>
          <img src={A.type} alt="말 · 지구력형 — 오래 버티는 힘이 강해요" draggable="false" onError={hide} />
        </button>
      </div>
      <div className="toy-foot">
        <span className="chip is-lime">12가지 중 하나 · 예시</span>
      </div>
    </div>
  )
}

/* 02 — 수면 슬라이더 → 오늘 운동 강도 (DS Slider · Web 1305:11889) */
function Sleep() {
  const [m, setM] = useState(320)
  const h = Math.floor(m / 60), mm = m % 60
  const [v, tag] = m < 360 ? [10, '회복 지연 · 강도 하향'] : m >= 450 ? [25, '회복 양호 · 강도 상향'] : [20, '보통 · 계획대로']
  const pct = (m - 240) / 300
  return (
    <div className="toy glass-frost toy-sleep">
      <ToyHead n="02" title="어젯밤, 몇 시간 잤어요?" hint="슬라이더를 움직이면 오늘 운동이 바뀌어요" />
      <span className="chip is-soft sleep-tag">{tag}</span>
      <div className="ds-slider" style={{ '--p': pct }}>
        <div className="ds-slider-labels"><span>4시간</span><span>9시간</span></div>
        <div className="ds-rail">
          <span className="ds-dots" aria-hidden="true" />
          <span className="ds-knob" aria-hidden="true">{h}:{String(mm).padStart(2, '0')}</span>
          <input type="range" min="240" max="540" step="10" value={m} onChange={(e) => setM(+e.target.value)}
            aria-label="어젯밤 수면 시간" aria-valuetext={`${h}시간 ${mm}분`} />
        </div>
      </div>
      <div className="sleep-out">
        <p><span className="t16 medium muted">오늘은</span> <b className="t48 semibold accent">{v}분</b></p>
        <div className="ladder">{[25, 20, 10].map((x) => <span key={x} className={`chip ${x === v ? 'is-violet' : ''}`}>{x}분</span>)}</div>
      </div>
    </div>
  )
}

/* 03 — 코스 지도: 화면에 들어오면 DS Course Route가 왼쪽부터 그려짐 */
function Route() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.5 })
    ref.current && io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div className="toy glass-frost toy-route" ref={ref}>
      <ToyHead n="03" title="측정 결과가 지도 필터가 된다" hint="화면에 들어오면 경로가 그려져요" />
      <div className={`route-art ${on ? 'is-on' : ''}`}>
        <img src={A.route} alt="코스 경로 — 1 입구, 2 야외기구, 3 계단, 4 스트레칭" draggable="false" onError={hide} />
      </div>
    </div>
  )
}

/* 04 — 무브바디: 같은 사진 위에 3개월 전(점선) ↔ 현재(실선) 스켈레톤 비교 */
function MoveBody() {
  const [x, setX] = useState(50)
  return (
    <div className="toy glass-frost toy-move">
      <ToyHead n="04" title="눈바디 말고, 무브바디" hint="좌우로 드래그해서 전·후를 비교해요" />
      <div className="cmp" style={{ '--x': `${x}%`, backgroundImage: `url(${A.photo})` }}>
        <img className="cmp-pose" src={A.before} alt="" draggable="false" onError={hide} />
        <div className="cmp-after"><img className="cmp-pose" src={A.current} alt="" draggable="false" onError={hide} /></div>
        <span className="cmp-bar"><i>↔</i></span>
        <span className="chip glass-frost cmp-l">3개월 전</span><span className="cmp-r cmp-current"><span className="chip is-violet">현재 · +12°</span><span className="t12 medium cmp-example">예시</span></span>
        <input type="range" min="0" max="100" value={x} onChange={(e) => setX(+e.target.value)} aria-label="전후 비교 슬라이더" />
      </div>
    </div>
  )
}

function ToyHead({ n, title, hint }) {
  return (
    <div className="toy-head">
      <span className="t16 medium accent">{n}</span>
      <h3 className="t24 semibold">{title}</h3>
      <p className="t16 medium label">{hint}</p>
    </div>
  )
}

export default function Play() {
  return (
    <section className="section play" id="play">
      <span className="play-blob is-a" aria-hidden="true" />
      <span className="play-blob is-b" aria-hidden="true" />
      <span className="play-blob is-c" aria-hidden="true" />
      <div className="inner">
        <div className="head play-head">
          <p className="eyebrow">PLAY WITH LOOP</p>
          <h2 className="t48 semibold">읽지 말고,<br />직접 움직여보세요.</h2>
          <p className="t24 semibold">기능 설명 대신, 네 가지를 손으로 만져봅니다.</p>
          <span className="t14 medium label play-kbd">HOVER · DRAG · CLICK</span>
        </div>
        <div className="bento">
          <TypeCard />
          <div className="bento-mid"><Sleep /><Route /></div>
          <MoveBody />
        </div>
        <p className="play-caption t14 medium label">화면과 수치는 프로토타입 예시예요.</p>
      </div>
    </section>
  )
}
