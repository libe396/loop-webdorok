import { useEffect, useRef } from 'react'
import useLandingMotion from '../lib/useLandingMotion'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero'
import ConnectionFlow from '../sections/ConnectionFlow'
import Play from '../sections/Play'
import Behind from '../sections/Behind'
import Outro from '../sections/Outro'
import DesignSystem from '../sections/DesignSystem'
import { rememberLandingPosition } from '../lib/returnPosition'
import { scrollToTarget } from '../lib/scroll'

export default function Landing() {
  const root = useRef(null)
  useLandingMotion(root)
  const { pathname, state } = useLocation()

  // 아카이브에서 #service 같은 랜딩 앵커로 넘어온 경우: 마운트 뒤 해당 섹션으로
  useEffect(() => {
    document.title = '국민체력 loop — 측정에서 끝나지 않는 건강의 선순환'
    if (pathname === '/' && Number.isFinite(state?.returnY)) {
      const frame = requestAnimationFrame(() => scrollToTarget(state.returnY, { immediate: true }))
      return () => cancelAnimationFrame(frame)
    }
    const el = document.getElementById(pathname.replace(/^\//, ''))
    if (el) scrollToTarget(el, { immediate: true })
    else if (pathname === '/') scrollToTarget(0, { immediate: true })
  }, [pathname, state])

  return (
    <>
      <main ref={root} className="landing" onClickCapture={rememberLandingPosition}>
        <Hero />
        <Play />
        <ConnectionFlow />
        <Behind />
        <DesignSystem />
        <Outro />
      </main>
    </>
  )
}
