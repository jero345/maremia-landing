import { Fragment } from 'react'
import { useReveal } from '../hooks/useReveal'

/**
 * Titular que entra palabra por palabra desde una máscara.
 *
 * `segments` es una lista de tramos: `{ text, className, split, br }`.
 * - `className` estiliza ese tramo (por ejemplo el degradado turquesa).
 * - `split: false` mantiene el tramo entero como una sola unidad — necesario
 *   cuando lleva un degradado recortado al texto, que se rompería por palabra.
 * - `br: true` inserta un salto de línea.
 *
 * El texto sigue siendo un único nodo legible: los lectores de pantalla
 * anuncian el titular completo, no palabras sueltas.
 */
export default function SplitText({
  as: Tag = 'h2',
  segments,
  className = '',
  delay = 0,
  step = 55,
  ...rest
}) {
  const { ref, props } = useReveal({ variant: 'mask' })
  let index = 0

  return (
    <Tag ref={ref} className={className} {...props} {...rest}>
      {segments.map((segment, segmentIndex) => {
        if (segment.br) return <br key={`br-${segmentIndex}`} />

        const words = segment.split === false ? [segment.text] : segment.text.split(' ')

        return words.map((word, wordIndex) => {
          const transitionDelay = `${delay + index * step}ms`
          index += 1

          return (
            <Fragment key={`${segmentIndex}-${wordIndex}`}>
              <span className="word-mask">
                <span className={segment.className} style={{ transitionDelay }}>
                  {word}
                </span>
              </span>{' '}
            </Fragment>
          )
        })
      })}
    </Tag>
  )
}
