import { useEffect, useState } from 'react'
import { onScrollFrame } from '../lib/scroll'

/** Hilo dorado en el borde superior que marca cuánto se ha leído de la página. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(
    () =>
      onScrollFrame((y, viewport) => {
        const scrollable = document.documentElement.scrollHeight - viewport
        setProgress(scrollable > 0 ? Math.min(1, y / scrollable) : 0)
      }),
    [],
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-70 h-0.5 origin-left bg-linear-to-r from-sea via-sea-bright to-sea-mist transition-[scale] duration-150 ease-out"
      style={{ scale: `${progress} 1` }}
    />
  )
}
