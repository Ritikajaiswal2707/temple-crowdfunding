import Head from 'next/head'
import { useEffect } from 'react'

// Layout Components
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// Section Components
import Hero from '../components/sections/Hero'
import Stats from '../components/sections/Stats'
import FeaturedCampaigns from '../components/sections/FeaturedCampaigns'
import HowItWorks from '../components/sections/HowItWorks'
import Testimonials from '../components/sections/Testimonials'
import CTA from '../components/sections/CTA'

export default function Home() {
  useEffect(() => {
    // Initialize intersection observer for additional animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      })
    }, observerOptions)

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section)
    })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Head>
        <title>SacredFund - Preserve Our Divine Heritage | Temple Crowdfunding Platform</title>
        <meta name="description" content="Unite with devotees worldwide to restore and maintain temples through transparent, secure crowdfunding. Preserve sacred heritage for future generations." />
        <meta name="keywords" content="temple restoration, crowdfunding, sacred heritage, temple donations, spiritual preservation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="SacredFund - Preserve Our Divine Heritage" />
        <meta property="og:description" content="Join thousands of devotees in preserving temples that have been spiritual beacons for generations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://temple-crowdfunding.vercel.app" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SacredFund - Preserve Our Divine Heritage" />
        <meta name="twitter:description" content="Unite with devotees worldwide to restore and maintain temples through transparent crowdfunding." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://temple-crowdfunding.vercel.app" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SacredFund",
              "description": "Temple crowdfunding platform for preserving sacred heritage",
              "url": "https://temple-crowdfunding.vercel.app",
              "logo": "https://temple-crowdfunding.vercel.app/logo.png",
              "sameAs": [
                "https://twitter.com/sacredfund",
                "https://facebook.com/sacredfund"
              ]
            })
          }}
        />
      </Head>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Stats Section */}
        <Stats />
        
        {/* Featured Campaigns */}
        <FeaturedCampaigns />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Call to Action */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        <button 
          className="w-16 h-16 bg-green-500 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300" 
          title="WhatsApp Support"
          onClick={() => window.open('https://wa.me/919876543210', '_blank')}
        >
          💬
        </button>
        <button 
          className="w-16 h-16 bg-orange-500 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl hover:scale-110 transition-all duration-300" 
          title="Quick Donate"
          onClick={() => {
            const element = document.getElementById('campaigns')
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          💰
        </button>
      </div>
    </>
  )
}