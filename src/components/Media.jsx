import { useState } from 'react'

/**
 * Fotografía con carga progresiva: primero una miniatura difuminada incrustada
 * (`lqip`) que ocupa el espacio exacto, y encima la imagen real cuando termina
 * de descargar. Así nunca hay salto de layout ni un hueco en blanco.
 */
export default function Media({
  photo,
  priority = false,
  sizes,
  className = '',
  imgClassName = '',
  children,
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={photo.lqip}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full scale-110 object-cover blur-2xl transition-opacity duration-700 ${
          loaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`relative h-full w-full object-cover transition-[opacity,scale] duration-700 ease-out-soft ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />

      {children}
    </div>
  )
}
