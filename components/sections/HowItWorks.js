const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Campaigns",
      description: "Discover temple restoration and construction projects across India that need your support.",
      icon: "🏛️",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Choose Your Cause",
      description: "Select a temple project that resonates with your heart and learn about their specific needs.",
      icon: "❤️",
      color: "from-red-500 to-red-600"
    },
    {
      id: 3,
      title: "Make a Donation",
      description: "Contribute securely through our integrated payment system with complete transparency.",
      icon: "💰",
      color: "from-green-500 to-green-600"
    },
    {
      id: 4,
      title: "Track Progress",
      description: "Follow the progress of your chosen project and see the impact of your contribution.",
      icon: "📈",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Supporting temple preservation has never been easier. Follow these simple steps to make a difference.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-300 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
              )}
              
              {/* Step Card */}
              <div className="relative z-10 text-center">
                {/* Icon Circle */}
                <div className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-4xl">{step.icon}</span>
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;