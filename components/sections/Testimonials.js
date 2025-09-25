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

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

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
              <div className="text-orange-400 mb-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {testimonial.text}
              </p>

              {/* Rating */}
              <div className="flex items-center mb-3">
                {renderStars(testimonial.rating)}
              </div>

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