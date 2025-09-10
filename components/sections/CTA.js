const CTA = () => {
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
    <section className="py-20 bg-sacred-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-temple-pattern opacity-30"></div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-6xl font-bold mb-8 font-display">Ready to Preserve Heritage?</h2>
        <p className="text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
          Join thousands of devotees worldwide in preserving sacred temples for future generations. Every donation is a blessing, every campaign is a sacred mission.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => scrollToSection('campaigns')}
            className="bg-white text-orange-500 font-bold py-5 px-12 rounded-full text-xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:scale-105"
          >
            🚀 Create Your Campaign
          </button>
          <button 
            onClick={() => scrollToSection('campaigns')}
            className="glass-effect border-2 border-white text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-white hover:text-orange-500 transition-all duration-300"
          >
            💝 Start Donating Today
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA