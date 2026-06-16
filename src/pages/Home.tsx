import Hero from '../sections/Hero'
import Mission from '../sections/Mission'
import FlagshipGame from '../sections/FlagshipGame'
import Approach from '../sections/Approach'
import Founders from '../sections/Founders'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Mission />
      <FlagshipGame />
      <Approach />
      <Founders />
      <Contact />
      <Footer />
    </main>
  )
}
