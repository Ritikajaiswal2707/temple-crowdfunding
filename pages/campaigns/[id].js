// pages/campaigns/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import DonationForm from "../../components/DonationForm";

export default function CampaignDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDonationForm, setShowDonationForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchCampaign();
  }, [id]);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setCampaign(data.campaign);
      } else {
        setError(data.message || "Campaign not found");
      }
    } catch (err) {
      console.error("Fetch campaign error:", err);
      setError("Failed to load campaign");
    } finally {
      setLoading(false);
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
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDonationSuccess = () => {
    // Refresh campaign data after successful donation
    fetchCampaign();
    setShowDonationForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The campaign you're looking for doesn't exist."}</p>
          <button
            onClick={() => router.push('/campaigns')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse All Campaigns
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100);
  const daysLeft = campaign.deadline ? Math.max(0, Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <>
      <Head>
        <title>{campaign.title} - Temple Crowdfunding</title>
        <meta name="description" content={campaign.description} />
        <meta property="og:title" content={campaign.title} />
        <meta property="og:description" content={campaign.description} />
        {campaign.images && campaign.images.length > 0 && (
          <meta property="og:image" content={campaign.images[0]} />
        )}
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-orange-500 to-yellow-500">
          {campaign.images && campaign.images.length > 0 ? (
            <img
              src={campaign.images[0]}
              alt={campaign.title}
              className="w-full h-full object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-orange-500 to-yellow-500"></div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{campaign.title}</h1>
            <p className="text-xl opacity-90 max-w-3xl">{campaign.description}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaign Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Campaign</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{campaign.description}</p>
                </div>
              </div>

              {/* Temple Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Temple Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Temple Name</h3>
                    <p className="text-gray-700">{campaign.temple?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Deity</h3>
                    <p className="text-gray-700">{campaign.temple?.deity || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">
                      {campaign.temple?.location?.address || 'N/A'}
                      {campaign.temple?.location?.city && `, ${campaign.temple.location.city}`}
                      {campaign.temple?.location?.state && `, ${campaign.temple.location.state}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Campaign Updates */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Campaign Updates</h2>
                {campaign.updates && campaign.updates.length > 0 ? (
                  <div className="space-y-4">
                    {campaign.updates.map((update, index) => (
                      <div key={index} className="border-l-4 border-orange-500 pl-4">
                        <h3 className="font-semibold text-gray-900">{update.title}</h3>
                        <p className="text-gray-700 mt-1">{update.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {formatDate(update.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No updates yet. Check back soon!</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Donation Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Support This Campaign</h3>
                
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Raised: {formatCurrency(campaign.raisedAmount)}</span>
                    <span>Goal: {formatCurrency(campaign.goalAmount)}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{campaign.donorCount}</p>
                    <p className="text-sm text-gray-600">Donors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{campaign.category}</p>
                    <p className="text-sm text-gray-600">Category</p>
                  </div>
                </div>

                {/* Deadline */}
                {daysLeft !== null && (
                  <div className="mb-6 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      {daysLeft > 0 ? `${daysLeft} days left` : 'Campaign ended'}
                    </p>
                  </div>
                )}

                {/* Donate Button */}
                <button
                  onClick={() => setShowDonationForm(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Donate Now
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  🔒 Secure payment with Razorpay
                </p>
              </div>

              {/* Campaign Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Created by:</span>
                    <p className="text-gray-900">{campaign.creator?.name || 'Anonymous'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Created:</span>
                    <p className="text-gray-900">{formatDate(campaign.createdAt)}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <DonationForm
          campaign={campaign}
          onClose={() => setShowDonationForm(false)}
          onSuccess={handleDonationSuccess}
        />
      )}
    </>
  );
}

