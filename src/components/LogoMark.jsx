import { useId } from 'react'

/**
 * El símbolo de la marca: luna creciente sobre tres olas.
 * Se dibuja con `currentColor`, así hereda el color del contexto
 * (crema sobre azul noche, o azul noche sobre crema).
 */
export default function LogoMark({ className = '', animated = false }) {
  const maskId = `moon-${useId().replace(/:/g, '')}`

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill="none">
      <mask id={maskId}>
        {/* En una máscara, blanco conserva y negro recorta: el círculo
            desplazado es el mordisco que convierte la luna en creciente. */}
        <circle cx="56" cy="34" r="25" fill="white" />
        <circle cx="68" cy="26" r="23" fill="black" />
      </mask>
      <circle cx="56" cy="34" r="25" fill="currentColor" mask={`url(#${maskId})`} />

      <g
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={animated ? 'animate-tide' : undefined}
      >
        <path d="M12 76c14-11 27-11 40-2s26 9 40-4" />
        <path d="M20 86c12-9 24-9 36-1s24 8 36-4" opacity="0.85" />
        <path d="M28 96c10-8 21-8 32-1s21 7 31-4" opacity="0.7" />
      </g>
    </svg>
  )
}
