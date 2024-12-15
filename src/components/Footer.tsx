import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4 md:mb-0">
            © {new Date().getFullYear()} Yuri Kurashima. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://github.com/rim0o8" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/yuuri-kurashima-2828ab216/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:kurashimayuuri@gmail.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

