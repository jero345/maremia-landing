import { Quote, Star } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const reviews = [
  {
    quote:
      'Me llevé el Palma de Agua a San Andrés y no me lo quité en diez días, ni para meterme al mar. Salió intacto.',
    name: 'Valentina O.',
    role: 'Palma de Agua · Bogotá',
    initials: 'VO',
  },
  {
    quote:
      'Lo compré pensando en las vacaciones y termino usándolo para ir a la oficina. Combina con todo y nadie tiene uno igual.',
    name: 'Daniela Restrepo',
    role: 'Luna de Amatista · Medellín',
    initials: 'DR',
  },
  {
    quote:
      'Uno escribe por WhatsApp y le responden en el día, con fotos de lo que hay. Llegó en tres días y en una bolsita preciosa.',
    name: 'Marcela Pineda',
    role: 'Manglar · Cali',
    initials: 'MP',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-sand py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Clientas"
          title="Lo que dicen las que ya la tienen"
          description="Reseñas reales de Instagram y WhatsApp."
          align="center"
        />

        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal
              as="li"
              key={review.name}
              variant="scale"
              delay={index * 90}
              className="group relative flex flex-col rounded-2xl border border-line bg-cream p-8 transition-[border-color,box-shadow,translate] duration-500 ease-out-soft hover:-translate-y-1.5 hover:border-sea/45 hover:shadow-[0_28px_65px_-38px_rgba(26,45,62,0.5)]"
            >
              <Quote
                className="h-8 w-8 text-sea/40 transition-[scale,rotate,color] duration-500 ease-spring group-hover:-rotate-6 group-hover:scale-110 group-hover:text-sea/70"
                strokeWidth={1.4}
                aria-hidden="true"
              />

              <div className="mt-4 flex" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-sea text-sea transition-[scale] duration-500 ease-spring group-hover:scale-115"
                    strokeWidth={1.5}
                    style={{ transitionDelay: `${i * 45}ms` }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1">
                <p className="font-display text-xl leading-snug text-navy">“{review.quote}”</p>
              </blockquote>

              <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full surface-sea text-sm font-semibold text-navy transition-[scale,box-shadow] duration-500 ease-spring group-hover:scale-110 group-hover:shadow-[0_0_0_4px_rgba(76,196,200,0.2)]"
                  aria-hidden="true"
                >
                  {review.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy">{review.name}</p>
                  <p className="text-xs text-navy-mist">{review.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
