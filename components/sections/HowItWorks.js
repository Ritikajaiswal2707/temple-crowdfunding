import { useEffect } from 'react'

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: '📝',
      title: 'Create Campaign',
      description: 'Temple committees can easily create campaigns with photos, goals, and detailed information about restoration needs.'
    },
    {
      id: 2,
      icon: '💝',
      title: 'Secure Donations',
      description: 'Devotees worldwide can contribute securely with multiple payment options and receive tax-exemption certificates.'
    },
    {
      id: 3,
      icon: '🏗️',
      title: 'Track Progress',
      description: 'Real-time updates, photos, and transparent fund utilization ensure complete accountability and trust.'
    }
  ]

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        gsap.set('.how-step', { opacity: 0, scale: 0.8 })
        
        ScrollTrigger.batch('.how-step', {
          onEnter: (elements) => gsap.to(elements, { 
            opacity: 1, 
            scale: 1, 
            duration: 0.6, 
            stagger: 0.2,
            ease: "back.out(1.7)"
          })
        })
      } catch (error) {
        console.log('GSAP not loaded:', error)
      }
    }

    loadAnimations()
  }, [])

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 font-display">How SacredFund Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, transparent, and secure way to support temple restoration and maintenance projects across the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.id} className="text-center how-step opacity-0">
              <div className="w-24 h-24 bg-sacred-gradient rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-2xl">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks