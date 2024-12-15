import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <Skills />
        </div>
        <div id="services">
          <Projects />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

