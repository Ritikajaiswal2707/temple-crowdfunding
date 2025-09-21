import { useState } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import ChatBoard from '../ChatBoard'
import DarkModeToggle from '../DarkModeToggle'

const Layout = ({ children, title = 'Temple Crowdfunding - Preserve Sacred Heritage', description = 'Support temple renovations and preserve our sacred heritage through transparent crowdfunding' }) => {
  const [showChat, setShowChat] = useState(false)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://temple-crowdfunding-8o3g.vercel.app" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/og-image.jpg" />
        
        {/* Additional Meta Tags */}
        <meta name="keywords" content="temple, crowdfunding, donation, heritage, preservation, India, sacred, restoration" />
        <meta name="author" content="Temple Crowdfunding Platform" />
        <meta name="robots" content="index, follow" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-20">
          {children}
        </main>
        
        <Footer />
        
        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 left-6 z-40 flex flex-col space-y-3">
          <DarkModeToggle />
          
          <button
            onClick={() => setShowChat(!showChat)}
            className="w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-2xl"
            title="Chat with AI Assistant"
          >
            {showChat ? '✕' : '💬'}
          </button>
        </div>
        
        {/* Chat Board */}
        {showChat && <ChatBoard />}
        
        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
          title="Scroll to Top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default Layout
