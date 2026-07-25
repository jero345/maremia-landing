import { useEffect, useRef, useState } from 'react'
import { motionOk } from '../lib/motion'

/** Cuenta desde 0 hasta `to` la primera vez que la cifra entra en pantalla. */
export function useCountUp(to, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(() => (motionOk() ? 0 : to))

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (!motionOk() || typeof IntersectionObserver === 'undefined') {
      setValue(to)
      return
    }

    let frame = 0
    let startedAt = 0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        const step = (now) => {
          if (!startedAt) startedAt = now
          const progress = Math.min(1, (now - startedAt) / duration)
          const eased = 1 - (1 - progress) ** 3
          setValue(Number((to * eased).toFixed(decimals)))
          if (progress < 1) frame = window.requestAnimationFrame(step)
        }

        frame = window.requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [to, duration, decimals])

  return { ref, value }
}
