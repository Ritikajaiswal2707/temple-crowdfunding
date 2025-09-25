const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      image: "/images/avatar1.jpg",
      text: "I was amazed by the transparency of this platform. I could see exactly how my donation was being used for the temple restoration in my village.",
      rating: 5,
      donation: "₹25,000"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Delhi, NCR",
      image: "/images/avatar2.jpg",
      text: "The process was so simple and secure. Within minutes, I was able to contribute to three different temple projects across India.",
      rating: 5,
      donation: "₹15,000"
    },
    {
      id: 3,
      name: "Vikram Patel",
      location: "Ahmedabad, Gujarat",
      image: "/images/avatar3.jpg",
      text: "Seeing the before and after photos of the temple we funded brought tears to my eyes. This platform is doing divine work.",
      rating: 5,
      donation: "₹50,000"
    }
  ];

  const renderStars = () => null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Donors Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of devotees who have already contributed to preserving our sacred heritage.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              {/* Quote Icon */}
              <div className="mb-2" />

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Rating */}
              <div className="hidden" />

              {/* User Info */}
              <div className="flex items-center">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.location}
                  </p>
                </div>

                {/* Donation Amount */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">Donated</p>
                  <p className="font-bold text-orange-600">
                    {testimonial.donation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">5,000+</div>
              <p className="text-gray-600">Happy Donors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">₹2Cr+</div>
              <p className="text-gray-600">Funds Raised</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;