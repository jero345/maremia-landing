import { useState } from 'react'
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from 'lucide-react'
import InstagramIcon from './icons/InstagramIcon'
import { EMAIL, INSTAGRAM, INSTAGRAM_HANDLE, WHATSAPP_URL } from '../data/contact'

const columns = [
  {
    title: 'Tienda',
    links: [
      { label: 'Lo más pedido', href: '#tienda' },
      { label: 'Categorías', href: '#categorias' },
      { label: 'Charms', href: '#charms' },
      { label: 'Lookbook', href: '#lookbook' },
    ],
  },
  {
    title: 'Maremía',
    links: [
      { label: 'Nosotras', href: '#nosotras' },
      { label: 'Arma tu set', href: '#tienda' },
      { label: 'Clientas', href: '#lookbook' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
]

const conditions = [
  'Envío gratis en Colombia desde $ 250.000',
  'Cambios dentro de los primeros 8 días',
  'Piezas hechas por encargo en 5 días',
  'Empaque de regalo incluido',
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Sin backend: dejamos constancia visual y guiamos la conversación a WhatsApp.
  const handleSubscribe = (event) => {
    event.preventDefault()
    if (!email.includes('@')) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="grain relative overflow-hidden bg-navy pt-20 pb-10 text-cream/75">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-104 w-104 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.14),transparent_70%)] animate-drift"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-cream/15 pb-12 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <img
              src="/logo_nav1.png"
              alt="Maremía"
              className="h-24 w-auto object-contain sm:h-32"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Joyería tejida a mano con piedras naturales, cuarzos tallados y perlas de río.
              Hecha en Cartagena, pensada para el agua salada.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: WHATSAPP_URL, label: 'Escribir a Maremía por WhatsApp', Icon: MessageCircle },
                { href: INSTAGRAM, label: `Instagram de Maremía, ${INSTAGRAM_HANDLE}`, Icon: InstagramIcon },
                { href: `mailto:${EMAIL}`, label: `Escribir a ${EMAIL}`, Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-cream/25 text-cream transition-[background-color,border-color,scale,rotate] duration-400 ease-spring hover:-rotate-6 hover:scale-110 hover:border-sea-bright hover:bg-sea-bright/15"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="font-display text-lg font-medium text-cream">{column.title}</h2>
              <ul className="mt-2 space-y-0.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-sm transition-colors duration-300 hover:text-sea-bright"
                    >
                      {link.label}
                      <ArrowRight
                        className="h-3 w-3 -translate-x-1 opacity-0 transition-[opacity,translate] duration-300 ease-out-soft group-hover:translate-x-0 group-hover:opacity-100"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-display text-lg font-medium text-cream">
              Enterate de lo nuevo
            </h2>
            <p className="mt-2 text-sm">
              Te avisamos cuando sale una colección o quedan pocas de una pieza. Sin spam.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4">
              <label htmlFor="newsletter" className="sr-only">
                Tu correo electrónico
              </label>
              <div className="flex gap-2">
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="min-h-12 w-full rounded-full border border-cream/25 bg-cream/8 px-5 text-sm text-cream transition-[border-color,background-color] duration-300 placeholder:text-cream/45 focus:border-sea-bright focus:bg-cream/12"
                />
                <button
                  type="submit"
                  aria-label="Suscribirme al boletín"
                  className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-cream text-navy transition-[background-color,scale] duration-300 hover:scale-105 hover:bg-sea-bright active:scale-95"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
              <p aria-live="polite" className="mt-2 min-h-5 text-xs">
                {subscribed && (
                  <span className="inline-flex items-center gap-1.5 text-sea-bright">
                    <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                    Listo, te escribimos pronto.
                  </span>
                )}
              </p>
            </form>

            <ul className="mt-5 space-y-2 text-sm">
              {conditions.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sea-bright"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Maremía. Todos los derechos reservados.</p>
          <p className="text-cream/55">
            Precios en pesos colombianos. Piezas hechas a mano: pueden variar levemente de la foto.
          </p>
        </div>
      </div>
    </footer>
  )
}
