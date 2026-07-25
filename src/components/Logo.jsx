import LogoMark from './LogoMark'
import { TAGLINE } from '../data/contact'

/**
 * Marca completa: la luna y las olas recortadas del logo original, junto al
 * nombre y —si se pide— el lema.
 *
 * El nombre y el lema van en texto y no en imagen a propósito: en el logo
 * original el lema mide 20 px sobre 1080, así que a tamaño de barra o de pie
 * quedaría en 2 o 3 píxeles, ilegible. En texto se lee siempre, se puede
 * seleccionar y lo lee un lector de pantalla.
 */
export default function Logo({ tone = 'dark', tagline = false, className = '' }) {
  const color = tone === 'light' ? 'text-cream' : 'text-navy'

  return (
    <span className={`flex items-center gap-3 ${color} ${className}`}>
      <LogoMark className="h-9 w-auto shrink-0 sm:h-10" />
      <span className="flex flex-col leading-none">
        <span className="mr-[-0.26em] font-display text-xl font-medium tracking-[0.2em] sm:text-2xl sm:tracking-[0.26em]">
          MAREMÍA
        </span>
        {tagline && (
          <span className="mt-2 mr-[-0.28em] text-[0.5rem] font-light tracking-[0.28em] uppercase opacity-75 sm:text-[0.56rem]">
            {TAGLINE}
          </span>
        )}
      </span>
    </span>
  )
}
