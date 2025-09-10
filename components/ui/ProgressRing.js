import { useEffect, useRef } from 'react'

const ProgressRing = ({ percentage, color = 'orange' }) => {
  const pathRef = useRef()

  useEffect(() => {
    const animateRing = async () => {
      try {
        const { gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        
        gsap.registerPlugin(ScrollTrigger)
        
        const path = pathRef.current
        if (!path) return
        
        const length = path.getTotalLength()
        
        // Set initial state
        gsap.set(path, { 
          strokeDasharray: length,
          strokeDashoffset: length 
        })
        
        // Animate on scroll
        ScrollTrigger.create({
          trigger: path,
          start: "top 80%",
          onEnter: () => {
            gsap.to(path, {
              strokeDashoffset: length - (length * percentage / 100),
              duration: 2,
              ease: "power2.out"
            })
          }
        })
      } catch (error) {
        console.log('GSAP not loaded:', error)
      }
    }

    animateRing()
  }, [percentage])

  const getColorClass = (color) => {
    const colorMap = {
      orange: 'text-orange-500',
      green: 'text-green-500',
      purple: 'text-purple-500',
      blue: 'text-blue-500',
      red: 'text-red-500'
    }
    return colorMap[color] || 'text-orange-500'
  }

  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 progress-ring" viewBox="0 0 36 36">
        {/* Background Circle */}
        <path 
          className="text-gray-200" 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="transparent" 
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* Progress Circle */}
        <path 
          ref={pathRef}
          className={getColorClass(color)} 
          stroke="currentColor" 
          strokeWidth="3" 
          fill="transparent" 
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${getColorClass(color)}`}>
          {percentage}%
        </span>
      </div>
    </div>
  )
}

export default ProgressRing