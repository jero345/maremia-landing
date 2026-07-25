const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const FINE_POINTER = '(hover: hover) and (pointer: fine)'

/** ¿Podemos animar? En SSR asumimos que no, para no renderizar contenido oculto. */
export function motionOk() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return !window.matchMedia(REDUCED_MOTION).matches
}

/** Ratón o trackpad: los efectos de puntero (tilt, brillo) no aplican en táctil. */
export function finePointer() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(FINE_POINTER).matches
}
