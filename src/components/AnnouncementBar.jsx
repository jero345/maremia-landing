import { useEffect, useState } from 'react'
import { motionOk } from '../lib/motion'

const messages = [
  'Envío gratis en Colombia desde $ 250.000',
  'Piezas hechas a mano, una por una',
  'Despachamos desde Cartagena en 24 h',
]

/* El aviso más largo fija el ancho, así la franja no salta al rotar. */
const longest = messages.reduce((a, b) => (b.length > a.length ? b : a))

/** Franja superior con los avisos de la tienda, rotando uno a uno. */
export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!motionOk()) return
    const id = window.setInterval(() => setIndex((i) => (i + 1) % messages.length), 4200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative z-60 bg-navy-deep text-cream">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-center overflow-hidden px-5">
        {/* Sin movimiento, la lista se lee entera y separada por puntos. */}
        <p className="hidden text-center text-[0.7rem] font-light tracking-[0.18em] uppercase motion-reduce:block">
          {messages.join(' · ')}
        </p>

        <p
          aria-live="off"
          className="relative flex h-9 items-center text-center text-[0.7rem] font-light tracking-[0.18em] uppercase motion-reduce:hidden"
        >
          {messages.map((message, i) => (
            <span
              key={message}
              aria-hidden={i !== index}
              className={`absolute inset-x-0 whitespace-nowrap transition-[opacity,translate] duration-600 ease-out-soft ${
                i === index
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-3 opacity-0'
              }`}
            >
              {message}
            </span>
          ))}
          <span className="invisible whitespace-nowrap">{longest}</span>
        </p>
      </div>
    </div>
  )
}
