import { lqip, size } from '../assets/media'

/*
 * Fichas de las fotografías reales de la marca.
 *
 * Los archivos se recogen solos de src/assets: para añadir una foto basta
 * guardarla ahí, regenerar media.js (ver README) y describirla aquí abajo.
 */
const urls = import.meta.glob('../assets/*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
})

function photo(key, alt, caption, note) {
  const src = urls[`../assets/${key}.jpg`]
  const [width, height] = size[key] ?? [1000, 1400]
  return { key, src, lqip: lqip[key], width, height, alt, caption, note }
}

/* Producto */
export const collarPalma = photo(
  'collar-palma',
  'Collar de cuentas turquesa con dije de piedra semipreciosa tallado en forma de palmera, sobre la cubierta de un barco',
  'Palma de Agua',
  'Dije de palmera tallado a mano',
)

export const collarManglar = photo(
  'collar-manglar',
  'Collar de cuentas oscuras con perla barroca y tres dijes verdes',
  'Manglar',
  'Perla barroca y dijes con baño de rodio',
)

export const collarAmatista = photo(
  'collar-amatista',
  'Dos collares superpuestos: uno con dije de pez y otro con dije de palmera en piedra semipreciosa',
  'Luna de Río',
  'Dijes de palmera y de pez',
)

export const collarCaribe = photo(
  'collar-caribe',
  'Collares superpuestos en tonos tierra con un dije de turquesa en forma de palmera',
  'Caribe',
  'Tres capas en tonos tierra',
)

export const collarFlor = photo(
  'collar-flor',
  'Collares superpuestos en rosa y turquesa con dije de palmera en piedra semipreciosa',
  'Flor de Coral',
  'Piedras semipreciosas en rosa',
)

export const collarManglarPlano = photo(
  'collar-manglar-plano',
  'Collar Manglar extendido sobre la cubierta de madera de un barco frente al mar',
  'Manglar · vista completa',
  'Largo ajustable de 42 a 55 cm',
)

export const pulserasArena = photo(
  'pulseras-arena',
  'Pulseras de piedras semipreciosas sobre una mano abierta encima del agua turquesa',
  'Pulseras Arena',
  'Se llevan de a tres o de a una',
)

/* Categorías */
export const catCollares = photo(
  'cat-collares',
  'Collar de cuentas de piedra semipreciosa con dije de palmera sobre la piel',
  'Collares',
)
export const catPulseras = photo(
  'cat-pulseras',
  'Pulseras de piedras sostenidas sobre agua turquesa transparente',
  'Pulseras',
)
export const catTobilleras = photo(
  'cat-tobilleras',
  'Tobillera de cuentas sostenida sobre el mar turquesa',
  'Tobilleras',
)
export const catCapas = photo(
  'cat-capas',
  'Manojo de collares colgando frente al mar al atardecer',
  'Capas',
)
/* Editorial y ambiente */
export const heroModelo = photo(
  'hero-modelo',
  'Mujer en la playa con tres collares Maremía superpuestos y un dije de palmera',
  'Colección Mi Mar',
  'Tres capas, una sola historia',
)

export const historiaManojo = photo(
  'historia-manojo',
  'Un manojo de collares Maremía colgando a contraluz frente al mar',
  'Hechos a mano, uno por uno',
)

export const historiaCuarzo = photo(
  'historia-cuarzo',
  'Collar de cuentas turquesa con dije de palmera colgando del pasamanos de un barco',
  'Piedra clara sobre agua',
)

export const lookbook = [
  photo(
    'look-piscina',
    'Retrato de mujer con un collar de cuentas turquesa y una perla al centro, junto al agua',
    'Turquesa y perla',
    'Collar corto, para llevar a diario',
  ),
  photo(
    'look-perfil',
    'Retrato de perfil en la playa con collares superpuestos en rosa y turquesa',
    'Tres capas',
    'Collares Flor de Coral y Palma',
  ),
  photo(
    'look-playa',
    'Mujer sonriendo en la playa con collares de cuentas y dije de palmera',
    'Sol de la tarde',
    'Collar Caribe con dije de palmera',
  ),
  photo(
    'look-mar',
    'Detalle de collares en tonos tierra con dije de turquesa frente al mar',
    'Tonos de arena',
    'Collar Caribe',
  ),
  photo(
    'look-sol',
    'Retrato a contraluz en la orilla con collares Maremía',
    'A contraluz',
    'Colección Mi Luna',
  ),
  photo(
    'look-cubierta',
    'Collares y sandalias sobre la cubierta de madera de un barco',
    'Día de barco',
    'Todo lo que cabe en un bolso',
  ),
]

/*
 * Los dijes, de cerca. Van montados en los collares: no se venden sueltos.
 * Solo hay dos formas: palmera y pez. No inventar otras.
 */
export const detalle = [
  photo(
    'charm-palma',
    'Detalle de los dijes de un collar: dos palmeras talladas en piedra semipreciosa y un pez',
    'Palmeras y pez',
    'Talladas a mano, una por una',
  ),
  photo(
    'charm-hoja',
    'Varios collares extendidos sobre una hoja de plátano, con sus dijes de colores',
    'Colores de la colección',
    'Piedras semipreciosas',
  ),
  photo(
    'cat-charms',
    'Collares con dijes de palmera y piedras de colores sobre una hoja verde',
    'Palmeras en rosa',
    'Tallado uno por uno',
  ),
  photo(
    'charm-mesa',
    'Detalle de los dijes de un collar sobre una hoja verde',
    'Piedra clara',
    'Cada collar lleva el suyo',
  ),
  photo(
    'charms-mano',
    'Collares recogidos en la palma de una mano, con sus dijes de piedra a la vista',
    'En la mano',
    'Piedra semipreciosa, nunca dos iguales',
  ),
]
