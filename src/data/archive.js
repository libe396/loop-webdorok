import manifest from '../../docs/archive/manifest.json'

/**
 * 아카이브 챕터 = docs/archive/manifest.json + 헤더 카피.
 * summary는 초안 — Figma 카피 나오면 교체
 */
const COPY = {
  research: { eyebrow: 'ARCHIVE 01 · RESEARCH', summary: '측정 다음에 무슨 일이 일어나는지, 데스크 리서치부터 인터뷰·넷노그라피·퍼소나까지.', source: 'Figma PPT' },
  plan: { eyebrow: 'ARCHIVE 02 · PLAN', summary: '핵심 문제를 고르고, 아이디어를 MVP와 서비스 블루프린트로 좁힌 과정.', source: 'Figma PPT' },
  make: { eyebrow: 'ARCHIVE 03 · MAKE', summary: '100이 loop가 되기까지 — 브랜드와 디자인 시스템을 만든 기록.', source: 'loop 디자인시스템 PDF' },
  result: { eyebrow: 'ARCHIVE 04 · RESULT', summary: '최종 화면은 Hi-Fi 확정 후 공개합니다.', source: null },
}

const BASE = import.meta.env.BASE_URL

/** 'research/r001.jpg' → { id, src, srcSet } */
const toSlide = (path) => {
  const stem = `${BASE}archive/${path.replace(/\.jpg$/, '')}`
  return { id: path.split('/').pop().replace(/\.jpg$/, ''), src: `${stem}.webp`, srcSet: `${stem}@960.webp 960w, ${stem}.webp 1920w` }
}

export const CHAPTERS = manifest.chapters.map((c) => {
  const sections = c.sections.map((s) => ({ ...s, slides: s.slides.map(toSlide) }))
  return {
    ...c,
    ...COPY[c.id],
    sections,
    count: sections.reduce((n, s) => n + s.slides.length, 0),
  }
})

export const getChapter = (id) => CHAPTERS.find((c) => c.id === id)
export const nextChapter = (id) => CHAPTERS[(CHAPTERS.findIndex((c) => c.id === id) + 1) % CHAPTERS.length]
