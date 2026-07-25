import { useEffect, useState } from 'react'

/** Devuelve el id de la sección que domina la pantalla, para marcar el enlace activo. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (nodes.length === 0) return

    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.intersectionRatio)

        let best = null
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        }
        if (best) setActive(best)
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-72px 0px -45% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [ids])

  return active
}
