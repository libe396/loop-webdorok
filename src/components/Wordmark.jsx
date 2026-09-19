import { WORDMARK_PATH, SYMBOL_PATH } from '../data/logo'

/** DS 컴포넌트 `LOOP / Logo / Wordmark` 벡터. 색은 currentColor 또는 gradient id */
export function Wordmark({ height = 30, className, gradient }) {
  return (
    <svg className={className} viewBox="0 0 271 142" height={height} role="img" aria-label="loop" style={{ width: 'auto', display: 'block' }}>
      {gradient && (
        <defs>
          <linearGradient id={gradient.id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={gradient.from} />
            <stop offset="1" stopColor={gradient.to} />
          </linearGradient>
        </defs>
      )}
      <path d={WORDMARK_PATH} fill={gradient ? `url(#${gradient.id})` : 'currentColor'} />
    </svg>
  )
}

export function Symbol({ height = 24, className }) {
  return (
    <svg className={className} viewBox="0 0 101 55" height={height} aria-hidden="true" style={{ width: 'auto', display: 'block' }}>
      <path d={SYMBOL_PATH} fill="currentColor" />
    </svg>
  )
}
