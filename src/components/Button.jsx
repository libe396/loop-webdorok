import './button.css'
export default function Button({ children, variant = 'fill', size = 'l', as: Tag = 'a', ...rest }) {
  return <Tag className={`btn btn-${variant} btn-${size}`} {...rest}>{children}</Tag>
}
