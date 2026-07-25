/**
 * Un único listener de scroll para toda la página.
 * Cada suscriptor recibe la posición ya leída, dentro del mismo frame,
 * así evitamos decenas de listeners y lecturas de layout repetidas.
 */
const subscribers = new Set()
let frame = 0

function flush() {
  frame = 0
  const y = window.scrollY
  const viewport = window.innerHeight
  for (const fn of subscribers) fn(y, viewport)
}

function schedule() {
  if (frame) return
  frame = window.requestAnimationFrame(flush)
}

export function onScrollFrame(fn) {
  if (typeof window === 'undefined') return () => {}

  if (subscribers.size === 0) {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
  }
  subscribers.add(fn)
  fn(window.scrollY, window.innerHeight)

  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0) {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      }
    }
  }
}
