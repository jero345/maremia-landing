import { useEffect, useRef, useState } from 'react'

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
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  /*
   * `onLoad` no basta. Si la foto ya está en la caché del navegador —una
   * segunda visita, o volver atrás— puede terminar de cargar ANTES de que
   * React enganche el manejador. Ese evento no se vuelve a disparar, así que
   * la imagen se quedaría en opacidad 0 para siempre y solo se vería el
   * difuminado. Al montar comprobamos si ya venía completa.
   */
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

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
        ref={imgRef}
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        /* Si la foto falla, mostramos igual el hueco con su texto alternativo:
           es mejor que dejar el difuminado puesto para siempre. */
        onError={() => setLoaded(true)}
        className={`relative h-full w-full object-cover transition-[opacity,scale] duration-700 ease-out-soft ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />

      {children}
    </div>
  )
}
