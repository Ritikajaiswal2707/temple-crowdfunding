import Image from 'next/image';
import Link from 'next/link';

const FeaturedCampaigns = () => {
  const campaigns = [
    {
      id: 1,
      title: "Restore Ancient Shiva Temple",
      location: "Varanasi, Uttar Pradesh",
      description: "Help restore this 800-year-old temple to its former glory. The temple needs urgent repairs to its foundation and intricate stone carvings.",
      image: "/images/temple1.jpg", // You'll need to add actual images
      raised: 750000,
      goal: 1000000,
      donors: 234,
      daysLeft: 15,
      category: "Restoration"
    },
    {
      id: 2,
      title: "Build Community Prayer Hall",
      location: "Mysore, Karnataka",
      description: "Construction of a new prayer hall to accommodate the growing devotee community in this sacred temple complex.",
      image: "/images/temple2.jpg",
      raised: 450000,
      goal: 800000,
      donors: 156,
      daysLeft: 28,
      category: "Construction"
    },
    {
      id: 3,
      title: "Temple Kitchen Renovation",
      location: "Tirupati, Andhra Pradesh",
      description: "Modernize the temple kitchen facilities to serve prasadam to thousands of daily visitors with better hygiene and efficiency.",
      image: "/images/temple3.jpg",
      raised: 320000,
      goal: 500000,
      donors: 189,
      daysLeft: 42,
      category: "Renovation"
    }
  ];

  const getProgressPercentage = (raised, goal) => {
    return Math.round((raised / goal) * 100);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Featured Campaigns
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of devotees in preserving our sacred heritage. Every contribution brings us closer to our goal.
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Campaign Image */}
              <div className="relative h-48 bg-gradient-to-r from-orange-200 to-yellow-200">
                {/* Placeholder for actual images */}
                <div className="absolute inset-0 flex items-center justify-center text-orange-600">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.category}
                  </span>
                </div>
                
                {/* Days Left Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.daysLeft} days left
                  </span>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {campaign.title}
                </h3>
                
                <p className="text-orange-600 text-sm font-medium mb-3">
                  📍 {campaign.location}
                </p>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {campaign.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Raised: {formatAmount(campaign.raised)}</span>
                    <span>{getProgressPercentage(campaign.raised, campaign.goal)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getProgressPercentage(campaign.raised, campaign.goal)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Goal: {formatAmount(campaign.goal)}</span>
                    <span>{campaign.donors} donors</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link 
                    href={`/campaign/${campaign.id}`}
                    className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300"
                  >
                    Donate Now
                  </Link>
                  <Link 
                    href={`/campaign/${campaign.id}`}
                    className="flex-1 border border-orange-500 text-orange-500 text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Campaigns Button */}
        <div className="text-center">
          <Link 
            href="/campaigns"
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Campaigns
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCampaigns;
