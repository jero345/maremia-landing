import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import InstagramIcon from './icons/InstagramIcon'
import Logo from './Logo'
import { useActiveSection } from '../hooks/useActiveSection'
import { onScrollFrame } from '../lib/scroll'
import { INSTAGRAM, WHATSAPP_URL } from '../data/contact'

const links = [
  { href: '#tienda', label: 'Tienda' },
  { href: '#categorias', label: 'Categorías' },
  { href: '#detalle', label: 'De cerca' },
  { href: '#lookbook', label: 'Lookbook' },
  { href: '#nosotras', label: 'Nosotras' },
  { href: '#contacto', label: 'Contacto' },
]

/* «inicio» entra en el rastreo para que ningún enlace quede marcado en el hero. */
const sectionIds = ['inicio', ...links.map((link) => link.href.slice(1))]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => onScrollFrame((y) => setScrolled(y > 40)), [])

  // Cierra el menú móvil con Escape (ruta de escape obligatoria).
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  /* Sobre el hero la barra va en crema sin fondo propio; al bajar se vuelve
     sólida y el texto pasa a azul noche.

     El estado transparente lleva SIEMPRE un velo oscuro degradado. No es
     decoración: sin él, si por lo que sea la barra se queda en modo claro
     sobre una sección clara, el menú entero desaparece. Con el velo, el
     texto crema se lee sobre cualquier fondo y ese fallo no puede ocurrir. */
  const solid = scrolled || open

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid
          ? 'bg-cream/92 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl'
          : 'bg-linear-to-b from-navy/70 via-navy/35 to-transparent'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-500 ease-out-soft sm:px-8 ${
          solid ? 'h-16' : 'h-20'
        }`}
      >
        <a
          href="#inicio"
          className="inline-flex min-h-11 items-center rounded-sm transition-[opacity,scale] duration-300 ease-out-soft hover:scale-[1.02] hover:opacity-85"
          aria-label="Maremía, ir al inicio"
        >
          <Logo tone={solid ? 'dark' : 'light'} />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => {
              const isActive = active === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative cursor-pointer py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:transition-transform after:duration-500 after:ease-out-soft hover:after:scale-x-100 ${
                      solid
                        ? 'text-navy-mist after:bg-sea hover:text-navy'
                        : 'text-cream/80 after:bg-cream hover:text-cream'
                    } ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'} ${
                      isActive && solid ? 'text-navy' : ''
                    } ${isActive && !solid ? 'text-cream' : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Maremía"
            className={`hidden h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-[background-color,border-color,scale,rotate] duration-400 ease-spring hover:-rotate-6 hover:scale-110 sm:inline-flex ${
              solid
                ? 'border-line text-navy hover:border-sea hover:bg-sea-mist/50'
                : 'border-cream/35 text-cream hover:border-cream hover:bg-cream/15'
            }`}
          >
            <InstagramIcon className="h-5 w-5" />
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={`btn-sheen hidden cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase transition-[background-color,color,scale] duration-300 hover:scale-105 active:scale-[0.98] sm:inline-flex ${
              solid
                ? 'bg-navy text-cream hover:bg-sea'
                : 'bg-cream text-navy hover:bg-sea-mist'
            }`}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Escríbenos
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
              solid
                ? 'border-line text-navy hover:bg-sand'
                : 'border-cream/35 text-cream hover:bg-cream/15'
            }`}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* El menú se despliega con grid-rows: anima la altura sin conocerla de antemano */}
      <div
        id="menu-movil"
        inert={!open}
        className={`grid overflow-hidden bg-cream transition-[grid-template-rows,opacity] duration-500 ease-out-soft lg:hidden ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <div className="border-t border-line px-5 pb-6 pt-2">
            <nav aria-label="Principal móvil">
              <ul className="flex flex-col">
                {links.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      style={{ transitionDelay: open ? `${120 + index * 45}ms` : '0ms' }}
                      className={`flex min-h-12 cursor-pointer items-center border-b border-line/70 text-sm font-medium tracking-[0.12em] text-navy uppercase transition-[color,opacity,translate] duration-500 ease-out-soft hover:text-sea ${
                        open ? 'translate-x-0 opacity-100' : '-translate-x-3 opacity-0'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-5 flex gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-sheen flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full bg-navy px-6 text-xs font-semibold tracking-[0.12em] text-cream uppercase transition-colors duration-300 hover:bg-sea"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                Escríbenos
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Maremía"
                className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line text-navy transition-colors duration-300 hover:border-sea hover:bg-sea-mist/50"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
