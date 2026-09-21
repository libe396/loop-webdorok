import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Wordmark } from './Wordmark'
import Button from './Button'
import { PROTOTYPE_URL } from '../data/links'
import './gnb.css'

const NAV = [
  ['서비스', '#service'], ['리서치 과정', '#/archive/research'], ['기획 과정', '#/archive/plan'],
  ['제작 과정', '#/archive/make'], // 결과물은 완성 후 메뉴에 복구
]

export default function Gnb() {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 40)
      setHidden(y > 200 && y > last)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  // 아카이브 목차 칩이 GNB 숨김 여부에 맞춰 sticky 위치를 바꿈
  const isHidden = hidden && !open
  useEffect(() => { document.documentElement.dataset.gnb = isHidden ? 'hidden' : 'shown' }, [isHidden])
  return (
    <header className={`gnb ${isHidden ? 'is-hidden' : ''} ${solid ? 'is-solid' : ''}`}>
      <div className="gnb-in">
        <a href="#top" className="gnb-logo" aria-label="국민체력 loop 홈"><Wordmark height={30} /></a>
        <nav className={`gnb-nav ${open ? 'is-open' : ''}`} aria-label="주요 메뉴">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} aria-current={href === `#${pathname}` ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="gnb-right">
          {PROTOTYPE_URL && <Button size="s" href={PROTOTYPE_URL} target="_blank" rel="noopener">프로토타입 체험</Button>}
          <button className="gnb-burger" aria-expanded={open} aria-label="메뉴" onClick={() => setOpen(v => !v)}>
            <span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}
