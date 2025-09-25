import { useEffect, useRef } from 'react'

const Hero = () => {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const buttonsRef = useRef()

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        
        // Hero animations timeline
        const tl = gsap.timeline()
        
        tl.from(titleRef.current, { 
          duration: 1.2, 
          y: 100, 
          opacity: 0, 
          ease: "power3.out" 
        })
        .from(subtitleRef.current, { 
          duration: 0.8, 
          y: 50, 
          opacity: 0, 
          ease: "power2.out" 
        }, '-=0.6')
        .from(buttonsRef.current, { 
          duration: 0.8, 
          y: 30, 
          opacity: 0, 
          ease: "power2.out" 
        }, '-=0.4')

        // Floating elements animation
        gsap.to('.floating', {
          y: -20,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.5
        })

      } catch (error) {
        console.log('GSAP not loaded:', error)
      }
    }

    loadAnimations()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center"
      ref={heroRef}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1920&auto=format&fit=crop')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="floating absolute top-20 left-10 text-6xl opacity-20">🕉️</div>
        <div 
          className="floating absolute top-40 right-20 text-4xl opacity-20" 
          style={{ animationDelay: '-2s' }}
        >
          🪔
        </div>
        <div 
          className="floating absolute bottom-40 left-20 text-5xl opacity-20" 
          style={{ animationDelay: '-4s' }}
        >
          🏛️
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="hero-content">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-display hero-title opacity-0"
          >
            Building Divine Spaces
            <br />
            <span className="text-yellow-300">Together</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 hero-subtitle opacity-0"
          >
            Unite with devotees worldwide to restore and maintain temples that have been the cornerstone of our spiritual journey for centuries. Every donation is a step towards preserving divine heritage.
          </p>
          
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center hero-buttons opacity-0"
          >
            <button 
              onClick={() => scrollToSection('campaigns')}
              className="bg-white/10 hover:bg-white/20 text-white px-8 md:px-10 py-4 rounded-full text-lg font-semibold border-2 border-white/40 transition-all duration-300"
            >
              Explore Campaigns
            </button>
            <button 
              onClick={() => scrollToSection('campaigns')}
              className="btn-primary text-white px-8 md:px-10 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Start Your Campaign
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero