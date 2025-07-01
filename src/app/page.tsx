import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Projects } from '../components/Projects'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* 背景装飾 */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full gradient-bg opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/20 blur-3xl animate-float" />
        <div className="absolute top-3/4 left-3/4 w-40 h-40 rounded-full bg-purple-500/20 blur-3xl animate-float animate-delay-200" />
        <div className="absolute top-2/3 left-1/5 w-24 h-24 rounded-full bg-pink-500/20 blur-3xl animate-float animate-delay-300" />
        <div className="absolute top-1/5 left-2/3 w-36 h-36 rounded-full bg-green-500/20 blur-3xl animate-float animate-delay-400" />
      </div>
      
      <Header />
      <main className="container mx-auto px-4 pt-24 relative">
        <div id="hero">
          <Hero />
        </div>
        
        <div id="projects" className="py-16 relative">
          <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-background to-transparent -z-10" />
          <div className="max-w-6xl mx-auto">
            <div className="animate-fade-in">
              <Projects />
            </div>
          </div>
        </div>
        
        <div id="contact" className="py-16 relative">
          <div className="absolute left-0 top-0 w-full h-20 bg-gradient-to-b from-background to-transparent -z-10" />
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in glass-effect p-8 rounded-lg">
              <Contact />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

