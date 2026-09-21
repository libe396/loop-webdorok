import { useState } from 'react'
import iphone17 from '../assets/screens/final/iphone17.webp'
import './phone.css'

/** Exact iPhone 17 instance: 2953:27047. Outer 450×920, screen (24,23) 402×874. */
export default function Phone({ src, code, width = 320, className = '', style, interactive = true }) {
  const [ok, setOk] = useState(Boolean(src))
  return (
    <div className={`phone ${className}`} style={{ '--pw': typeof width === 'number' ? `${width}px` : width, ...style }}>
      <div className="phone-screen" data-lenis-prevent tabIndex={interactive ? 0 : -1} role="region" aria-label={`${code || 'LOOP'} 앱 화면 · 위아래로 스크롤`}>
        {ok ? <img src={src} alt={`LOOP 앱 최종 화면 ${code || ''}`} onError={() => setOk(false)} loading="lazy" draggable="false" />
          : <span className="phone-ph">{code}</span>}
      </div>
      <img className="phone-mockup" src={iphone17} alt="" aria-hidden="true" draggable="false" />
    </div>
  )
}
