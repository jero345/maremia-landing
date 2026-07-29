import {
  catCapas,
  catCollares,
  catPulseras,
  catTobilleras,
  collarAmatista,
  collarCaribe,
  collarFlor,
  collarManglar,
  collarManglarPlano,
  collarPalma,
  pulserasArena,
} from './photos'

/*
 * PRECIOS DE EJEMPLO. Reemplazar por los reales antes de publicar.
 * `stones` alimenta los puntitos de color de cada tarjeta.
 *
 * Los dijes van montados en los collares: no se venden sueltos, así que no
 * hay ni categoría ni producto de charms.
 */
export const products = [
  {
    id: 'collar-palma',
    photo: collarPalma,
    name: 'Palma de Agua',
    category: 'Collares',
    detail: 'Dije de palmera · piedra semipreciosa',
    stones: ['#4cc4c8', '#a8e6e2', '#e8e4d8'],
    price: 285000,
    tag: 'Más vendido',
  },
  {
    id: 'collar-manglar',
    photo: collarManglar,
    name: 'Manglar',
    category: 'Collares',
    detail: 'Perla barroca · dijes con baño de rodio',
    stones: ['#2f4a3c', '#7f9a72', '#efe7d2'],
    price: 320000,
  },
  {
    id: 'collar-amatista',
    photo: collarAmatista,
    name: 'Luna de Río',
    category: 'Collares',
    detail: 'Dijes de palmera y pez · perlas de río',
    stones: ['#6b4f8a', '#d9c7a8', '#f3e9d8'],
    price: 265000,
    tag: 'Nuevo',
  },
  {
    id: 'collar-caribe',
    photo: collarCaribe,
    name: 'Caribe',
    category: 'Collares',
    detail: 'Tres capas · dije de turquesa',
    stones: ['#3e2f22', '#0e7c86', '#c9a06a'],
    price: 340000,
  },
  {
    id: 'collar-flor',
    photo: collarFlor,
    name: 'Flor de Coral',
    category: 'Collares',
    detail: 'Piedras semipreciosas en rosa',
    stones: ['#d98ba0', '#4cc4c8', '#f6e3e6'],
    price: 298000,
    tag: 'Favorito',
  },
  {
    id: 'collar-manglar-largo',
    photo: collarManglarPlano,
    name: 'Manglar Largo',
    category: 'Collares',
    detail: 'Largo ajustable de 42 a 55 cm',
    stones: ['#22333f', '#7f9a72', '#efe7d2'],
    price: 355000,
  },
  {
    id: 'pulseras-arena',
    photo: pulserasArena,
    name: 'Pulseras Arena',
    category: 'Pulseras',
    detail: 'Trío de piedras semipreciosas · elástico',
    stones: ['#c9a06a', '#8a9a7b', '#e2dbc9'],
    price: 145000,
    tag: 'Set de 3',
  },
  {
    id: 'tobillera-orilla',
    photo: catTobilleras,
    name: 'Tobillera Orilla',
    category: 'Tobilleras',
    detail: 'Cuentas de piedra · cierre ajustable',
    stones: ['#8a9a7b', '#c9a06a', '#4cc4c8'],
    price: 118000,
  },
]

export const categories = ['Todo', 'Collares', 'Pulseras', 'Tobilleras']

/* Los cuatro bloques de categoría, al estilo de una tienda */
export const shopCategories = [
  { id: 'collares', label: 'Collares', photo: catCollares },
  { id: 'pulseras', label: 'Pulseras', photo: catPulseras },
  { id: 'tobilleras', label: 'Tobilleras', photo: catTobilleras },
  { id: 'capas', label: 'Capas y sets', photo: catCapas },
]

export const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
