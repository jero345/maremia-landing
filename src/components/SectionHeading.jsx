import Reveal from './Reveal'
import SplitText from './SplitText'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = 'dark',
  align = 'left',
}) {
  const isLight = tone === 'light'
  const centered = align === 'center'

  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        {/* La regla turquesa se estira sola: marca el inicio de cada bloque */}
        <span
          className={`rule-draw h-px w-8 ${isLight ? 'bg-sea-bright' : 'bg-sea'}`}
          aria-hidden="true"
        />
        <span
          className={`text-[0.66rem] font-light tracking-[0.3em] uppercase ${
            isLight ? 'text-sea-bright' : 'text-sea'
          }`}
        >
          {eyebrow}
        </span>
      </Reveal>

      <SplitText
        as="h2"
        delay={140}
        step={50}
        segments={[{ text: title }]}
        className={`mt-4 font-display text-4xl font-medium sm:text-5xl ${
          isLight ? 'text-cream' : 'text-navy'
        }`}
      />

      {description && (
        <Reveal
          as="p"
          delay={320}
          className={`mt-5 text-base sm:text-lg ${isLight ? 'text-cream/80' : 'text-navy-mist'}`}
        >
          {description}
        </Reveal>
      )}
    </div>
  )
}
