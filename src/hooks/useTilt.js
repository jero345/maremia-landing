import { useEffect, useRef } from 'react'
import { finePointer, motionOk } from '../lib/motion'

/**
 * Inclinación 3D + posición del brillo siguiendo al puntero.
 * Escribe `--tilt-x`, `--tilt-y`, `--mx`, `--my` y marca `data-tilting`.
 * Se aplica con las utilidades `tilt` y `glare`. Inactivo en táctil.
 */
export function useTilt({ max = 7 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || !motionOk() || !finePointer()) return

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      node.style.setProperty('--tilt-x', `${((0.5 - y) * 2 * max).toFixed(2)}deg`)
      node.style.setProperty('--tilt-y', `${((x - 0.5) * 2 * max).toFixed(2)}deg`)
      node.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      node.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
      node.dataset.tilting = 'true'
    }

    const handleLeave = () => {
      node.style.setProperty('--tilt-x', '0deg')
      node.style.setProperty('--tilt-y', '0deg')
      node.dataset.tilting = 'false'
    }

    node.addEventListener('pointermove', handleMove)
    node.addEventListener('pointerleave', handleLeave)
    return () => {
      node.removeEventListener('pointermove', handleMove)
      node.removeEventListener('pointerleave', handleLeave)
    }
  }, [max])

  return ref
}
