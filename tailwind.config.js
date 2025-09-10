import Head from 'next/head'
import { useEffect, useRef } from 'react'

export default function Home() {
  const heroRef = useRef()
  const titleRef = useRef()

  useEffect(() => {
    // Safe GSAP loading
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        
        // Hero animations
        gsap.fromTo(titleRef.current, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
        )

        gsap.fromTo('.feature-card', 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.2,
            delay: 0.5,
            ease: "power2.out" 
          }
        )
      } catch (error) {
        console.log('GSAP not loaded:', error)
      }
    }

    loadAnimations()
  }, [])

  return (
    <>
      <Head>
        <title>Temple Crowdfunding - Preserve Sacred Heritage</title>
        <meta name="description" content="Support temple renovations and preserve our sacred heritage through transparent crowdfunding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-soft sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gradient">🏛️ Temple Fund</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 hover:text-saffron-500 px-3 py-2 font-medium">Home</a>
                <a href="#" className="text-gray-900 hover:text-saffron-500 px-3 py-2 font-medium">Campaigns</a>
                <a href="#" className="text-gray-900 hover:text-saffron-500 px-3 py-2 font-medium">About</a>
                <button className="btn-primary ml-4">Login</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center sacred-gradient">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6 font-display">
            Preserve Sacred
            <br />
            <span className="text-temple-gold">Heritage</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Support temple renovations and cultural preservation through transparent, 
            secure crowdfunding. Every donation helps maintain our spiritual heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4 transform hover:scale-105">
              Start a Campaign
            </button>
            <button className="btn-secondary text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-saffron-500">
              Browse Temples
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="feature-card bg-white p-8 rounded-2xl shadow-soft">
              <div className="text-4xl font-bold text-saffron-500 mb-2">150+</div>
              <div className="text-gray-600 font-medium">Temples Supported</div>
            </div>
            <div className="feature-card bg-white p-8 rounded-2xl shadow-soft">
              <div className="text-4xl font-bold text-saffron-500 mb-2">₹2.5Cr</div>
              <div className="text-gray-600 font-medium">Funds Raised</div>
            </div>
            <div className="feature-card bg-white p-8 rounded-2xl shadow-soft">
              <div className="text-4xl font-bold text-saffron-500 mb-2">10K+</div>
              <div className="text-gray-600 font-medium">Devotees Connected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Campaigns</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover temples in need of support and be part of preserving our cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Campaign Card 1 */}
            <div className="feature-card temple-card bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center">
                <span className="text-6xl">🏛️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Radha Krishna Temple</h3>
                <p className="text-gray-600 mb-4">Vrindavan, Uttar Pradesh</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-saffron-500 h-2 rounded-full" style={{width: '68%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>₹6,80,000 raised</span>
                  <span>₹10,00,000 goal</span>
                </div>
                <button className="btn-primary w-full">Donate Now</button>
              </div>
            </div>

            {/* Campaign Card 2 */}
            <div className="feature-card temple-card bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-temple-gold to-yellow-500 flex items-center justify-center">
                <span className="text-6xl">🕉️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Shiva Mandir</h3>
                <p className="text-gray-600 mb-4">Rishikesh, Uttarakhand</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-temple-gold h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>₹2,25,000 raised</span>
                  <span>₹5,00,000 goal</span>
                </div>
                <button className="btn-primary w-full">Donate Now</button>
              </div>
            </div>

            {/* Campaign Card 3 */}
            <div className="feature-card temple-card bg-white rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <div className="h-48 bg-gradient-to-br from-temple-red to-red-600 flex items-center justify-center">
                <span className="text-6xl">🪔</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Durga Mata Temple</h3>
                <p className="text-gray-600 mb-4">Varanasi, Uttar Pradesh</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div className="bg-temple-red h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>₹8,20,000 raised</span>
                  <span>₹10,00,000 goal</span>
                </div>
                <button className="btn-primary w-full">Donate Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sacred-gradient text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of devotees in preserving our sacred temples for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-saffron-500 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Create Campaign
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white hover:text-saffron-500 transition-colors">
              Explore Temples
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-4">🏛️ Temple Fund</h3>
              <p className="text-gray-400">Preserving sacred heritage through community support</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Campaigns</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">How it Works</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <span className="text-2xl cursor-pointer hover:text-saffron-500">📧</span>
                <span className="text-2xl cursor-pointer hover:text-saffron-500">📱</span>
                <span className="text-2xl cursor-pointer hover:text-saffron-500">🐦</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Temple Fund. Made with ❤️ for preserving our heritage.</p>
          </div>
        </div>
      </footer>
    </>
  )
}