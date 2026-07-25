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
  'Collar de cuentas turquesa con dije de cuarzo tallado en forma de palmera, sobre la cubierta de un barco',
  'Palma de Agua',
  'Cuarzo tallado y cuentas de vidrio marino',
)

export const collarManglar = photo(
  'collar-manglar',
  'Collar de cuentas oscuras con perla barroca y tres dijes verdes en forma de hoja',
  'Manglar',
  'Perla barroca y dijes de jade',
)

export const collarAmatista = photo(
  'collar-amatista',
  'Collares superpuestos con perlas de río y un dije de amatista tallado en forma de elefante',
  'Luna de Amatista',
  'Amatista tallada a mano',
)

export const collarCaribe = photo(
  'collar-caribe',
  'Collares superpuestos en tonos tierra con un dije de turquesa en forma de palmera',
  'Caribe',
  'Tres capas en tonos tierra',
)

export const collarFlor = photo(
  'collar-flor',
  'Collares superpuestos en rosa y turquesa con dije de cuarzo rosa',
  'Flor de Coral',
  'Cuarzo rosa y ágata',
)

export const collarManglarPlano = photo(
  'collar-manglar-plano',
  'Collar Manglar extendido sobre la cubierta de madera de un barco frente al mar',
  'Manglar · vista completa',
  'Largo ajustable de 42 a 55 cm',
)

export const pulserasArena = photo(
  'pulseras-arena',
  'Pulseras de piedras naturales sobre una mano abierta encima del agua turquesa',
  'Pulseras Arena',
  'Se llevan de a tres o de a una',
)

export const charmsMano = photo(
  'charms-mano',
  'Varios dijes de cuarzo y piedras de colores sobre la palma de una mano',
  'Charms sueltos',
  'Elige el tuyo y lo montamos',
)

/* Categorías */
export const catCollares = photo(
  'cat-collares',
  'Collar de cuentas naturales con dije de amatista sobre la piel',
  'Collares',
)
export const catCharms = photo(
  'cat-charms',
  'Colección de dijes de cuarzo y colores sobre una hoja de plátano',
  'Charms',
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
export const catVerano = photo(
  'cat-verano',
  'Sandalias, gafas de sol y collares sobre la cubierta de un barco',
  'Verano',
)

/* Editorial y ambiente */
export const heroModelo = photo(
  'hero-modelo',
  'Mujer en la playa con tres collares Maremía superpuestos y un dije de cuarzo rosa',
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
  'Collar de cuentas turquesa con dije de cuarzo colgando del pasamanos de un barco',
  'Cuarzo blanco sobre agua',
)

export const lookbook = [
  photo(
    'look-perfil',
    'Retrato de perfil en la playa con collares superpuestos en rosa y turquesa',
    'Tres capas',
    'Collares Flor de Coral y Palma',
  ),
  photo(
    'look-playa',
    'Mujer sonriendo en la playa con collares de cuentas y dije de cuarzo',
    'Sol de la tarde',
    'Collar Caribe con charm de palmera',
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
  photo(
    'collar-manglar-plano',
    'Collar Manglar extendido sobre la cubierta de madera de un barco frente al mar',
    'Sobre cubierta',
    'Collar Manglar',
  ),
]

export const charms = [
  photo(
    'charm-palma',
    'Dijes de cuarzo tallado sostenidos en una mano, entre ellos una palmera y un elefante',
    'Palmera y elefante',
    'Cuarzo rosa · amatista',
  ),
  photo(
    'charm-hoja',
    'Dijes de colores extendidos sobre una hoja de plátano en la playa',
    'Todos los charms',
    'Cuarzo · ágata · concha',
  ),
  photo(
    'charm-mesa',
    'Detalle de la colección de dijes sobre una hoja verde',
    'Cuarzo lechoso',
    'Tallado a mano',
  ),
  photo(
    'charms-mano',
    'Varios dijes de cuarzo y piedras de colores sobre la palma de una mano',
    'Elige el tuyo',
    'Se monta en el momento',
  ),
]
