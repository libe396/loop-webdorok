import { useState } from 'react'
import './phone.css'

/**
 * 폰 목업. src가 없거나 로드 실패 시 코드 라벨 플레이스홀더.
 * 화면 이미지는 Figma에서 375폭 @2x WebP로 export → public/screens/{code}.webp
 */
export default function Phone({ src, code, width = 320, className = '', style }) {
  const [ok, setOk] = useState(Boolean(src))
  return (
    <div className={`phone ${className}`} style={{ '--pw': typeof width === 'number' ? `${width}px` : width, ...style }}>
      <div className="phone-screen">
        {ok ? (
          <img src={src} alt={code ? `LOOP 앱 화면 ${code}` : ''} onError={() => setOk(false)} loading="lazy" />
        ) : (
          <span className="phone-ph">{code}</span>
        )}
      </div>
    </div>
  )
}
