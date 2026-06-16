import Hero from '../sections/Hero'
import Mission from '../sections/Mission'
import FlagshipGame from '../sections/FlagshipGame'
import Approach from '../sections/Approach'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />
      <Mission />
      <FlagshipGame />
      <Approach />
      <Contact />
      <Footer />
    </main>
  )
}
