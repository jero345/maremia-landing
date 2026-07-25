import { useEffect, useRef } from 'react'
import { motionOk } from '../lib/motion'
import { onScrollFrame } from '../lib/scroll'

/**
 * Desplaza un elemento a distinta velocidad que la página.
 * Escribe la variable `--parallax`; aplícala con la utilidad `parallax`.
 * `speed` positivo = el elemento se queda atrás (sensación de profundidad).
 */
export function useParallax({ speed = 0.12, max = 90 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !motionOk()) return

    return onScrollFrame((_, viewport) => {
      const rect = node.getBoundingClientRect()
      // Fuera de pantalla no hay nada que actualizar.
      if (rect.bottom < -200 || rect.top > viewport + 200) return

      const distance = rect.top + rect.height / 2 - viewport / 2
      const offset = Math.max(-max, Math.min(max, distance * -speed))
      node.style.setProperty('--parallax', `${offset.toFixed(2)}px`)
    })
  }, [speed, max])

  return ref
}
