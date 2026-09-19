# 국민체력 loop — 웹도록 (Vite + React)

디자인씽킹스튜디오 2026 · 국민체력100 서비스 경험 리뉴얼 프로젝트의 웹도록. 장표 나열이 아니라 **실제 서비스 사이트처럼** 보이는 랜딩(앞면) + 리서치·기획·제작·결과물 장표 아카이브(뒷면).
작업자: 서연(디자인). 커뮤니케이션은 한국어 반말, 짧고 직설적으로.

## 실행
```
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ → GitHub Pages (vite base './')
```
- 배포: https://libe396.github.io/loop-webdorok/ (저장소 libe396/loop-webdorok) — main에 push하면 자동 배포 (.github/workflows/deploy.yml)

## 디자인 기준 (Figma가 원본)
- Figma 파일 `9wJzEafnp4YRzPSR6oswWX` (디자인씽킹스튜디오)
  - `웹도록` 페이지(2896:17195): 키프레임 와이어프레임(S00~S10) + `랜딩 v2 · Hi-Fi` 섹션
  - Hi-Fi 확정: S01 Hero(B 리본, 정지 배경) · S03 Loop · S04 Play — 1920×1080 프레임
  - `Design System` 페이지 'Logo' 섹션: `LOOP / Logo / Wordmark·App Icon·Symbol` 컴포넌트
- 인터랙션 스펙: `docs/loop-landing-v2-interaction.html` (장면별 동작·트리거·Small 대응)
- **Hi-Fi와 다르면 Hi-Fi가 이김.** 와이어프레임 Large(1440)는 비율 스케치일 뿐.

## 토큰 (src/styles/tokens.css)
- 레이아웃: 1920 기준 좌우 121 / 상하 110 → `--mx`, `--my` (clamp로 축소). 콘텐츠 폭 1678
- 타이포: Wanted Sans(npm `wanted-sans` variable). 12/14/16/18/20/24/36/48/56 — 36 이하 행간 150%, 48부터 130%, 자간 -2%. 굵기는 medium(500)/semibold(600). 유틸 클래스 `.t12`~`.t56`, `.medium`, `.semibold`
- 색: violet 100/300/500/700/900, gray 50~900, lime·aqua·peach·pink·paper. 배경 gray-50, 카드 흰색, 그림자 거의 없음
- 반경: 카드 32, 큰 요소 28, 버튼·칩 999
- 브레이크포인트: Small ≤480 / Medium 481–1024 / Large 1025~
- 글래스: 기본 `.glass`(흰 72% + blur 24), 포인트 `.glass-frost`(좌→우 그라디언트 + blur 28 · saturate 160 + 안쪽 하이라이트). frost는 뒤에 색·이미지 있을 때만 — GNB·Hero 카드·S03 카드·S04 토이
- 규칙: 한 화면(섹션)에 그라디언트 하나. 실외=peach·pink, 실내·기본=violet

## 구조
- `src/sections/` Intro(S00) · Hero(S01) · Problem(S02) · Loop(S03) · Play(S04) · Focus(S05) · Band(S06) · Rest.jsx(S07 자리만) · Behind(S08) · Brand(S09) · Outro(S10)
- `src/components/` Gnb, Wordmark(DS 로고 벡터), Phone(화면 목업), Button, Glass
- `src/pages/` Landing(S00~S10) · Archive(챕터 템플릿)
- `src/lib/useScrollProgress.js` sticky 핀 섹션 진행률(0→1) · `src/lib/scroll.js` 전역 Lenis + `scrollToTarget`
- `scripts/archive-from-pdf.py` PDF → 장표 JPG · `scripts/archive-webp.py` 장표 JPG → WebP 1920(q78) + @960
- `src/data/screens.js` 앱 화면 이미지 경로

