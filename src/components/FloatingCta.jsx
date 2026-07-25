import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { onScrollFrame } from '../lib/scroll'
import { WHATSAPP_URL } from '../data/contact'

/** Acceso a WhatsApp siempre a mano: aparece cuando el hero ya quedó atrás. */
export default function FloatingCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => onScrollFrame((y, viewport) => setVisible(y > viewport * 0.75)), [])

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-5 right-5 z-50 flex min-h-14 cursor-pointer items-center gap-0 overflow-hidden rounded-full bg-navy px-4 text-xs font-semibold tracking-[0.12em] text-cream uppercase shadow-[0_18px_40px_-16px_rgba(16,29,41,0.9)] transition-[opacity,translate,gap,padding-right,background-color] duration-500 ease-out-soft hover:gap-2.5 hover:bg-sea hover:pr-6 sm:bottom-8 sm:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
      }`}
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-sea-bright/45 animate-halo"
        />
        <MessageCircle className="relative h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap transition-[max-width] duration-500 ease-out-soft group-hover:max-w-52">
        Escríbenos
      </span>
      <span className="sr-only">Abrir conversación de WhatsApp con Maremía</span>
    </a>
  )
}
