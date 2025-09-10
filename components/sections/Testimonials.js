import { useEffect } from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      location: 'Mumbai, Maharashtra',
      initial: 'P',
      review: 'Contributing to temple restoration gave me a sense of purpose. Seeing the before and after photos filled my heart with joy. This platform makes giving so meaningful!',
      rating: 5,
      bgColor: 'bg-orange-500',
      gradientFrom: 'from-orange-50',
      gradientTo: 'to-yellow-50'
    },
    {
      id: 2,
      name: 'Rajesh Gupta',
      location: 'Delhi, India',
      initial: 'R',
      review: 'The transparency is incredible. I could track every rupee and see the actual progress. My ancestral temple is now beautifully restored thanks to this platform.',
      rating: 5,
      bgColor: 'bg-purple-500',
      gradientFrom: 'from-purple-50',
      gradientTo: 'to-pink-50'
    },
    {
      id: 3,
      name: 'Anita Patel',
      location: 'London, UK',
      initial: 'A',
      review: 'Being away from India, this platform helped me stay connected to my roots. I\'ve supported 5 temples so far and feel spiritually fulfilled.',
      rating: 5,
      bgColor: 'bg-green-500',
      gradientFrom: 'from-green-50',
      gradientTo: 'to-blue-50'
    }
  ]

  useEffect(() => {
    const loadAnimations = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)

        gsap.set('.testimonial-card', { opacity: 0, x: -50 })
        
        ScrollTrigger.batch('.testimonial-card', {
          onEnter: (elements) => gsap.to(elements, { 
            opacity: 1, 
            x: 0, 
            duration: 0.8, 
            stagger: 0.2,
            ease: "power2.out"
          })
        })
      } catch (error) {
        console.log('GSAP not loaded:', error)
      }
    }

    loadAnimations()
  }, [])

  const renderStars = (rating) => {
    return '⭐'.repeat(rating)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 font-display">Devotee Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from devotees who have experienced the joy of preserving sacred spaces and connecting with their spiritual heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`bg-gradient-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo} p-8 rounded-3xl shadow-lg testimonial-card opacity-0`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-16 h-16 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4`}>
                  {testimonial.initial}
                </div>
                <div>
                  <div className="font-bold text-gray-800">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.location}</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"{testimonial.review}"</p>
              <div className="text-yellow-400 text-lg">{renderStars(testimonial.rating)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials