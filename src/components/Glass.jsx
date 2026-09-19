/** 무광 글래스 카드 — 흰색 72% + 배경 블러 24 */
export default function Glass({ children, className = '', style, as: Tag = 'div' }) {
  return <Tag className={`glass ${className}`} style={style}>{children}</Tag>
}
