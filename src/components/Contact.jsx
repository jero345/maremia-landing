import { useRef, useState } from 'react'
import { CheckCircle2, Loader2, MapPin, Phone, Send } from 'lucide-react'
import InstagramIcon from './icons/InstagramIcon'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import {
  ATELIER,
  EMAIL,
  INSTAGRAM,
  INSTAGRAM_HANDLE,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
} from '../data/contact'

const interests = ['Collares', 'Pulseras', 'Tobilleras', 'Set de tres', 'Regalo']

const validators = {
  nombre: (v) => (v.trim().length < 2 ? 'Escribe tu nombre para saber cómo llamarte.' : ''),
  telefono: (v) =>
    /^[+\d][\d\s-]{6,}$/.test(v.trim())
      ? ''
      : 'Necesitamos un número válido, por ejemplo 300 123 4567.',
  interes: (v) => (v ? '' : 'Elige qué tipo de pieza te interesa.'),
}

const emptyForm = { nombre: '', telefono: '', interes: '', mensaje: '' }

export default function Contact() {
  const [values, setValues] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const formRef = useRef(null)

  const setField = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // Solo limpiamos el error mientras escribe; no validamos en cada tecla.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // Validación al salir del campo, no en cada pulsación.
  const handleBlur = (e) => {
    const { name, value } = e.target
    const validate = validators[name]
    if (validate) setErrors((prev) => ({ ...prev, [name]: validate(value) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const nextErrors = Object.fromEntries(
      Object.entries(validators).map(([field, validate]) => [field, validate(values[field])]),
    )
    const firstInvalid = Object.keys(nextErrors).find((k) => nextErrors[k])
    setErrors(nextErrors)

    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus()
      return
    }

    setStatus('sending')
    // Sin backend: abrimos WhatsApp con el mensaje ya redactado.
    const text = `Hola Maremía, soy ${values.nombre}. Me interesa: ${values.interes}. Tel: ${values.telefono}.${
      values.mensaje ? ` ${values.mensaje}` : ''
    }`
    window.setTimeout(() => {
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
        '_blank',
        'noopener',
      )
      setStatus('sent')
      setValues(emptyForm)
    }, 600)
  }

  const fieldClass = (name) =>
    `min-h-13 w-full rounded-xl border bg-shell px-4 text-base text-navy transition-[border-color,box-shadow,background-color] duration-300 ease-out-soft placeholder:text-navy-mist/60 focus:border-sea focus:bg-cream focus:shadow-[0_0_0_4px_rgba(76,196,200,0.18)] ${
      errors[name] ? 'border-red-600' : 'border-line'
    }`

  return (
    <section
      id="contacto"
      className="relative grain scroll-mt-20 overflow-hidden bg-shell py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(76,196,200,0.16),transparent_70%)] animate-drift"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Escríbenos"
            title="Cuéntanos qué pieza tienes en mente"
            description="Te respondemos el mismo día con fotos de las piedras, largos y precios. Sin compromiso."
          />

          <Reveal delay={400} className="mt-10 space-y-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-line bg-cream p-5 transition-[border-color,background-color,translate] duration-400 ease-out-soft hover:-translate-y-0.5 hover:border-sea hover:bg-sea-mist/30"
            >
              <span className="mt-0.5 text-sea transition-[scale] duration-400 ease-spring group-hover:scale-115">
                <Phone className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">WhatsApp directo</span>
                <span className="block text-sm text-navy-mist tabular">{WHATSAPP_DISPLAY}</span>
              </span>
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-line bg-cream p-5 transition-[border-color,background-color,translate] duration-400 ease-out-soft hover:-translate-y-0.5 hover:border-sea hover:bg-sea-mist/30"
            >
              <span className="mt-0.5 text-sea transition-[scale] duration-400 ease-spring group-hover:scale-115">
                <InstagramIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">Instagram</span>
                <span className="block text-sm text-navy-mist">{INSTAGRAM_HANDLE}</span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-cream p-5">
              <span className="mt-0.5 text-sea">
                <MapPin className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">Taller</span>
                <span className="block text-sm text-navy-mist">{ATELIER}</span>
                <span className="block text-sm text-navy-mist">Lun a sáb · 9:00 a 18:00</span>
              </span>
            </div>

            <a
              href={`mailto:${EMAIL}`}
              className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-line bg-cream p-5 transition-[border-color,background-color,translate] duration-400 ease-out-soft hover:-translate-y-0.5 hover:border-sea hover:bg-sea-mist/30"
            >
              <span className="mt-0.5 text-sea transition-[scale] duration-400 ease-spring group-hover:scale-115">
                <Send className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-navy">Correo</span>
                <span className="block text-sm text-navy-mist">{EMAIL}</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal
          delay={100}
          variant="scale"
          className="rounded-3xl border border-line bg-cream p-7 shadow-[0_30px_70px_-50px_rgba(26,45,62,0.6)] sm:p-9"
        >
          <form ref={formRef} noValidate onSubmit={handleSubmit}>
            <p className="text-sm text-navy-mist">
              Los campos con <span className="text-red-700">*</span> son obligatorios.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="nombre" className="block text-sm font-semibold text-navy">
                  Nombre completo <span className="text-red-700">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  value={values.nombre}
                  onChange={(e) => setField('nombre', e.target.value)}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.nombre)}
                  aria-describedby={errors.nombre ? 'error-nombre' : undefined}
                  className={`mt-2 ${fieldClass('nombre')}`}
                  placeholder="María Fernanda Gómez"
                />
                {errors.nombre && (
                  <p id="error-nombre" role="alert" className="mt-1.5 text-sm text-red-700">
                    {errors.nombre}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-navy">
                  WhatsApp <span className="text-red-700">*</span>
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={values.telefono}
                  onChange={(e) => setField('telefono', e.target.value)}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.telefono)}
                  aria-describedby={errors.telefono ? 'error-telefono' : 'ayuda-telefono'}
                  className={`mt-2 ${fieldClass('telefono')} tabular`}
                  placeholder="300 123 4567"
                />
                {errors.telefono ? (
                  <p id="error-telefono" role="alert" className="mt-1.5 text-sm text-red-700">
                    {errors.telefono}
                  </p>
                ) : (
                  <p id="ayuda-telefono" className="mt-1.5 text-sm text-navy-mist">
                    Te escribimos por aquí, no llamamos sin avisar.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="interes" className="block text-sm font-semibold text-navy">
                  Me interesa <span className="text-red-700">*</span>
                </label>
                <select
                  id="interes"
                  name="interes"
                  value={values.interes}
                  onChange={(e) => setField('interes', e.target.value)}
                  onBlur={handleBlur}
                  aria-invalid={Boolean(errors.interes)}
                  aria-describedby={errors.interes ? 'error-interes' : undefined}
                  className={`mt-2 cursor-pointer ${fieldClass('interes')}`}
                >
                  <option value="">Elige una opción</option>
                  {interests.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.interes && (
                  <p id="error-interes" role="alert" className="mt-1.5 text-sm text-red-700">
                    {errors.interes}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mensaje" className="block text-sm font-semibold text-navy">
                  Cuéntanos más <span className="font-normal text-navy-mist">(opcional)</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  value={values.mensaje}
                  onChange={(e) => setField('mensaje', e.target.value)}
                  className="mt-2 w-full rounded-xl border border-line bg-shell px-4 py-3 text-base text-navy transition-[border-color,box-shadow,background-color] duration-300 ease-out-soft placeholder:text-navy-mist/60 focus:border-sea focus:bg-cream focus:shadow-[0_0_0_4px_rgba(76,196,200,0.18)]"
                  placeholder="Me gusta el Manglar. ¿Lo tienen disponible y en qué largos?"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-sheen mt-7 flex min-h-13 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-navy px-8 text-xs font-semibold tracking-[0.14em] text-cream uppercase transition-[background-color,scale,box-shadow] duration-300 hover:bg-sea hover:shadow-[0_18px_40px_-18px_rgba(14,124,134,0.9)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  Solicitar asesoría
                </>
              )}
            </button>

            <p aria-live="polite" className="mt-4 min-h-6 text-center text-sm">
              {status === 'sent' && (
                <span className="inline-flex items-center gap-2 font-medium text-green-800">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  Listo, abrimos WhatsApp con tu mensaje redactado.
                </span>
              )}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
