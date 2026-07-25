import {
  catCapas,
  catCharms,
  catCollares,
  catPulseras,
  catTobilleras,
  catVerano,
  charmsMano,
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
 */
export const products = [
  {
    id: 'collar-palma',
    photo: collarPalma,
    name: 'Palma de Agua',
    category: 'Collares',
    detail: 'Cuarzo tallado · cuentas de vidrio marino',
    stones: ['#4cc4c8', '#a8e6e2', '#e8e4d8'],
    price: 285000,
    tag: 'Más vendido',
  },
  {
    id: 'collar-manglar',
    photo: collarManglar,
    name: 'Manglar',
    category: 'Collares',
    detail: 'Perla barroca · dijes de jade',
    stones: ['#2f4a3c', '#7f9a72', '#efe7d2'],
    price: 320000,
  },
  {
    id: 'collar-amatista',
    photo: collarAmatista,
    name: 'Luna de Amatista',
    category: 'Collares',
    detail: 'Amatista tallada a mano · perlas de río',
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
    detail: 'Cuarzo rosa · ágata rosada',
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
    detail: 'Trío de piedras naturales · elástico',
    stones: ['#c9a06a', '#8a9a7b', '#e2dbc9'],
    price: 145000,
    tag: 'Set de 3',
  },
  {
    id: 'charms-sueltos',
    photo: charmsMano,
    name: 'Charms sueltos',
    category: 'Charms',
    detail: 'Cuarzo, ágata o concha · se monta al momento',
    stones: ['#f6e3e6', '#6b4f8a', '#4cc4c8'],
    price: 68000,
  },
]

export const categories = ['Todo', 'Collares', 'Pulseras', 'Charms']

/* Los seis bloques de categoría, al estilo de una tienda */
export const shopCategories = [
  { id: 'collares', label: 'Collares', photo: catCollares, count: 24 },
  { id: 'charms', label: 'Charms', photo: catCharms, count: 31 },
  { id: 'pulseras', label: 'Pulseras', photo: catPulseras, count: 18 },
  { id: 'tobilleras', label: 'Tobilleras', photo: catTobilleras, count: 12 },
  { id: 'capas', label: 'Capas y sets', photo: catCapas, count: 9 },
  { id: 'verano', label: 'Verano', photo: catVerano, count: 15 },
]

export const formatCOP = (value) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
