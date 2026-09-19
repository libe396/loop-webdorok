/**
 * 앱 화면 이미지 — Figma Hi-Fi 페이지에서 375폭 프레임을 @2x WebP로 export 해서
 * public/screens/ 에 아래 파일명으로 넣으면 자동으로 뜹니다. (없으면 코드 라벨 플레이스홀더)
 *   h0.webp   H-0 · 홈            (2673:21476)
 *   m0.webp   M-0 · 측정 탭 홈     (2673:20706)
 *   r00.webp  R-00 · 루틴 홈       (2673:20926)
 *   ai.webp   AI 챗봇 · 랜딩       (2659:18987)
 *   h4.webp   H-4 · 무브바디       (2840:27733)
 * public/img/band.webp   LOOP band 제품 이미지 (2701:56643)
 */
const base = import.meta.env.BASE_URL
export const screen = (code) => `${base}screens/${code}.webp`
export const img = (name) => `${base}img/${name}`
