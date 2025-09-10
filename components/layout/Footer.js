const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-sacred-gradient rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                🏛️
              </div>
              <span className="text-3xl font-bold text-gradient font-display">SacredFund</span>
            </div>
            <p className="text-gray-400 text-lg mb-6 max-w-md">
              Preserving sacred heritage through community-driven crowdfunding. Connect with temples, support restoration, and be part of something divine.
            </p>
            <div className="flex space-x-4">
              <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl hover:bg-orange-600 transition-all">
                📧
              </button>
              <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl hover:bg-orange-600 transition-all">
                📱
              </button>
              <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl hover:bg-orange-600 transition-all">
                🐦
              </button>
              <button className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-xl hover:bg-orange-600 transition-all">
                📘
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-orange-400">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors hover:text-orange-400">🏠 Home</a></li>
              <li><a href="#campaigns" className="hover:text-white transition-colors hover:text-orange-400">📋 All Campaigns</a></li>
              <li><a href="#about" className="hover:text-white transition-colors hover:text-orange-400">ℹ️ About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors hover:text-orange-400">📞 Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:text-orange-400">📰 Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-xl mb-6 text-orange-400">Support</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors hover:text-orange-400">❓ How it Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:text-orange-400">💡 FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:text-orange-400">📋 Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:text-orange-400">🔒 Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:text-orange-400">🛡️ Safety & Trust</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {currentYear} SacredFund. Made with ❤️ and 🙏 for preserving our divine heritage.
            </p>
            <div className="flex items-center space-x-6 text-gray-400">
              <span>🔒 Secure Payments</span>
              <span>📜 80G Tax Benefits</span>
              <span>✅ Verified Campaigns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer