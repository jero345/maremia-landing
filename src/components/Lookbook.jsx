import { useCallback, useState } from 'react'
import { Expand } from 'lucide-react'
import Lightbox from './Lightbox'
import Media from './Media'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { lookbook } from '../data/photos'

/** Tarjeta-botón: la foto completa es el disparador del visor ampliado. */
function Frame({ photo, index, onOpen, className, sizes, delay, variant }) {
  return (
    <Reveal
      variant={variant}
      delay={delay}
      className={`group relative overflow-hidden rounded-2xl bg-sand ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="img-sheen block h-full w-full cursor-pointer text-left"
      >
        <Media
          photo={photo}
          sizes={sizes}
          className="h-full w-full"
          imgClassName="duration-[900ms] group-hover:scale-[1.07]"
        />

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/80 via-navy/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-95"
        />

        <span className="pointer-events-none absolute inset-x-5 bottom-5 z-3 flex items-end justify-between gap-3">
          <span className="block">
            <span className="block font-display text-2xl font-medium text-cream">
              {photo.caption}
            </span>
            <span className="block text-[0.66rem] font-light tracking-[0.14em] text-cream/75 uppercase">
              {photo.note}
            </span>
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40 bg-navy/40 text-cream opacity-0 transition-[opacity,scale] duration-500 ease-out-soft group-hover:scale-110 group-hover:opacity-100">
            <Expand className="h-4 w-4" strokeWidth={1.75} />
          </span>
        </span>

        <span className="sr-only">Ampliar la fotografía: {photo.caption}</span>
      </button>
    </Reveal>
  )
}

export default function Lookbook() {
  const [openIndex, setOpenIndex] = useState(null)

  const navigate = useCallback(
    (step) => setOpenIndex((i) => (i + step + lookbook.length) % lookbook.length),
    [],
  )
  const close = useCallback(() => setOpenIndex(null), [])

  return (
    <section id="lookbook" className="scroll-mt-20 bg-shell py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Lookbook"
          title="Así se ven puestas"
          description="Fotos del último viaje, sin retoque ni estudio: luz del Caribe, agua salada y piezas reales. Toca cualquiera para verla en grande."
          align="center"
        />

        {/* Seis fotos en 3 × 2, todas con la misma proporción: las filas
            siempre cierran completas, sin huecos ni tarjetas descolgadas.
            El ritmo lo da el escalonado de la entrada, no la retícula. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lookbook.map((photo, i) => (
            <Frame
              key={photo.key}
              photo={photo}
              index={i}
              onOpen={setOpenIndex}
              variant="rise"
              delay={(i % 3) * 90}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 46vw, 92vw"
              className="aspect-4/5"
            />
          ))}
        </div>
      </div>

      <Lightbox items={lookbook} index={openIndex} onClose={close} onNavigate={navigate} />
    </section>
  )
}
