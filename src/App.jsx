import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Shop from './components/Shop'
import Story from './components/Story'
import Categories from './components/Categories'
import Charms from './components/Charms'
import SetPromo from './components/SetPromo'
import Lookbook from './components/Lookbook'
import Benefits from './components/Benefits'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCta from './components/FloatingCta'

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only rounded-full bg-navy px-6 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-100 focus:inline-flex focus:min-h-11 focus:items-center"
      >
        Saltar al contenido
      </a>

      <ScrollProgress />
      <AnnouncementBar />
      <Navbar />

      <main id="contenido">
        <Hero />
        <Marquee />
        <Shop />
        <Story />
        <Categories />
        <Charms />
        <SetPromo />
        <Lookbook />
        <Benefits />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <FloatingCta />
    </>
  )
}
