// components/sections/FeaturedCampaigns.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

const FeaturedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchFeaturedCampaigns(); }, []);

  const fetchFeaturedCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns?featured=true&limit=3');
      const data = await response.json();
      if (data.success) setCampaigns(data.campaigns); else setError(data.message);
    } catch (err) {
      setError('Failed to fetch campaigns');
    } finally { setLoading(false); }
  };

  const formatAmount = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
  const fallbackTemple = 'https://source.unsplash.com/800x600/?temple,india';

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Campaigns</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Loading temple campaigns...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300" />
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-4" />
                  <div className="h-6 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded mb-4" />
                  <div className="h-2 bg-gray-300 rounded mb-4" />
                  <div className="flex space-x-3">
                    <div className="flex-1 h-10 bg-gray-300 rounded" />
                    <div className="flex-1 h-10 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Campaigns</h2>
            <p className="text-red-600 mb-8">Error loading campaigns: {error}</p>
            <button onClick={fetchFeaturedCampaigns} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">Try Again</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Campaigns</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of devotees in preserving our sacred heritage. Every contribution brings us closer to our goal.</p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 text-lg">No featured campaigns available at the moment.</p>
            <p className="text-gray-500 mt-2">Check back soon for new projects!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img
                      src={(campaign.images && campaign.images[0]) || fallbackTemple}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = fallbackTemple; }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                        {campaign.category?.replace('_', ' ') || 'Temple'}
                      </span>
                    </div>
                    {campaign.daysLeft !== null && campaign.daysLeft !== undefined && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Ended'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{campaign.title}</h3>
                    <p className="text-orange-600 text-sm font-medium mb-3">🏛️ {campaign.temple?.name || 'Temple'}{campaign.temple?.location?.city && ` • ${campaign.temple.location.city}`}</p>
                    <p className="text-gray-600 text-sm mb-4">{campaign.description}</p>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Raised: {formatAmount(campaign.raisedAmount || 0)}</span>
                        <span>{campaign.progress || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(campaign.progress || 0, 100)}%` }} />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Goal: {formatAmount(campaign.goalAmount || 0)}</span>
                        <span>{campaign.donorCount || 0} donors</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button onClick={() => alert(`Donation feature coming soon for: ${campaign.title}`)} className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300">Donate Now</button>
                      <Link href="/campaigns" className="flex-1 border border-orange-500 text-orange-500 text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center">View Details</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/campaigns" className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                View All Campaigns
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedCampaigns;