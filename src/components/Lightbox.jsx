import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

/**
 * Visor de fotografía a pantalla completa.
 * Cierra con Escape o clic fuera, navega con flechas y devuelve el foco
 * al elemento que lo abrió; el fondo queda bloqueado mientras está abierto.
 */
export default function Lightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null)
  const openerRef = useRef(null)
  const open = index !== null

  useEffect(() => {
    if (!open) return

    openerRef.current = document.activeElement
    closeRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate(1)
      if (event.key === 'ArrowLeft') onNavigate(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      openerRef.current?.focus?.()
    }
  }, [open, onClose, onNavigate])

  if (!open) return null

  const photo = items[index]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="fixed inset-0 z-100 flex items-center justify-center bg-navy/94 p-4 backdrop-blur-md sm:p-8"
      style={{ animation: 'fade-in 260ms var(--ease-out-soft)' }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar la fotografía"
        className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/30 text-cream transition-colors duration-200 hover:bg-cream/15 sm:right-7 sm:top-7"
      >
        <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => onNavigate(-1)}
        aria-label="Fotografía anterior"
        className="absolute left-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-200 hover:bg-cream/15 sm:left-7"
      >
        <ChevronLeft className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </button>

      <figure className="flex max-h-full flex-col items-center gap-4">
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="max-h-[72vh] w-auto rounded-2xl border border-cream/20 object-contain shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
          style={{ animation: 'zoom-in 420ms var(--ease-out-soft)' }}
        />
        <figcaption className="text-center">
          <p className="font-display text-2xl font-medium text-cream">{photo.caption}</p>
          <p className="mt-1 text-sm text-cream/65">{photo.note}</p>
        </figcaption>
      </figure>

      <button
        type="button"
        onClick={() => onNavigate(1)}
        aria-label="Fotografía siguiente"
        className="absolute right-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-cream/25 text-cream transition-colors duration-200 hover:bg-cream/15 sm:right-7"
      >
        <ChevronRight className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </div>
  )
}
