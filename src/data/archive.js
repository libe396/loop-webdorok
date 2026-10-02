import manifest from '../../docs/archive/manifest.json'

/**
 * 아카이브 챕터 = docs/archive/manifest.json + 헤더 카피.
 * make·result 장표는 발표 장표 파일 export — 원본 노드는 docs/archive-sources.md
 */
const COPY = {
  research: { eyebrow: '아카이브 01 · 리서치 과정', summary: '측정 다음에 무슨 일이 일어나는지, 데스크 리서치부터 인터뷰·넷노그라피·퍼소나까지.', source: '발표 장표' },
  plan: { eyebrow: '아카이브 02 · 기획 과정', summary: '핵심 문제를 고르고, 아이디어를 MVP와 서비스 블루프린트로 좁힌 과정.', source: '발표 장표' },
  make: { eyebrow: '아카이브 03 · 제작 과정', summary: '브랜드와 디자인 시스템, IA와 와이어프레임까지 화면이 만들어진 과정.', source: '발표 장표' },
  result: { eyebrow: '아카이브 04 · 결과물', summary: '모바일 앱 · 처방사 대시보드 · AIoT 디바이스의 최종 화면.', source: '발표 장표' },
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
