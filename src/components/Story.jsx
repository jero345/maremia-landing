import Counter from './Counter'
import LogoMark from './LogoMark'
import Media from './Media'
import Reveal from './Reveal'
import SplitText from './SplitText'
import { useParallax } from '../hooks/useParallax'
import { historiaCuarzo, historiaManojo } from '../data/photos'
import { TAGLINE } from '../data/contact'

const figures = [
  { value: 6, suffix: '', label: 'años tejiendo' },
  { value: 30, suffix: '+', label: 'piedras distintas' },
  { value: 100, suffix: '%', label: 'hecho a mano' },
]

export default function Story() {
  const columnParallax = useParallax({ speed: 0.1, max: 50 })

  return (
    <section
      id="nosotras"
      className="relative grain scroll-mt-20 overflow-hidden bg-navy py-20 text-cream lg:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-104 w-104 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.16),transparent_70%)] animate-drift" />
        <div className="absolute -right-24 bottom-0 h-104 w-104 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.1),transparent_70%)] animate-drift [animation-delay:-8s]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 text-sea-bright" animated />
            <span className="text-[0.66rem] font-light tracking-[0.3em] text-sea-bright uppercase">
              Nosotras
            </span>
          </Reveal>

          <SplitText
            as="h2"
            delay={140}
            step={52}
            className="mt-6 font-display text-4xl font-medium sm:text-5xl"
            segments={[
              { text: 'Cada pieza lleva' },
              { br: true },
              { text: 'la huella de' },
              { text: 'quien la hizo', split: false, className: 'italic text-sea-bright' },
            ]}
          />

          <Reveal as="p" delay={420} className="mt-6 text-base leading-relaxed text-cream/80">
            Maremía nació entre el mar y la luna, en un taller de Cartagena donde todavía se teje
            nudo por nudo. No usamos moldes ni máquinas: escogemos la piedra, la enhebramos y la
            rematamos a mano. Por eso dos collares nunca salen iguales, y por eso el tuyo va a
            envejecer contigo.
          </Reveal>

          <Reveal as="p" delay={500} className="mt-4 text-base leading-relaxed text-cream/70">
            Trabajamos con cuarzos tallados, ágatas, perlas de río y vidrio marino. Si tienes una
            piedra con historia, la montamos en la pieza que quieras.
          </Reveal>

          <Reveal delay={580} className="mt-10 grid grid-cols-3 gap-4">
            {figures.map((figure) => (
              <div key={figure.label} className="border-l border-sea-bright/30 pl-4">
                <Counter
                  to={figure.value}
                  suffix={figure.suffix}
                  className="block font-display text-3xl font-medium text-sea-bright sm:text-4xl"
                />
                <p className="mt-1 text-[0.62rem] font-light tracking-[0.14em] text-cream/60 uppercase">
                  {figure.label}
                </p>
              </div>
            ))}
          </Reveal>

          <Reveal
            delay={660}
            className="mt-10 font-display text-xl italic text-cream/55 sm:text-2xl"
          >
            {TAGLINE}
          </Reveal>
        </div>

        <div ref={columnParallax} className="parallax grid grid-cols-2 gap-4">
          <Reveal variant="rise" className="img-sheen overflow-hidden rounded-2xl">
            <Media
              photo={historiaManojo}
              sizes="(min-width: 1024px) 300px, 45vw"
              className="aspect-3/4 w-full"
              imgClassName="duration-[900ms] hover:scale-105"
            />
          </Reveal>
          <Reveal
            variant="rise"
            delay={160}
            className="img-sheen mt-10 overflow-hidden rounded-2xl"
          >
            <Media
              photo={historiaCuarzo}
              sizes="(min-width: 1024px) 300px, 45vw"
              className="aspect-3/4 w-full"
              imgClassName="duration-[900ms] hover:scale-105"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
