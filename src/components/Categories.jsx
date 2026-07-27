import { ArrowRight } from 'lucide-react'
import Media from './Media'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { shopCategories } from '../data/products'
import { WHATSAPP_NUMBER } from '../data/contact'

function categoryLink(category) {
  const text = `Hola Maremía, quiero ver lo que tienen en ${category.label.toLowerCase()}.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function Categories() {
  return (
    <section id="categorias" className="scroll-mt-20 bg-shell py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Explora"
          title="Empieza por lo que buscas"
          description="Piedra natural, armado a mano y el color del Caribe. Piezas que aguantan un día de playa y un lunes de oficina."
          align="center"
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shopCategories.map((category, index) => (
            <Reveal
              as="li"
              key={category.id}
              variant="scale"
              delay={index * 70}
              className="group"
            >
              <a
                href={categoryLink(category)}
                target="_blank"
                rel="noreferrer"
                className="img-sheen relative block overflow-hidden rounded-2xl bg-navy"
              >
                <Media
                  photo={category.photo}
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
                  className="aspect-5/6 w-full"
                  imgClassName="duration-[900ms] group-hover:scale-[1.08]"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/85 via-navy/20 to-transparent transition-opacity duration-500 group-hover:from-navy/92"
                />

                <span className="absolute inset-x-5 bottom-5 z-3 flex items-end justify-between gap-3">
                  <span className="block font-display text-2xl font-medium text-cream">
                    {category.label}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/40 text-cream transition-[background-color,scale,translate] duration-500 ease-spring group-hover:translate-x-0.5 group-hover:scale-110 group-hover:bg-cream group-hover:text-navy">
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
