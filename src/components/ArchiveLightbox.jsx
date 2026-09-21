import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { pauseScroll } from '../lib/scroll'

export default function ArchiveLightbox({ slides, index, onIndex, onClose }) {
  const dialog = useRef(null)
  const slide = slides[index]
  useLayoutEffect(() => {
    const el = dialog.current
    const opener = document.activeElement
    const overflow = document.documentElement.style.overflow
    const resume = pauseScroll()
    document.documentElement.style.overflow = 'hidden'
    el.showModal()
    return () => {
      el.close()
      document.documentElement.style.overflow = overflow
      resume()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])
  const onKeyDown = (event) => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); onIndex(Math.max(0, index - 1)) }
    if (event.key === 'ArrowRight') { event.preventDefault(); onIndex(Math.min(slides.length - 1, index + 1)) }
  }
  return createPortal(
    <dialog ref={dialog} className="ar-lightbox" aria-label="아카이브 장표 크게 보기" data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose() }} onKeyDown={onKeyDown}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="ar-lightbox-toolbar">
        <p className="t14 medium" aria-live="polite">{slide.alt} · {index + 1} / {slides.length}</p>
        <div className="ar-lightbox-actions">
          <button type="button" aria-label="이전 장표" disabled={index === 0} onClick={() => onIndex(index - 1)}>←</button>
          <button type="button" aria-label="다음 장표" disabled={index === slides.length - 1} onClick={() => onIndex(index + 1)}>→</button>
          <button type="button" onClick={onClose} autoFocus>닫기</button>
        </div>
      </div>
      <img key={slide.id} className="ar-lightbox-image" src={slide.src} alt={slide.alt} />
      <p className="ar-lightbox-hint t14 medium">← → 이동 · ESC 닫기 · 모바일에서는 두 손가락으로 확대</p>
    </dialog>, document.body)
}
