# Claude Code 지시 이력

결정 사항이 생길 때마다 여기에 프롬프트를 추가. 위에서부터 순서대로 붙여넣기.

---

## #01 · Figma 에셋 가져오기 (앱 화면 5장 + 밴드)

```
CLAUDE.md의 "Figma 에셋 노드 ID" 표에 있는 6개 노드를 Figma MCP로 가져와서 사이트에 넣어줘.

- 파일 키: 9wJzEafnp4YRzPSR6oswWX
- 앱 화면 5장(h0, m0, r00, ai, h4): 노드를 scale 2 PNG로 받아서
  위에서부터 375×812 비율(750×1624px)로 크롭 → WebP(quality 82)로 변환 →
  public/screens/{이름}.webp 로 저장. 화면이 812보다 길어도 위쪽만 쓰면 돼.
- 밴드(2701:56643): scale 1로 받아서 WebP로 → public/img/band.webp
- 변환은 sharp(npx 또는 devDependency)로. 원본 PNG는 남기지 마.
- 끝나면 npm run dev로 Hero · S03 폰 안에 화면이 뜨는지 확인하고, CLAUDE.md 진행 상태의 "앱 화면 이미지" 체크.
```

## #02 · 아카이브 장표 가져오기 + 챕터 페이지

```
docs/archive/manifest.json 기준으로 장표 아카이브 페이지를 만들어줘.

1) 장표 이미지
- Figma 파일 9wJzEafnp4YRzPSR6oswWX 의 PPT 페이지(38:23)에서 이름이 archive/research/r001 ~ r134,
  archive/plan/p001 ~ p031 인 프레임 165장을 export (JPG 1x, 이미 export 설정 걸려 있음).
- 각각 WebP(1920폭, quality 78) + 960폭 버전 두 개로 변환 → public/archive/{research|plan}/{id}.webp, {id}@960.webp
- docs/archive/make/m001~m021.jpg 가 없으면 서연에게 요청 (designthinking/webdorok-archive/make 에 있음) → 같은 방식으로 public/archive/make/

2) 페이지
- HashRouter 추가: #/archive/research | plan | make | result
- 템플릿 하나로 4챕터: 챕터 헤더(eyebrow · 제목 · 한 줄 요약 · 메타 칩) → 좌측 섹션 목차 sticky(장 수 표시, 스크롤 위치 하이라이트) + 우측 장표 스택(간격 0, 캡션 없음, loading="lazy", srcset 960/1920) → 다음 챕터 링크 → 맨 위로 버튼
- 1024 이하에서 목차는 GNB 아래 가로 스크롤 칩(sticky)
- 결과물(result) 챕터는 아직 비어 있음 → "Hi-Fi 확정 후 공개" 빈 상태
- 스타일은 tokens.css만 사용. 참고 레이아웃: docs/LOOP_webdorok_IA.md "아카이브 페이지 템플릿"
```

## #04 · (반영 완료) S03 레이아웃 — 프로그레스바 삭제 · 프로스티드 글라스 카드

붙여넣을 필요 없음. 기록용.
- 하단 4단계 프로그레스바(.loop-steps) 삭제
- 뒤 폰 = 이전 단계(좌상단, 흐림 처리) / 앞 폰 = 현재 단계(우하단 오프셋)
- 카드 `.glass-frost`: 좌→우 흰색 38→86% 그라디언트 + backdrop blur 28 · saturate 160 + 안쪽 흰 하이라이트 + 부드러운 그림자. 미지원 브라우저는 흰색 94%로 대체
- 폰은 `width="100cqw"`(.loop-phones에 container-type) — 반경이 찌그러지던 문제 수정

## #05 · S04 DS 원본 에셋 export (코드는 이미 반영 — 파일만 넣으면 됨)

```
S04 Play 코드는 이미 DS 원본 이미지를 쓰도록 바뀌어 있어(src/sections/Play.jsx 상단 const A).
Play.jsx / play.css 는 건드리지 말고, 아래 5개 파일만 Figma MCP로 뽑아서 public/img/play/ 에 넣어줘.
파일 키 9wJzEafnp4YRzPSR6oswWX

1) typecard.webp  ← 2675:53968 "TypeCard · 저장용" (335×537) — scale 2 PNG → WebP q88
2) route.svg      ← 2782:23838 "LOOP / Course Route" Mode=Light — SVG export (텍스트는 아웃라인 그대로 OK)
3) rom-photo.webp ← 2388:11194 "Chart / Range of Motion" 의 배경 이미지 fill 원본만
                    (자식 레이어 없이 사진만. get_design_context 에셋 URL 또는 image fill 다운로드)
                    → 670×816으로 cover 크롭 → WebP q82
4) pose-before.svg  ← 2389:21376 "Previous / fine dashed line + dots" — SVG export, 335×408 viewBox 유지
5) pose-current.svg ← 2389:11193 "Current / fine line + solid dots" — SVG export, 335×408 viewBox 유지

- 4·5는 배경 없이 선·점만 나와야 해 (3번 사진 위에 겹쳐 씀). 흰 배경이 섞여 나오면 그 rect만 지워줘.
- 끝나면 npm run dev 로 S04 확인: 유형 카드 / 코스 경로(왼쪽부터 드러남) / 무브바디(드래그로 점선↔실선) 다 보이는지.
- CLAUDE.md 진행 상태에 "S04 DS 에셋" 체크.
```

