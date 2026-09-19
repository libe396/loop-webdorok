import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getChapter, nextChapter } from '../data/archive'
import { introDone } from '../sections/Intro'
import { scrollToTarget } from '../lib/scroll'
import './archive.css'

/** #/archive/:chapter — 챕터 4개가 이 템플릿 하나를 씀 */
export default function Archive() {
  const { chapter } = useParams()
  const ch = getChapter(chapter)
  if (!ch) return <Navigate to="/archive/research" replace />
  return <ChapterPage key={ch.id} ch={ch} />
}

const isNarrow = () => window.matchMedia('(max-width: 1024px)').matches

function ChapterPage({ ch }) {
  const filled = ch.sections.filter((s) => s.slides.length)
  const [active, setActive] = useState(ch.sections[0]?.id)
  const secRefs = useRef({})
  const chipsRef = useRef(null)
  const next = nextChapter(ch.id)

  useLayoutEffect(() => {
    // 아카이브로 바로 들어왔으면 랜딩 인트로는 생략
    introDone()
    document.title = `${ch.title} · 국민체력 loop`
    scrollToTarget(0, { immediate: true })
  }, [ch])

  // 스크롤 위치 하이라이트: 화면 30% 선을 넘은 마지막 섹션
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const line = window.innerHeight * 0.3
      let cur = ch.sections[0]?.id
      for (const s of ch.sections) {
        const el = secRefs.current[s.id]
        if (el && el.getBoundingClientRect().top <= line) cur = s.id
      }
      setActive(cur)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [ch])

  // 가로 칩: 활성 칩을 바 안에서 가운데로
  useEffect(() => {
    const bar = chipsRef.current
    const chip = bar?.querySelector(`[data-id="${active}"]`)
    if (!bar || !chip || bar.scrollWidth <= bar.clientWidth) return
    bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [active])

  const goTo = (id) => {
    const el = secRefs.current[id]
    if (!el) return
    // 위로 가면 GNB가 다시 내려오니 그만큼 더 띄움
    const up = el.getBoundingClientRect().top < 0
    const gnb = up ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gnb-h')) || 0 : 0
    const chips = isNarrow() ? chipsRef.current?.offsetHeight ?? 0 : 0
    scrollToTarget(el, { offset: gnb + chips + 24 })
  }

  return (
    <main className="ar">
      <header className="ar-head inner">
        <p className="ar-eyebrow t16 semibold">{ch.eyebrow}</p>
        <h1 className="t56 semibold">{ch.title}</h1>
        <p className="ar-summary t20 medium">{ch.summary}</p>
        {ch.count > 0 && (
          <ul className="ar-meta" aria-label="챕터 정보">
            <li className="chip is-soft">{ch.count}장</li>
            <li className="chip">섹션 {filled.length}개</li>
            {ch.source && <li className="chip">{ch.source}</li>}
          </ul>
        )}
      </header>

      {ch.count === 0 ? (
        <div className="inner">
          <div className="ar-empty">
            <p className="t24 semibold">Hi-Fi 확정 후 공개</p>
            <p className="t16 medium muted">{ch.sections.map((s) => s.title).join(' · ')}</p>
          </div>
        </div>
      ) : (
        <>
          <nav className="ar-chips" ref={chipsRef} aria-label="섹션 목차">
            {ch.sections.map((s) => (
              <button key={s.id} data-id={s.id} className={`chip ${active === s.id ? 'is-dark' : ''}`} aria-current={active === s.id || undefined} onClick={() => goTo(s.id)}>
                {s.title}<span className="ar-n">{s.slides.length || '—'}</span>
              </button>
            ))}
          </nav>

          <div className="ar-body inner">
            <aside className="ar-toc" aria-label="섹션 목차">
              <ol>
                {ch.sections.map((s, i) => (
                  <li key={s.id}>
                    <button className={active === s.id ? 'is-active' : ''} aria-current={active === s.id || undefined} onClick={() => goTo(s.id)}>
                      <span className="ar-i t14 medium">{String(i + 1).padStart(2, '0')}</span>
                      <span className="ar-t t16 medium">{s.title}</span>
                      <span className="ar-n t14 medium">{s.slides.length ? `${s.slides.length}장` : '예정'}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </aside>

            <div className="ar-stack">
              {ch.sections.map((s, si) => (
                <section key={s.id} className="ar-sec" ref={(el) => { secRefs.current[s.id] = el }} aria-label={s.title}>
                  {s.slides.length
                    ? s.slides.map((sl, i) => <Slide key={sl.id} slide={sl} eager={si === 0 && i === 0} alt={`${s.title} ${i + 1}`} />)
                    : <div className="ar-soon t16 medium">{s.title}</div>}
                </section>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="inner">
        <Link className="ar-next" to={`/archive/${next.id}`}>
          <span className="t16 medium muted">{next.id === 'research' ? '처음으로' : '다음 챕터'}</span>
          <span className="ar-next-t t48 semibold">{next.title} <span aria-hidden="true">→</span></span>
        </Link>
      </div>

      <TopButton />
    </main>
  )
}

/** 장표 한 장: 16:9 자리를 먼저 잡고, 이미지가 없으면(아직 export 전) 플레이스홀더 */
function Slide({ slide, eager, alt }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="ar-ph t14 medium" role="img" aria-label={alt}>{slide.id}</div>
  return (
    <img
      className="ar-img" src={slide.src} srcSet={slide.srcSet}
      sizes="(max-width: 1024px) 100vw, 75vw" width="1920" height="1080" alt={alt}
      loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async"
      onError={() => setFailed(true)}
    />
  )
}

function TopButton() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button className={`ar-top ${show ? 'is-on' : ''}`} aria-label="맨 위로" tabIndex={show ? 0 : -1} onClick={() => scrollToTarget(0)}>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 16V4M4.5 9.5 10 4l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </button>
  )
}
