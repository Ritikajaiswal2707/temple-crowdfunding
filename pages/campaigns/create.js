import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function CreateCampaign() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'renovation',
    goalAmount: '',
    deadline: '',
    templeName: '',
    templeLocation: '',
    templeCity: '',
    templeState: '',
    templeDeity: '',
    images: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Campaign title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Campaign description is required');
      return false;
    }
    if (!formData.goalAmount || parseFloat(formData.goalAmount) < 1000) {
      setError('Goal amount must be at least ₹1,000');
      return false;
    }
    if (!formData.templeName.trim()) {
      setError('Temple name is required');
      return false;
    }
    if (!formData.templeLocation.trim()) {
      setError('Temple location is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/campaigns/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          goalAmount: parseFloat(formData.goalAmount),
          deadline: formData.deadline ? new Date(formData.deadline) : null
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Campaign created successfully!');
        setTimeout(() => {
          router.push(`/campaigns/${data.campaign.id}`);
        }, 2000);
      } else {
        setError(data.message || 'Failed to create campaign');
      }
    } catch (error) {
      console.error('Create campaign error:', error);
      setError('Failed to create campaign. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { value: 'renovation', label: 'Renovation' },
    { value: 'construction', label: 'Construction' },
    { value: 'festival', label: 'Festival' },
    { value: 'daily_operations', label: 'Daily Operations' },
    { value: 'charity', label: 'Charity' },
    { value: 'equipment', label: 'Equipment' }
  ];

  return (
    <>
      <Head>
        <title>Create Campaign - Temple Crowdfunding</title>
        <meta name="description" content="Create a new temple crowdfunding campaign" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Campaign
            </h1>
            <p className="text-gray-600">
              Start a crowdfunding campaign to support temple preservation and restoration
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              {/* Campaign Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Campaign Details
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Renovate Ancient Shiva Temple"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the purpose of your campaign, what needs to be done, and why it's important..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Amount (₹) *
                    </label>
                    <input
                      type="number"
                      name="goalAmount"
                      value={formData.goalAmount}
                      onChange={handleInputChange}
                      placeholder="100000"
                      min="1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Deadline (Optional)
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Temple Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Temple Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temple Name *
                  </label>
                  <input
                    type="text"
                    name="templeName"
                    value={formData.templeName}
                    onChange={handleInputChange}
                    placeholder="e.g., Shri Kashi Vishwanath Temple"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="templeCity"
                      value={formData.templeCity}
                      onChange={handleInputChange}
                      placeholder="e.g., Varanasi"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="templeState"
                      value={formData.templeState}
                      onChange={handleInputChange}
                      placeholder="e.g., Uttar Pradesh"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address *
                  </label>
                  <textarea
                    name="templeLocation"
                    value={formData.templeLocation}
                    onChange={handleInputChange}
                    placeholder="Enter the complete address of the temple..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Deity (Optional)
                  </label>
                  <input
                    type="text"
                    name="templeDeity"
                    value={formData.templeDeity}
                    onChange={handleInputChange}
                    placeholder="e.g., Lord Shiva, Goddess Durga"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Campaign Images
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload images of the temple to help donors understand the cause
                  </p>
                </div>

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Campaign image ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                  ) : (
                    'Create Campaign'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
