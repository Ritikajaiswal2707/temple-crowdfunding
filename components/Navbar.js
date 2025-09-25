import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Background change
      setIsScrolled(currentScrollY > 100)
      
      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    setIsMobileMenuOpen(false)
  }

  const navbarStyles = isScrolled 
    ? 'bg-white/95 backdrop-blur-xl border-b border-orange-500/10' 
    : 'glass-effect'

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarStyles} ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-sacred-gradient rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                🏛️
              </div>
              <span className="text-2xl font-bold text-gradient font-display">
                Daansetu
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('campaigns')}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Campaigns
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
              >
                Contact
              </button>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-orange-500 font-medium transition-colors">
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin" className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 font-medium">
                    Login
                  </Link>
                  <Link href="/campaigns/create" className="btn-primary text-white px-6 py-2 rounded-full font-medium">
                    Start Campaign
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div 
            className={`absolute right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-gradient font-display">
                  Daansetu
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <nav className="space-y-4">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium py-2 text-lg"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => scrollToSection('campaigns')}
                  className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium py-2 text-lg"
                >
                  📋 Campaigns
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium py-2 text-lg"
                >
                  ℹ️ About
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium py-2 text-lg"
                >
                  📞 Contact
                </button>
                {session ? (
                  <>
                    <Link href="/dashboard" className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium py-2 text-lg">
                      📊 Dashboard
                    </Link>
                    <button 
                      onClick={() => signOut()}
                      className="w-full bg-gray-500 text-white py-3 rounded-full font-medium mt-6"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="w-full bg-orange-500 text-white py-3 rounded-full font-medium mt-6 block text-center">
                      Login
                    </Link>
                    <Link href="/campaigns/create" className="w-full btn-primary text-white py-3 rounded-full font-medium block text-center">
                      Start Campaign
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