## #06 · (반영 완료) 글라스 포인트 적용 · S04 DS 스펙

기록용.
- `.glass-frost` 공통 클래스를 base.css로 이동 (뒤에 색·이미지 있을 때만 사용)
- 적용: GNB(스크롤 후) · Hero 카드 3개 · S03 설명 카드 · S04 토이 카드 4개 · 무브바디 '3개월 전' 칩
- S04 배경에 violet 계열 블롭 3개 (섹션당 그라디언트 하나 규칙 유지)
- 수면 슬라이더 = DS Slider(Web) 스펙: rail 54 · violet-100 · 안쪽 흰 그림자 10 · 점 눈금 · knob 40 violet-500 안에 값

## #07 · (반영 완료) typecard 모서리 · pose-before 확인

기록용.
- typecard.webp 모서리 #F4F4F5 → 투명 처리 (DS 반경 32@335 기준 라운드 마스크). CSS 반경 19px(=32×200/335), 배경 none
- pose-before: Figma 원본도 실선(dashPattern 없음). 레이어 이름만 "dashed". DS대로 실선 유지 — 흰색(3개월 전) vs 보라(현재) 색으로 구분

## #08 · GitHub 저장소 만들고 Pages 배포

```
이 프로젝트를 GitHub에 올리고 GitHub Pages로 배포해줘.
배포 워크플로(.github/workflows/deploy.yml)와 .gitignore는 이미 만들어져 있어. 내용 바꾸지 마.

1) 준비 확인
- `gh --version` 없으면 `brew install gh` (brew도 없으면 멈추고 나한테 알려줘)
- `gh auth status` 로그인 안 돼 있으면 `gh auth login` 실행하고, 브라우저 로그인은 내가 할 테니 기다려줘
2) 빌드 먼저 확인: `npm run build` 에러 없어야 함
3) git
- `git init -b main`
- `git add -A` 한 뒤 `git status`로 node_modules, dist, docs/archive의 jpg가 빠졌는지 확인
- 커밋 메시지: "LOOP 웹도록 첫 배포"
4) 저장소 생성 + push
- `gh repo create loop-webdorok --public --source=. --remote=origin --push`
  (이름 겹치면 알려줘. Pages는 무료 계정이면 public이어야 함)
5) Pages 켜기 (소스 = GitHub Actions)
- `gh api -X POST repos/{owner}/loop-webdorok/pages -f build_type=workflow`
  (이미 켜져 있다는 에러면 무시)
6) 배포 확인
- `gh run watch` 로 워크플로 끝날 때까지 보고, 실패하면 로그 보고 고쳐줘
- 끝나면 사이트 주소(https://{owner}.github.io/loop-webdorok/) 알려주고,
  그 주소에서 첫 화면, #/archive/research, 폰 화면 이미지가 뜨는지 확인해줘
7) CLAUDE.md "실행" 섹션에 배포 주소와 "main에 push하면 자동 배포" 한 줄 추가하고 커밋·push
```

## #09 · S05 Focus 다크 화면 6장 export

```
S05 Focus(src/sections/Focus.jsx)는 이미 만들어져 있고, 화면 이미지만 없어.
#01과 같은 방식으로 아래 6개 노드를 뽑아서 public/screens/ 에 넣어줘. 코드는 건드리지 마.
파일 키 9wJzEafnp4YRzPSR6oswWX (Hi-Fi 페이지 "무인 측정 진행 — 다크 v2" 섹션)

- s0.webp ← 2789:19754  S0 · 측정 모드 진입 (다크 전환)
- a1.webp ← 2786:18937  A1 v2 · NFC 태그 대기
- a2.webp ← 2786:18954  A2 v2 · 태그 인식 · 측정 준비
- a3.webp ← 2786:18978  A3 v2 · 측정 중 (실시간)
- a4.webp ← 2786:19005  A4 v2 · 종목 완료 · 자동 기록
- s9.webp ← 2786:19127  S9 v2 · 측정 완료 (라이트 복귀)

scale 2 PNG → 위에서부터 750×1624 크롭 → WebP q82. 조상 레이어(캔버스·섹션 배경)가 딸려 나오면 #05 때처럼 걷어내.
끝나면 npm run dev로 S05 스크롤해서 다크 5장 → 라이트 S9 순서로 바뀌는지 확인하고, CLAUDE.md에 체크.
```

