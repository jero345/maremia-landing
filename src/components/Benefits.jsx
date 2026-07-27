import { Gem, Hand, Package, RefreshCcw, Sun, Truck } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const benefits = [
  {
    icon: Hand,
    title: 'Armado pieza por pieza',
    text: 'Sin moldes ni producción en serie. Cada collar lo desarrollamos y lo armamos a mano en el taller.',
  },
  {
    icon: Gem,
    title: 'Piedra natural, nunca dos iguales',
    text: 'Cuarzos tallados, ágatas, perlas de río y dijes en rodio. Elegimos las piedras de a una: tu pieza no va a ser igual a la de la foto ni a la de nadie.',
  },
  {
    icon: Sun,
    title: 'No solo para la playa',
    text: 'Aguantan el agua salada, pero están pensadas para el resto del año: van igual de bien con jean que con vestido de baño.',
  },
  {
    icon: Truck,
    title: 'Envío gratis desde $ 250.000',
    text: 'Despachamos desde Medellín a toda Colombia en 24 a 72 horas, con guía para que la sigas.',
  },
  {
    icon: RefreshCcw,
    title: 'Cambios sin pelea',
    text: 'Tienes 8 días para cambiar la pieza o el largo. Nosotras asumimos el envío de vuelta.',
  },
  {
    icon: Package,
    title: 'Llega lista para regalar',
    text: 'Bolsa de tela, tarjeta escrita a mano y la nota que quieras que lea quien la abra.',
  },
]

export default function Benefits() {
  return (
    <section className="relative grain overflow-hidden bg-cream py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-104 w-104 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.14),transparent_70%)] animate-drift"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Comprar tranquila"
          title="Lo que va incluido siempre"
          description="Seis cosas que no cambian, compres lo que compres."
          align="center"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal
              as="li"
              key={benefit.title}
              variant="scale"
              delay={index * 70}
              className="group relative overflow-hidden rounded-2xl border border-line bg-shell p-7 transition-[border-color,translate,box-shadow] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-sea/45 hover:shadow-[0_26px_60px_-34px_rgba(26,45,62,0.45)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.3),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-sea/25 bg-sea-mist/45 text-sea transition-[background-color,rotate,scale] duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-sea-mist">
                <benefit.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <h3 className="relative mt-5 font-display text-2xl font-medium text-navy">
                {benefit.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-navy-mist">
                {benefit.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
