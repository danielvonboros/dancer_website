import { useTranslation } from 'react-i18next'
import Nav from '../components/nav/Nav'
import Footer from '../components/footer/Footer'
import SkipLink from '../components/skipLink/SkipLink'
import Hero from '../sections/hero/Hero'
import About from '../sections/about/About'
import Work from '../sections/work/Work'
import Resume from '../sections/resume/Resume'
import Videos from '../sections/videos/Videos'
import References from '../sections/references/References'
import Contact from '../sections/contact/Contact'

/** The one-page home: hero, then the sections in the order of the nav. */
export default function Home() {
  const { t } = useTranslation()

  return (
    <>
      <SkipLink href="#about" label={t('nav.about')} />
      <Nav />
      <Hero />
      <main>
        <About />
        <Work />
        <Resume />
        <Videos />
        <References />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
