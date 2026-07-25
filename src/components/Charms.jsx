import { useCallback, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Media from './Media'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { charms } from '../data/photos'

/**
 * Carrusel de charms con scroll horizontal nativo:
 * arrastra con el dedo en móvil, con los botones o el teclado en escritorio.
 */
export default function Charms() {
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const syncEdges = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setAtStart(track.scrollLeft < 8)
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 8)
  }, [])

  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section id="charms" className="scroll-mt-20 bg-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Charms"
            title="Cámbialos según el día"
            description="Cuarzo, ágata, concha o madreperla. Se enganchan y se quitan sin herramientas: un mismo collar, mil maneras de llevarlo."
          />

          <Reveal delay={200} className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Ver los charms anteriores"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-navy/20 text-navy transition-[background-color,border-color,opacity] duration-300 hover:border-navy hover:bg-navy hover:text-cream disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Ver los charms siguientes"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-navy/20 text-navy transition-[background-color,border-color,opacity] duration-300 hover:border-navy hover:bg-navy hover:text-cream disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </button>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-10">
          <ul
            ref={trackRef}
            onScroll={syncEdges}
            tabIndex={0}
            aria-label="Carrusel de charms"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-thin"
          >
            {charms.map((charm) => (
              <li
                key={charm.key}
                className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
              >
                <figure className="img-sheen relative overflow-hidden rounded-2xl bg-shell">
                  <Media
                    photo={charm}
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 78vw"
                    className="aspect-4/5 w-full"
                    imgClassName="duration-[900ms] group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/75 via-transparent to-transparent"
                  />
                  <figcaption className="absolute inset-x-5 bottom-5 z-3">
                    <p className="font-display text-2xl font-medium text-cream">
                      {charm.caption}
                    </p>
                    <p className="text-[0.66rem] font-light tracking-[0.14em] text-cream/75 uppercase">
                      {charm.note}
                    </p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
