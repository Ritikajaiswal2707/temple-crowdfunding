import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Make a 
            <span className="block text-yellow-300">Sacred Impact?</span>
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Join thousands of devotees preserving our cultural heritage. 
            Every contribution counts, every temple matters.
          </p>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-white/90 font-medium">100% Secure</p>
              <p className="text-white/70 text-sm">Safe & encrypted transactions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">👁️</div>
              <p className="text-white/90 font-medium">Transparent</p>
              <p className="text-white/70 text-sm">Track every rupee's impact</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-white/90 font-medium">Instant</p>
              <p className="text-white/70 text-sm">Immediate contribution process</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/campaigns"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              🏛️ Browse Campaigns
            </Link>
            
            <Link 
              href="/create-campaign"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              ➕ Start a Campaign
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/70 mb-4">Trusted by devotees across India</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <span className="text-yellow-300">⭐⭐⭐⭐⭐</span>
                <span className="text-sm">4.9/5 Rating</span>
              </div>
              <div className="text-sm">50+ Temples Restored</div>
              <div className="text-sm">₹2Cr+ Raised</div>
              <div className="text-sm">5000+ Happy Donors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 animate-bounce delay-1000">
        <div className="text-6xl opacity-20">🙏</div>
      </div>
      <div className="absolute bottom-1/4 right-8 animate-bounce delay-2000">
        <div className="text-6xl opacity-20">🕉️</div>
      </div>
    </section>
  );
};

export default CTA;