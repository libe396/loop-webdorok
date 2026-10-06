let position = null

export function rememberLandingPosition(event) {
  const link = event.target.closest('a')
  if (link?.getAttribute('href')?.startsWith('#/archive/')) position = window.scrollY
}

export function getLandingReturnState() {
  return position === null ? null : { returnY: position }
}
