import { ArrowRight, ChevronDown } from 'lucide-react'
import Media from './Media'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { useParallax } from '../hooks/useParallax'
import { heroModelo } from '../data/photos'

export default function Hero() {
  const photoParallax = useParallax({ speed: -0.08, max: 70 })

  return (
    <section
      id="inicio"
      className="relative -mt-26 flex min-h-[92vh] items-end overflow-hidden bg-navy pt-26 text-cream"
    >
      {/* Fotografía de portada, ligeramente más lenta que el scroll */}
      {/* Sobresale por arriba y por abajo para que el parallax nunca deje bordes */}
      <div ref={photoParallax} className="parallax absolute -top-16 -bottom-16 left-0 right-0">
        <Media
          photo={heroModelo}
          priority
          sizes="100vw"
          className="h-full w-full"
          imgClassName="object-[52%_30%]"
        />
      </div>

      {/* Velo para que el texto se lea sobre cualquier zona de la foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-navy via-navy/55 to-navy/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-navy/70 via-transparent to-transparent"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="max-w-2xl">
          <SplitText
            as="h1"
            delay={120}
            step={62}
            className="mt-6 font-display text-[2.6rem] font-medium leading-[1.05] sm:text-6xl lg:text-[4.6rem]"
            segments={[
              { text: 'Lo que el mar' },
              { br: true },
              { text: 'te dejó en' },
              { text: 'las manos', split: false, className: 'italic text-sea-bright' },
            ]}
          />

          <Reveal as="p" delay={560} className="mt-6 max-w-xl text-base text-cream/80 sm:text-lg">
            Collares, pulseras y charms tejidos a mano con piedras naturales, cuarzos tallados y
            perlas de río. Cada pieza se arma una por una, así que ninguna se repite —
            como las conchas que uno recoge en la orilla.
          </Reveal>

          <Reveal delay={640} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#tienda"
              className="group btn-sheen inline-flex min-h-13 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-cream px-8 text-xs font-semibold tracking-[0.14em] text-navy uppercase transition-[background-color,scale,box-shadow] duration-300 hover:scale-[1.03] hover:bg-sea-mist hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)] active:scale-[0.98]"
            >
              Ver la colección
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </a>
            <a
              href="#categorias"
              className="inline-flex min-h-13 cursor-pointer items-center justify-center rounded-full border border-cream/35 px-8 text-xs font-semibold tracking-[0.14em] text-cream uppercase transition-[border-color,background-color,scale] duration-300 hover:scale-[1.03] hover:border-cream hover:bg-cream/12"
            >
              Explorar por categoría
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={800}
          className="mt-14 hidden items-center gap-2 text-[0.62rem] font-light tracking-[0.28em] text-cream/55 uppercase lg:flex"
          aria-hidden="true"
        >
          Desliza
          <ChevronDown className="h-4 w-4 animate-cue" strokeWidth={1.5} />
        </Reveal>
      </div>
    </section>
  )
}
