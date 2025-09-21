import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MyCampaigns() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    fetchMyCampaigns();
  }, [session, status, router]);

  const fetchMyCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns/my');
      const data = await response.json();
      
      if (data.success) {
        setCampaigns(data.campaigns);
      } else {
        setError(data.message || 'Failed to fetch campaigns');
      }
    } catch (err) {
      console.error('Fetch campaigns error:', err);
      setError('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/campaigns/delete?id=${campaignId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setCampaigns(prev => prev.filter(campaign => campaign.id !== campaignId));
      } else {
        alert(data.message || 'Failed to delete campaign');
      }
    } catch (error) {
      console.error('Delete campaign error:', error);
      alert('Failed to delete campaign');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your campaigns...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Campaigns</h1>
              <p className="text-gray-600 mt-1">
                Manage your temple crowdfunding campaigns
              </p>
            </div>
            <Link
              href="/campaigns/create"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create New Campaign
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first temple crowdfunding campaign.</p>
            <Link
              href="/campaigns/create"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Create Your First Campaign
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Campaign Image */}
                <div className="relative h-48">
                  {campaign.images && campaign.images.length > 0 ? (
                    <img
                      src={campaign.images[0]}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-200 to-yellow-200 flex items-center justify-center">
                      <svg className="w-12 h-12 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {campaign.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Campaign Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>

                  <p className="text-orange-600 text-sm font-medium mb-3">
                    🏛️ {campaign.temple?.name || 'Temple'}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {campaign.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{campaign.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(campaign.progress || 0, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>Raised: {formatCurrency(campaign.raisedAmount || 0)}</span>
                      <span>Goal: {formatCurrency(campaign.goalAmount || 0)}</span>
                    </div>
                  </div>

                  {/* Campaign Stats */}
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>{campaign.donorCount || 0} donors</span>
                    <span>Created: {formatDate(campaign.createdAt)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      href={`/campaigns/${campaign.id}`}
                      className="flex-1 bg-orange-500 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm"
                    >
                      View
                    </Link>
                    <Link
                      href={`/campaigns/${campaign.id}/edit`}
                      className="flex-1 border border-orange-500 text-orange-500 text-center py-2 px-4 rounded-lg font-medium hover:bg-orange-50 transition-colors text-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="flex-1 border border-red-500 text-red-500 text-center py-2 px-4 rounded-lg font-medium hover:bg-red-50 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
