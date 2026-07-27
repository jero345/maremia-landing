import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Media from './Media'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { categories, formatCOP, products } from '../data/products'
import { WHATSAPP_NUMBER } from '../data/contact'

function productLink(product) {
  const text = `Hola Maremía, me interesa ${product.name} (${product.detail}).`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function Shop() {
  const [active, setActive] = useState('Todo')

  const visible = useMemo(
    () => (active === 'Todo' ? products : products.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section id="tienda" className="scroll-mt-20 bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Lo más pedido"
            title="Las que nunca alcanzan"
            description="Las piezas que más nos piden por Instagram. Si ves una que te gusta, escríbenos y te decimos qué hay disponible y en qué largos."
          />

          <Reveal
            delay={200}
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filtrar por categoría"
          >
            {categories.map((cat) => {
              const isActive = cat === active
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(cat)}
                  className={`min-h-11 cursor-pointer rounded-full border px-5 text-[0.68rem] font-semibold tracking-[0.12em] uppercase transition-[background-color,color,border-color,scale] duration-300 ease-out-soft hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'border-navy bg-navy text-cream shadow-[0_12px_28px_-16px_var(--color-navy)]'
                      : 'border-line bg-transparent text-navy-mist hover:border-sea hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product, index) => (
            <Reveal
              as="li"
              key={product.id}
              variant="scale"
              delay={index * 60}
              className="group flex flex-col"
            >
              <a
                href={productLink(product)}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 flex-col"
              >
                <div className="img-sheen relative overflow-hidden rounded-2xl bg-sand">
                  <Media
                    photo={product.photo}
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 90vw"
                    className="aspect-4/5 w-full"
                    imgClassName="duration-[850ms] group-hover:scale-[1.06]"
                  />

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  {product.tag && (
                    <span className="absolute left-3 top-3 z-3 rounded-full bg-cream/95 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.12em] text-navy uppercase">
                      {product.tag}
                    </span>
                  )}

                  {/* Aparece al pasar el cursor, como el «select options» de una tienda */}
                  <span className="absolute inset-x-3 bottom-3 z-3 flex min-h-11 translate-y-4 items-center justify-center gap-2 rounded-full bg-navy px-4 text-[0.68rem] font-semibold tracking-[0.12em] text-cream uppercase opacity-0 transition-[opacity,translate] duration-500 ease-out-soft group-hover:translate-y-0 group-hover:opacity-100">
                    Consultar por WhatsApp
                    <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col pt-4">
                  <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-sea uppercase">
                    {product.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-medium text-navy">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-navy-mist">{product.detail}</p>

                  <div className="mt-3 flex items-center gap-1.5" aria-hidden="true">
                    {product.stones.map((stone) => (
                      <span
                        key={stone}
                        className="h-3 w-3 rounded-full border border-navy/15 transition-[scale] duration-400 ease-spring group-hover:scale-125"
                        style={{ backgroundColor: stone }}
                      />
                    ))}
                  </div>

                  <p className="mt-auto pt-4 font-display text-xl font-medium text-navy tabular">
                    {formatCOP(product.price)}
                  </p>
                </div>
                <span className="sr-only">Consultar {product.name} por WhatsApp</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
