import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Intro from '../sections/Intro'
import Hero from '../sections/Hero'
import Problem from '../sections/Problem'
import Loop from '../sections/Loop'
import Play from '../sections/Play'
import { Focus, Band, Prescriber, Behind, Brand, Outro } from '../sections/Rest'
import { scrollToTarget } from '../lib/scroll'

export default function Landing() {
  const { pathname } = useLocation()

  // 아카이브에서 #service 같은 랜딩 앵커로 넘어온 경우: 마운트 뒤 해당 섹션으로
  useEffect(() => {
    document.title = '국민체력 loop'
    const el = document.getElementById(pathname.replace(/^\//, ''))
    if (el) scrollToTarget(el, { immediate: true })
    else if (pathname === '/') scrollToTarget(0, { immediate: true })
  }, [pathname])

  return (
    <>
      <Intro />       {/* S00 */}
      <main>
        <Hero />      {/* S01 */}
        <Problem />   {/* S02 */}
        <Loop />      {/* S03 */}
        <Play />      {/* S04 */}
        <Focus />     {/* S05 */}
        <Band />      {/* S06 */}
        <Prescriber />{/* S07 */}
        <Behind />    {/* S08 */}
        <Brand />     {/* S09 */}
        <Outro />     {/* S10 */}
      </main>
    </>
  )
}
