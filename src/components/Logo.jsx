import LogoMark from './LogoMark'
import { TAGLINE } from '../data/contact'

/**
 * Marca completa.
 * `layout="row"` es el bloque horizontal de la barra superior;
 * `layout="stack"` reproduce el logo original (luna, olas, nombre y lema).
 */
export default function Logo({
  tone = 'dark',
  layout = 'row',
  tagline = false,
  className = '',
}) {
  const color = tone === 'light' ? 'text-cream' : 'text-navy'

  if (layout === 'stack') {
    return (
      <span className={`flex flex-col items-center ${color} ${className}`}>
        <LogoMark className="w-24 sm:w-28" animated />
        {/* El margen negativo recorta el espacio que el letter-spacing deja
            después de la última letra; si no, el nombre se ve descentrado. */}
        <span className="mt-4 mr-[-0.36em] font-display text-3xl font-medium tracking-[0.3em] sm:text-4xl sm:tracking-[0.36em]">
          MAREMÍA
        </span>
        {tagline && (
          <span className="mt-3 text-[0.62rem] font-light tracking-[0.32em] uppercase opacity-80 sm:text-xs">
            {TAGLINE}
          </span>
        )}
      </span>
    )
  }

  return (
    <span className={`flex items-center gap-3 ${color} ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
      <span className="flex flex-col leading-none">
        <span className="mr-[-0.26em] font-display text-xl font-medium tracking-[0.2em] sm:text-2xl sm:tracking-[0.26em]">
          MAREMÍA
        </span>
        {tagline && (
          <span className="mt-1.5 text-[0.5rem] font-light tracking-[0.24em] uppercase opacity-75 sm:text-[0.56rem] sm:tracking-[0.3em]">
            {TAGLINE}
          </span>
        )}
      </span>
    </span>
  )
}