## 진행 상태
- [x] S00 Intro — 도트 100 → l o o → +p → 워드마크 → GNB 로고로 비행. 세션당 1회, 건너뛰기·ESC, 끝나면 `loop:intro-done` 이벤트
- [x] S01 Hero — 리본 배경(정지 WebP) + GSAP 등장(헤드라인 줄 마스크 → 폰 → 글래스 카드)
- [x] S02 Problem — 단어 스크럽, 끊기는 선, 카운트업, 인용
- [x] S03 Loop — ∞ 위 러너, 4정거장마다 폰·카피 교체, 한 바퀴 뒤 MEASURE로. 하단 프로그레스바 없음(삭제 확정). 폰 2대(이전=뒤·흐림, 현재=앞), 목업 왼쪽 이동 · GROW는 첨부 AI 챗봇 화면 전체 표시(`src/assets/screens/ai.webp`, 빌드 해시 URL로 캐시 갱신) + 카드는 `.glass-frost`(프로스티드 글라스, loop.css)
- [x] S04 Play — 글라스 카드 + violet 블롭 배경. 유형 카드·코스·무브바디는 DS 원본 에셋(public/img/play/, #05) 사용, 수면 슬라이더는 DS Slider 스펙 CSS
- [x] S04 DS 에셋 5개 export (#05) — public/img/play/. route.svg 배경은 Mesh gradient 셰이더라 SVG export에서 빠져서 같은 식으로 렌더한 래스터를 SVG 안에 넣음
- [x] 앱 화면 이미지: `public/screens/{h0,m0,r00,ai,h4}.webp` (750×1624, 위쪽 크롭), `public/img/band.webp` — Figma MCP export → sharp WebP q82
- [x] S05 Focus(Focus.jsx) — 배경 다크 스크럽 + 무인 측정 다크 v2 화면 6장 — `public/screens/{s0,a1,a2,a3,a4,s9}.webp` export 완료 (#09)
- [x] S06 LOOP band(Band.jsx) — 기울기 회전 + 핫스팟 글라스 카드, band-cut.webp
- [x] S08 Behind(Behind.jsx) — 카운트업 숫자 · 장표 썸네일 마퀴 2줄(호버 정지·확대, 클릭→챕터) · 결정 전후 3개를 구분선으로 정리한 흰 패널 + 챕터 링크 · 파란 블롭·glow·겹침 제거
- [x] S09 Brand(Brand.jsx) — 핀 220vh, 워드마크 Violet→Intelligence→Delight→Clarity 전환, → #/archive/make
- [x] S10 Outro(Outro.jsx) — 커서 스포트라이트로 차오르는 워드마크 · 마그네틱 CTA · 문구 “직접 loop의 서비스를 체험해보세요.” · 로고 가운데 정렬 · D-90 ↺ 맨 위로
- [ ] 프로토타입 체험 링크 (Button href="#" 자리 — 프로토타입 URL 받으면 교체: Hero · GNB · Outro)
- [ ] S07 처방사 — 대시보드 작업 후
- [x] 아카이브 페이지 `#/archive/{research,plan,make,result}` — `src/pages/Archive.jsx` 템플릿 하나, 데이터 `src/data/archive.js`(manifest + 헤더 카피. summary는 초안)
- [x] 라우팅: HashRouter. `/archive/:chapter`만 라우트, 나머지 해시(#top·#service…)는 랜딩이 받아서 해당 id로 스크롤
- [x] 장표 165+21장 WebP 변환 완료 (`public/archive/`, 약 19MB)
  - research·plan 원본: `~/Desktop/Loop_Research.pdf`(167p: 1 표지 · 2–135 r001–r134 · 136–166 p001–p031 · 167 끝) → `scripts/archive-from-pdf.py`(pymupdf 필요) → `docs/archive/{research,plan}/*.jpg`
  - make 원본: `designthinking/webdorok-archive/make` → `docs/archive/make/`
  - 변환: `python3 scripts/archive-webp.py [-f]`. p023(블루프린트)만 16:9 아님 → 이미지는 원본 비율로 표시

## 작업 규칙
- 새 값은 토큰 먼저. 하드코딩 색·크기 금지
- 모션은 `prefers-reduced-motion`이면 끄기 (Hero·Lenis 이미 처리)
- 텍스트는 Figma 카피 그대로. 없는 수치는 만들지 말 것

## Figma 에셋 노드 ID (파일 9wJzEafnp4YRzPSR6oswWX)
| 파일 | 노드 | 설명 |
|---|---|---|
| public/screens/h0.webp | 2673:21476 | H-0 홈 (Key visual) |
| public/screens/m0.webp | 2673:20706 | M-0 측정 탭 홈 |
| public/screens/r00.webp | 2673:20926 | R-00 루틴 홈 (D 반전) |
| public/screens/ai.webp | 2659:18987 | AI 챗봇 랜딩 |
| public/screens/h4.webp | 2840:27733 | H-4 변화 리포트 · 무브바디 |
| public/img/band.webp | 2701:56643 | LOOP band 제품 이미지 |
| public/screens/s0.webp | 2789:19754 | S0 · 측정 모드 진입 (다크 전환) |
| public/screens/a1.webp | 2786:18937 | A1 v2 · NFC 태그 대기 |
| public/screens/a2.webp | 2786:18954 | A2 v2 · 태그 인식 · 측정 준비 |
| public/screens/a3.webp | 2786:18978 | A3 v2 · 측정 중 (실시간) |
| public/screens/a4.webp | 2786:19005 | A4 v2 · 종목 완료 · 자동 기록 |
| public/screens/s9.webp | 2786:19127 | S9 v2 · 측정 완료 (라이트 복귀) |

지시 이력은 `docs/claude-code-prompts.md`.
