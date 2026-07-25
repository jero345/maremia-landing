import markUrl from '../assets/logo-mark.png'

/**
 * El símbolo de la marca: la luna y las olas, recortadas del logo original.
 *
 * No es un `img`: es una máscara. El PNG solo aporta la silueta (su canal
 * alfa) y el color lo pone `currentColor`, así el mismo archivo sirve en
 * crema sobre azul noche y en azul noche sobre crema, sin duplicar assets.
 *
 * Basta con darle altura: el ancho sale solo de la proporción original.
 */
export default function LogoMark({ className = '' }) {
  return (
    <span
      role="presentation"
      className={`logo-mask block ${className}`}
      style={{ '--logo-src': `url(${markUrl})`, aspectRatio: '640 / 544' }}
    />
  )
}
