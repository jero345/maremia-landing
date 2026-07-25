const claims = [
  'Hecho a mano en Cartagena',
  'Piedras naturales y cuarzos tallados',
  'Ninguna pieza se repite',
  'Envío gratis desde $ 250.000',
  'Cambios dentro de los 8 días',
  'Empaque de regalo incluido',
]

/**
 * Banda de confianza en movimiento continuo.
 * Decorativa: se detiene al pasar el cursor y con reduced-motion.
 */
export default function Marquee() {
  return (
    <div className="group border-y border-navy/12 bg-shell py-3.5">
      <div className="relative overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {[...claims, ...claims].map((claim, i) => (
            <li
              key={i}
              aria-hidden={i >= claims.length}
              className="flex shrink-0 items-center gap-3.5 text-[0.68rem] font-medium tracking-[0.18em] text-navy-mist uppercase"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-sea animate-wave"
                style={{ animationDelay: `${(i % claims.length) * 0.2}s` }}
                aria-hidden="true"
              />
              {claim}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
