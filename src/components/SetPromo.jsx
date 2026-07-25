import { MessageCircle } from 'lucide-react'
import LogoMark from './LogoMark'
import Media from './Media'
import Reveal from './Reveal'
import { useTilt } from '../hooks/useTilt'
import { catCapas } from '../data/photos'
import { WHATSAPP_NUMBER } from '../data/contact'

const SET_MESSAGE = 'Hola Maremía, quiero armar un set de tres piezas.'

export default function SetPromo() {
  const tiltRef = useTilt({ max: 5 })

  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal
          variant="blur"
          className="relative grid overflow-hidden rounded-3xl bg-navy text-cream lg:grid-cols-[1fr_0.85fr]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.22),transparent_70%)] animate-drift"
          />

          <div className="relative flex flex-col justify-center px-7 py-14 sm:px-12 lg:py-20">
            <LogoMark className="h-9 w-9 text-sea-bright" animated />

            <p className="mt-6 text-[0.66rem] font-light tracking-[0.3em] text-sea-bright uppercase">
              Arma tu set
            </p>
            <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">
              Tres piezas, <span className="italic text-sea-bright">15 % menos</span>
            </h2>
            <p className="mt-5 max-w-md text-base text-cream/80">
              Combina collar, pulsera y charm — de la colección que quieras. Nos escribes, elegimos
              juntas las piedras y te lo mandamos en un solo empaque.
            </p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
              {['Sin mínimo de compra', 'Se combina con envío gratis', 'Listo en 5 días'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-sea-bright"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ),
              )}
            </ul>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(SET_MESSAGE)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-sheen mt-9 inline-flex min-h-13 w-fit cursor-pointer items-center gap-2.5 rounded-full bg-cream px-8 text-xs font-semibold tracking-[0.14em] text-navy uppercase transition-[background-color,scale] duration-300 hover:scale-105 hover:bg-sea-mist active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              Armar mi set
            </a>
          </div>

          <div ref={tiltRef} className="tilt glare relative min-h-72 lg:min-h-0">
            <Media
              photo={catCapas}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="absolute inset-0 h-full w-full"
              imgClassName="object-[50%_45%]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-r from-navy via-navy/25 to-transparent lg:from-navy lg:via-navy/40"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
