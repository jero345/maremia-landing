# Maremía — Landing page

Landing page para **Maremía**, joyería tejida a mano con piedras naturales, cuarzos tallados y
perlas de río. Hecha en Cartagena. *Mi mar · Mi luna · Mi alma.*

Construida con **React 19 + Vite + Tailwind CSS v4**. La estructura sigue el esquema de una
tienda tipo [bamboleira.com](https://www.bamboleira.com/es): franja de avisos, hero de colección,
parrilla de producto, historia de marca, bloques de categoría, carrusel de charms, promoción de
set, lookbook y pie con boletín.

---

## Arrancar el proyecto

```bash
npm install     # solo la primera vez
npm run dev     # servidor de desarrollo → http://localhost:5173
npm run build   # build de producción en dist/
npm run preview # revisar el build antes de publicar
```

---

## Identidad

Los dos colores salen **del logo**, muestreados píxel a píxel del archivo original:

| Token | Valor | Uso |
|---|---|---|
| `--color-navy` | `#1A2D3E` | Fondo del logo. Secciones oscuras, botones, texto |
| `--color-cream` | `#EEEADE` | Luna y letras del logo. Texto sobre azul, fondo general |
| `--color-navy-deep` | `#101D29` | Franja de avisos, sombras profundas |
| `--color-navy-mist` | `#46647D` | Texto secundario sobre claro (contraste AA) |
| `--color-sea` | `#0E7C86` | Acento sobre fondo claro — el turquesa de las fotos |
| `--color-sea-bright` | `#4CC4C8` | Acento sobre azul noche |
| `--color-sea-mist` | `#CBE8E6` | Superficies suaves, estados hover |
| `--color-shell` / `--color-sand` | `#F7F5EF` / `#E2DBC9` | Fondos alternos entre secciones |
| `--font-display` | Cormorant | Titulares, nombre de marca y cifras |
| `--font-sans` | Montserrat | Cuerpo de texto e interfaz |

### El logo

La luna y las olas son **el artwork original**, recortado del archivo del cliente a
[src/assets/logo-mark.png](src/assets/logo-mark.png). No se usa como `img` sino como **máscara
CSS**: el PNG solo aporta la silueta (su canal alfa) y el color lo pone `currentColor`. Por eso
el mismo archivo sirve en crema sobre azul noche y en azul noche sobre crema, sin duplicar
assets ni recolorear nada a mano.

Lo monta [src/components/LogoMark.jsx](src/components/LogoMark.jsx); basta darle altura, el ancho
sale solo de la proporción. [src/components/Logo.jsx](src/components/Logo.jsx) le añade el nombre
y, con `tagline`, el lema.

**El nombre y el lema van en texto, no en imagen.** En el logo original el lema mide 20 px sobre
1080, así que a tamaño de barra o de pie quedaría en dos o tres píxeles, ilegible. En texto se
lee siempre y lo anuncia un lector de pantalla.

Los trazos de las olas se **engrosan ligeramente** en la marca pequeña: en el original miden 4 px
sobre 640 y a 40 px de alto desaparecerían. El script que la genera está en la sección de abajo.

Los iconos de la app ([public/icon-192.png](public/), 512 y 180) salen del logo real sobre el azul
de la marca. [public/maremia.svg](public/maremia.svg) es la versión vectorial simplificada que usan
las pestañas del navegador.

### Regenerar la marca del logo

El logo original del cliente está en [tools/logo-original.jpg](tools/logo-original.jpg). Si cambia,
se regenera la máscara con:

```powershell
powershell -File tools\logo-mark.ps1
```

El script está comentado por dentro: recorta la zona de la luna y las olas, calcula el alfa como
`(luminancia − azul) / (crema − azul)` y dilata los trazos de la banda de las olas. Si el logo
nuevo tiene otro encuadre, hay que ajustar el recorte y la fila donde empiezan las olas.

---

## Fotografías

Las 25 fotos publicadas están en [src/assets/](src/assets/), recomprimidas (calidad 82, lado
máximo 1400 px). Las 76 originales sin usar quedaron guardadas en
[src/assets/originales/](src/assets/originales/) — no entran en el build, pero están ahí para
cambiar la selección cuando quieras.

Cada foto se describe en [src/data/photos.js](src/data/photos.js): texto alternativo, pie y nota.
Los archivos se recogen solos con `import.meta.glob`, así que **no hay que importarlos uno a uno**.

[src/assets/media.js](src/assets/media.js) está **generado**: guarda las dimensiones reales y la
miniatura de 20 px de cada foto en base64, que pinta al instante mientras baja el JPEG.

### Añadir o cambiar una foto

1. Guarda el JPEG en `src/assets/` con un nombre en minúsculas y guiones.
2. Regenera `media.js` (PowerShell, desde la raíz del proyecto):

   ```powershell
   Add-Type -AssemblyName System.Drawing
   $assets = "src\assets"
   $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
   $lqip = "export const lqip = {`n"; $size = "export const size = {`n"
   foreach ($f in (Get-ChildItem $assets -Filter *.jpg | Sort-Object Name)) {
     $img = [System.Drawing.Image]::FromFile($f.FullName)
     $size += "  '$($f.BaseName)': [$($img.Width), $($img.Height)],`n"
     $h = [int][Math]::Round($img.Height * (20 / $img.Width))
     $bmp = New-Object System.Drawing.Bitmap 20, $h
     $g = [System.Drawing.Graphics]::FromImage($bmp)
     $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
     $g.DrawImage($img, 0, 0, 20, $h); $g.Dispose()
     $ms = New-Object System.IO.MemoryStream
     $p = New-Object System.Drawing.Imaging.EncoderParameters 1
     $p.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([int]38)
     $bmp.Save($ms, $codec, $p)
     $lqip += "  '$($f.BaseName)':`n    'data:image/jpeg;base64,$([Convert]::ToBase64String($ms.ToArray()))',`n"
     $ms.Dispose(); $bmp.Dispose(); $img.Dispose()
   }
   [System.IO.File]::WriteAllText("$assets\media.js", "$lqip}`n`n$size}`n", (New-Object System.Text.UTF8Encoding($false)))
   ```

3. Describe la foto en `src/data/photos.js` y asígnala donde corresponda
   (`products`, `shopCategories`, `lookbook`, `charms`…).

[src/components/Media.jsx](src/components/Media.jsx) se encarga del resto: carga en diferido,
difuminado inicial y espacio reservado para que no haya saltos de layout.

---

## Qué tocar para personalizar

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, correo, Instagram, ciudad, lema | [src/data/contact.js](src/data/contact.js) |
| Productos, precios, categorías de la tienda | [src/data/products.js](src/data/products.js) |
| Fotografías y sus textos alternativos | [src/data/photos.js](src/data/photos.js) |
| Colores, tipografías, animaciones | [src/index.css](src/index.css) (bloque `@theme`) |
| Avisos de la franja superior | [src/components/AnnouncementBar.jsx](src/components/AnnouncementBar.jsx) |
| Enlaces del menú | [src/components/Navbar.jsx](src/components/Navbar.jsx) |
| Historia de la marca | [src/components/Story.jsx](src/components/Story.jsx) |
| Garantías de compra | [src/components/Benefits.jsx](src/components/Benefits.jsx) |
| Testimonios | [src/components/Testimonials.jsx](src/components/Testimonials.jsx) |

### Antes de publicar — datos de ejemplo por reemplazar

1. **Correo y ciudad del taller**: `src/data/contact.js`. El WhatsApp (`+57 310 462 6207`) y el
   Instagram (`@maremia_3`) ya son los reales.
2. **Precios**: todos los de `src/data/products.js` son inventados.
3. **Nombres de las piezas**: «Palma de Agua», «Manglar», «Luna de Amatista»… son propuestas.
4. **Conteo de piezas por categoría** (`count` en `shopCategories`).
5. **Reseñas**: los nombres y textos de `Testimonials.jsx` son ficticios.
6. **Cifras de la historia**: «6 años», «30+ piedras» en `Story.jsx`.
7. **Boletín del pie**: hoy solo muestra un mensaje de confirmación; hay que conectarlo a un
   servicio real (Mailchimp, Brevo…) para que guarde los correos.

---

## Estructura de la página

1. **Franja de avisos** — envíos y garantías, rotando uno a uno.
2. **Barra superior** — transparente sobre el hero, sólida al bajar; marca la sección activa.
   Encima, un hilo turquesa indica el progreso de lectura.
3. **Hero** — foto de portada a sangre con el nombre de la colección y doble CTA.
4. **Banda de confianza** — marquesina con las garantías clave.
5. **Tienda** — las 8 piezas más pedidas, con filtro por categoría y muestras de color.
6. **Nosotras** — la historia de la marca sobre azul noche, con cifras que cuentan solas.
7. **Categorías** — seis bloques con fotografía.
8. **Charms** — carrusel horizontal.
9. **Arma tu set** — promoción de 3 piezas con 15 % de descuento.
10. **Lookbook** — fotografía editorial con visor ampliado.
11. **Comprar tranquila** — las seis garantías.
12. **Clientas** — tres testimonios.
13. **Contacto** — formulario validado + datos directos.
14. **Pie** — navegación, boletín, redes y condiciones.

Fija en pantalla, una burbuja de WhatsApp aparece al dejar atrás el hero. Como no hay carrito,
**todos los botones de compra abren WhatsApp con el mensaje ya redactado** según la pieza.

---

## Movimiento

Las animaciones están centralizadas para poder ajustarlas en un solo sitio:

| Pieza | Dónde |
|---|---|
| Aparición al hacer scroll (`up`, `left`, `scale`, `blur`, `clip`) | [src/components/Reveal.jsx](src/components/Reveal.jsx) + bloque `[data-reveal]` en `index.css` |
| Titulares que entran palabra por palabra | [src/components/SplitText.jsx](src/components/SplitText.jsx) |
| Profundidad ligada al scroll | [src/hooks/useParallax.js](src/hooks/useParallax.js) + utilidad `parallax` |
| Inclinación 3D y brillo con el puntero | [src/hooks/useTilt.js](src/hooks/useTilt.js) + utilidades `tilt` / `glare` |
| Cifras que cuentan hacia arriba | [src/hooks/useCountUp.js](src/hooks/useCountUp.js) |
| Destellos sobre fotos y botones | Utilidades `img-sheen` / `btn-sheen` en `index.css` |
| Grano de película y halos turquesa | Utilidad `grain` y keyframe `drift` |
| Olas del logo respirando | Keyframe `tide`, en `LogoMark` con `animated` |

Todo el scroll de la página pasa por un único listener compartido
([src/lib/scroll.js](src/lib/scroll.js)), que agrupa las lecturas en un `requestAnimationFrame`.

## Accesibilidad y rendimiento

- Contraste verificado: el turquesa se usa en `#0E7C86` sobre claro y `#4CC4C8` sobre azul noche
  justamente por eso.
- Todos los elementos táctiles miden 44 px o más.
- Anillo de foco visible en toda la navegación por teclado, más enlace «Saltar al contenido».
- El formulario valida al salir del campo, muestra el error debajo, lo anuncia con `role="alert"`
  y enfoca el primer campo inválido al enviar.
- `prefers-reduced-motion` respetado: sin animaciones ni scroll suave para quien lo pida — el
  contenido aparece directamente en su sitio, nunca queda oculto. La franja de avisos deja de
  rotar y muestra los tres mensajes seguidos.
- Las animaciones usan solo `transform`, `translate`, `scale` y `opacity`, sin provocar reflow.
- Las fotos declaran `width`/`height` y cargan en diferido salvo la del hero.
- El visor del lookbook cierra con `Escape`, navega con las flechas y devuelve el foco al
  elemento que lo abrió.

## Publicar

El build genera archivos estáticos en `dist/`, así que sirve cualquier hosting estático
(Vercel, Netlify, Cloudflare Pages, Hostinger, un subdominio propio…).

```bash
npm run build
# subir el contenido de dist/
```