## #10 · (반영 완료) S05 Focus · S06 LOOP band

기록용.
- S05 `Focus.jsx`: 핀 340vh. 배경 Gray50 → Gray900(#1F232B, 앱 다크 배경) 스크럽(--d, color-mix) → 다크 화면 5장(S0·A1~A4) → 다시 밝아지며 S9. 왼쪽 단계 목록 = 화면 제목 그대로. 다크 구간엔 GNB도 다크(html.is-focus-dark)
- S06 `Band.jsx`: 핀 240vh. 밴드가 누워 있다가(rotateX 38°) 스크롤하면 서고, 핫스팟 3개(심박·수면·강도 자동 조절) 글라스 카드로. 1024 이하는 카드 대신 아래 목록
- `public/img/band-cut.webp`: band.webp 흰 배경 투명 처리(그림자 반투명 유지, 로고 흰색 보존)
- Rest.jsx엔 S07~S10만 남음

## #11 · (반영 완료) S08 Behind · S09 Brand · S10 Outro · 아카이브 점검

기록용.
- S08 `Behind.jsx`: 12주·70명·2,562개·6곳 카운트업 → 장표 마퀴 2줄(research / plan+make, @960 썸네일, 클릭하면 해당 챕터) → 결정 카드 3장 sticky 스택 + 챕터 4개 링크
- S09 `Brand.jsx`: 핀 220vh, 워드마크 4벌 크로스페이드(한 화면 그라디언트 하나). 모바일은 설명 줄 숨김
- S10 `Outro.jsx`: violet-100 워드마크 위로 커서 주변만 Intelligence 그라디언트로 차오름(SVG mask). 터치 기기는 전체 채움. CTA 마그네틱, "다음 측정까지 D-90 ↺" → 맨 위
- Rest.jsx는 S07 처방사 자리만 남김. 안 쓰는 .todo/.nums 등 rest.css 정리
- 아카이브 페이지 점검: 1920/390 둘 다 목차 sticky·칩·빈 상태 정상. 수정 없음
- 남은 것: 프로토타입 체험 URL (Hero · GNB · Outro 버튼)

## #12 · 커밋 + push (배포)

```
지금 작업 트리 전부 한 번에 커밋하고 push해서 배포해줘.
1) npm run build 에러 없는지 먼저 확인
2) git status로 .band_preview.png 같은 임시 파일이 안 올라가는지 확인 (.gitignore에 있음)
3) 커밋 메시지: "S04 DS 에셋 · S05 Focus · S06 band · S08~S10 · 글라스"
4) push 후 gh run watch로 배포 끝날 때까지 보고, 사이트에서 S05~S10 스크롤이 도는지 1920·390 폭 둘 다 확인
```


## #14 · 공개 완성도 개선 (#13 결정 카드 대비 포함)

A→E 순서로 구현하고 각 단계 `npm run build` 확인.

- A: title/description/OG/Twitter/theme-color, sharp 1200×630 OG, DS 심볼 favicon. S07/GNB 결과물 숨김·S08 결과물 비활성. `PROTOTYPE_URL` 빈 값이면 세 CTA 숨김, 값이 있으면 새 탭.
- B: 측정 기반 유형 카드 문구·회전 유지, 다시 뽑기 삭제. +12° 및 벤토에 예시 표시. 지정한 결정 카드 문구 반영. Figma PPT(38:23)에서 S02 출처 조회·장표 딥링크.
- C (#13): 흰 glass-frost 카드 3장, violet 라벨·gray 취소선·ink 본문. 카드 뒤 KV 블롭 하나(blur 60), KV 그림자는 외부만.
- D: S06 일반 섹션·진입 1회·핫스팟 0.4초 간격. S05 340→240vh, S09 220→150vh. 1024 이하 S05 6장 가로 스와이프, S09 워드마크 2×2.
- E: S03 시점 추가. manifest summary, 섹션 헤더·요약, 원본 라이트박스, 상하 `← 서비스 소개로` 링크.

서연 확인 결과:

1. 프로토타입 URL 없음: 버튼 숨김 유지.
2. 아카이브 요약 21개 승인. 브랜드·로고 및 장표 없는 IA/와이어프레임/Hi-Fi/result 5개 섹션은 빈 값 유지.
3. 결정 카드 3개 모두 근거 링크 없이 유지. p020은 관련 기능 설명일 뿐 변경 이력의 직접 근거가 아님.
4. 32만·4.6%는 PPT 장표 출처를 붙여 유지. 원출처 문서·기준연도는 미확인. 3일~1주는 방문자 6명 인터뷰(2026) 맥락으로 한정.

검증:

- A/B/C/D/E 단계별 빌드 성공. 1920×1080 및 390×844에서 캡처·숨김·S06 일반 스크롤·S05 6장·S09 2×2·라이트박스 좌우/ESC/배경 닫기·랜드 복귀 검증.
- Landing scrollHeight: 데스크톱 21,918→17,818px(−18.7%), 모바일 17,220→13,425px(−22.0%).
- 내장 브라우저 오류를 별도 Chromium 헤드리스 검증으로 대체. 모바일은 에뮬레이션 기준.
- 근거 링크 이동 시 Lenis의 이전 페이지 높이가 남는 문제 발견·수정 후 목표 위치 확인.
- 자세한 초안/출처/승인: `docs/review-14.md`, `docs/archive/summary-drafts-14.json`.
- 커밋: `공개 완성도 개선 #14` → main push → GitHub Actions Pages 배포 확인.

## #15 · #14 이후 1280·1440 폭 이슈 수정

요청:

1. S06 카드가 설명 문구와 겹치거나 화면 밖으로 나가는 문제 해결. 실제 card rect 측정, stage 밖이면 l↔r/b 전환, ResizeObserver 재계산. 1600 이하 심박 b·수면 l 기준. 1920/1600/1440/1280/1025 캡처.
2. S06 블롭의 상하 직선 경계 제거(크기 조절 또는 mask fade), 1440/1920 확인.
3. S10 URL 없으면 `측정에서 끝나지 않는\n건강의 선순환.`, 있을 때만 체험 제목+CTA.
4. 빌드 → 커밋 `#15 노트북 폭 핫스팟·아웃트로 문구` → push → 배포 확인. CLAUDE.md·지시 이력 기록.

결과:

- 측정 기반 배치·카드 간 충돌 회피, 회전 이미지와 카드 레이어 분리, 모바일 좌표 초기화.
- 섹션 내부 블롭 + 상하 mask fade. Outro URL 조건부 제목.
- 요청한 5개 폭에서 카드 3장의 stage 포함·설명/카드 간 비중첩 검사 통과, 각 폭 캡처 확인. 1440/1920 블롭 경계 없음.
- 390 모바일 목록 유지 및 데스크톱 좌표 초기화 확인. URL 없음/있음 두 분기에서 제목·CTA·새 탭 속성 확인. 실제 PROTOTYPE_URL은 빈 값 유지.
- npm run build 성공. 내장 브라우저 부트스트랩 오류로 별도 Playwright Chromium에서 검증.

## #16 · 리뷰 반영

요청:

0. #15 미완료면 먼저 반영(이미 dc4efb2로 배포 완료).
1. S02 핀 제거, 수치 고정·최초 진입 opacity/translateY 0.5초, 문장 스크럽은 뷰포트 진입 기준. 출처 유지.
2. S03 데스크톱 겹침은 유지하되 앞 폰 너비 20% 이하, 이전 폰 .35. 1024 이하 64px 진행 표시·60vw 중앙 폰·아래 설명 카드.
3. Hero 검정 ‘LOOP가 이어주는 과정 보기’ → S03, 리서치는 t16 medium violet 텍스트 링크.
4. S04 ‘측정 결과에 맞춘 운동 코스’ / ‘화면에 들어오면 추천 경로가 그려져요’ / 하단 ‘예시’.
5. S08 블롭 기존의 60%, 외부 그림자 blur 축소.
6. S09 150vh→100vh. 1440×1000·1920·390 캡처 및 전체 높이 전후 보고.
7. 빌드 → 커밋 `#16 S02 고정값·S03 겹침·Hero 동선` → push → 배포. 두 기록 문서 업데이트.

검증 결과:

- S03 1440/1920 겹침 폭 약 3.5%(20% 이하), 앞 폰 상단·주요 버튼 노출 확인. 모바일 390/1024에서 가장 긴 화면과 카드 간격 24px, 가로 넘침 없음.
- 모바일에서 폰 아래 설명까지 볼 수 있도록 패널 높이에 맞춰 sticky top 조정. 4단계 캡처에서 폰/설명 비중첩 확인.
- S02 스크롤 위치를 바꿔도 세 수치 고정. 문장만 진입 스크럽, Hero 주 버튼이 S03 상단으로 이동.
- S09 높이 축소로 기존 핀 진행률 분모가 0이 되는 문제를 방지하도록 진입 진행률 사용.
- npm run build 성공. lint 기존 경고 3개, 신규 오류 없음.
- Chromium 캡처: 1440×1000, 1920×1080, 390×844. 내장 브라우저 연결 오류로 별도 Chromium 사용.
- 전체 높이: 1440 16,478→14,379px(−12.7%), 390 13,425→12,714px(−5.3%).
