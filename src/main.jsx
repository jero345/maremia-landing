import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

/*
 * Al abrir un enlace con ancla (maremia.co/#lookbook) el navegador busca la
 * sección antes de que React la haya montado, así que no encuentra nada y deja
 * al visitante arriba del todo. La buscamos de nuevo tras el primer pintado.
 */
const { hash } = window.location
if (hash.length > 1) {
  const scrollToTarget = () => document.querySelector(hash)?.scrollIntoView({ block: 'start' })

  // React monta de forma concurrente, así que la sección puede tardar varios
  // cuadros en existir. Reintentamos hasta encontrarla y paramos.
  let attempts = 0
  const findAndScroll = () => {
    if (document.querySelector(hash)) scrollToTarget()
    else if (++attempts < 30) requestAnimationFrame(findAndScroll)
  }
  requestAnimationFrame(findAndScroll)

  // Y una vez más al terminar de cargar fuentes e imágenes: para entonces la
  // página ya tiene su altura definitiva y la posición es la correcta.
  window.addEventListener('load', () => requestAnimationFrame(scrollToTarget), { once: true })
}
