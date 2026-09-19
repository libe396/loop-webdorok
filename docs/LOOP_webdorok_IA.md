# 국민체력 loop 웹도록: IA & 랜딩 스펙 v0.3
> Claude Code 핸드오프용. 와이어프레임: loop-webdorok-wireframe.html / 로고: loop-wordmark.svg, loop-symbol.svg (fill=currentColor)

## 목표
장표를 나열하지 않고 **실제 서비스 사이트처럼** 만든다. 링크를 연 사람이 "이게 뭐지?"로 들어와서 "잘 만들었네"로 나가게.
- 앞면(궁금하다) = 제품 사이트 / 뒷면(잘했다) = 12주 리서치·결정·화면·브랜드·팀

## 소스 (Figma 9wJzEafnp4YRzPSR6oswWX)
- 로고: Design System 페이지 > 'Logo' 섹션(2891:28558)
  - `LOOP / Logo / Wordmark` (2891:28539) Style = Violet · Intelligence · Delight · Clarity · On Dark · On Violet
  - `LOOP / Logo / App Icon` (2891:28555) Style = Wordmark · Symbol · Symbol Gradient
  - `LOOP / Logo / Symbol` (2891:28556)
- 리서치: PPT 페이지(38:23) / 브랜드·파운데이션: loop 디자인시스템 PDF / KV: Hi-Fi 페이지 'Key visual' 섹션(2673:35945)

## 사이트맵
| 경로 | 페이지 | 내용 | 층 |
|---|---|---|---|
| / | 홈(랜딩) | S01~S11 | 둘 다 |
| /service | 서비스 | Measure·Move·Grow·Report 기능 8개 + 처방사(예정) | 궁금 |
| /archive/research | 리서치 과정 | 장표 134장, 섹션 12개 | 잘함 |
| /archive/plan | 기획 과정 | 장표 31장, 섹션 6개 | 잘함 |
| /archive/make | 제작 과정 | DS PDF 21장 + IA·와이어프레임·Hi-Fi 보드(추가 예정) | 잘함 |
| /archive/result | 결과물 | 최종 화면(Hi-Fi 확정 후) | 잘함 |
| /next | 확장 (GNB 밖) | LOOP band · AR 글래스 | 궁금 |

GNB: [Wordmark/Violet] 서비스 · 리서치 과정 · 기획 과정 · 제작 과정 · 결과물 | [프로토타입 체험]. 팀은 랜딩 S10 + 푸터.

## 아카이브 페이지 템플릿 (epilog.framer.website 참고)
- 데이터: `webdorok-archive/manifest.json` (chapters → sections → slides). 4개 챕터가 같은 템플릿 하나를 씀
- 구성: 챕터 헤더(eyebrow · 제목 · 한 줄 요약 · 메타 칩) → 좌측 섹션 목차 sticky(장 수 표시, 스크롤 위치 하이라이트) + 우측 장표 스택 → 다음 챕터 링크 → 맨 위로 버튼
- 장표: 원본 16:9를 컨테이너 폭에 맞춤, 간격 0, 캡션 없음, `loading="lazy"`, WebP 변환(1920 / 960 srcset)
- Medium 이하: 목차가 GNB 아래 가로 스크롤 칩으로 바뀌고 sticky 유지
- 파일: research/r001–r134, plan/p001–p031 (Figma PPT 페이지 export), make/m001–m021 (DS PDF)

## 랜딩 섹션 + 카피 초안
| # | 섹션 | 내용 |
|---|---|---|
| S01 | Hero | eyebrow '국민체력 loop' / H1 '측정에서 끝나지 않는 건강의 선순환' / sub '국민체력100 측정 결과를 AI가 생활 언어로 풀고, 5분 첫 행동부터 12주 실천, 변화 확인까지 이어줍니다.' / Radial 글로우 KV + H-0 폰 + 칩(말·지구력형, 재측정까지 11일) |
| S02 | Problem | '측정은 AI로 고도화됐는데, 일상은 왜 그대로일까요?' / 32만 명(연간 체력인증) · 4.6%(과학적 체력관리 실천 국민) · 3일~1주(처방 후 중단, 인터뷰) / 김지연 인용. 출처 표기 필수 |
| S03 | The Loop | Measure(무인 측정·일상 언어) → Move(5분 첫 행동·12주 미션) → Grow(LOOP band 강도 조절·AI 코치) → Report(무브바디·재측정). Large에서 sticky 폰 |
| S04 | 스포트라이트 | 체력 유형 카드(O-15, MY-1b) / 컨디션 맞춤 강도(R-06, R-06d) / 공공 운동 코스(R-07c, R-11b) / 무브바디(H-4) |
| S05 | 다크 밴드 | '움직이는 동안엔, 화면이 어두워집니다.' 무인측정 A2 · R-11 · R-17 |
| S06 | 처방사 | **비워둠** (대시보드 작업 후) |
| S07 | Next | LOOP band / AR 글래스 |
| S08 | Behind | 링크: /archive/research.  12주 · 70명 · 2,562개 · 6곳 + 결정 카드(탭 5→4 / 코스=장소→미션 / 8블록→4블록) |
| S09 | 브랜드·DS | '100이 loop가 되기까지.' 로고 6종 + Delight·Intelligence·Clarity |
| S10 | 팀 | 김제인 · 이서연 (역할 TBD) |
| S11 | CTA | '직접 한 바퀴 돌아보세요.' + QR(Large만) |

## 반응형 (LOOP DS Break Point 그대로)
| | Small 320–480 | Medium 481–1024 | Large 1025~ |
|---|---|---|---|
| 그리드 | 6col / gutter 12 | 8col / 16 | 12col / 16 |
| 마진 | 20 | 24 | 28 (콘텐츠 max 1200) |
| H1/H2/본문 | 32/30/16 | 52/40/17 | 64/52/19 |
| 섹션 상하 | 72 | 96 | 120 |
- Medium: GNB 햄버거, 2단→1단, S03 sticky 해제 / Small: S03 가로 스와이프, 하단 고정 CTA, QR 숨김
- 최소 14px, 한글 `word-break: keep-all`

## 토큰 (loop 디자인시스템)
- Wanted Sans (OFL), 행간 150%, 자간 −2%
- violet 100 #DCE1F4 · 300 #92A9EC · 500 #495AEE · 700 #1F0280 · 900 #0A0227
- paper #F7F3EB · lime #D2F964 · aqua #ADE3EE · peach #FEB28E · pink #EFB9EE
- gray 50 #F4F4F5 → 900 #1F232B, Black #1A1A1A
- 그라디언트: Delight #FEB28E→#EFB9EE / Intelligence #333DED→#DBDEFF / Clarity #D2F964→#ADE3EE — 한 화면(섹션)에 하나만
- radius sm 8 · md 16 · lg 28 · full 999 / 블러 8·16·24·40·80

## 기술 메모(제안)
- Vite + React, GitHub Pages
- 화면 이미지는 Figma MCP로 export → `/public/screens/{코드}.webp`, 메타는 `screens.json`
- 섹션 진입 모션은 보이는 상태에서 시작, `prefers-reduced-motion` 대응
