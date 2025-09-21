import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import CampaignCard from '../../components/ui/CampaignCard'
import ProgressRing from '../../components/ui/ProgressRing'

export default function CampaignsPage() {
  const { data: session } = useSession()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    sortBy: 'newest',
    search: ''
  })
  const [filteredCampaigns, setFilteredCampaigns] = useState([])

  useEffect(() => {
    fetchCampaigns()
  }, [])

  useEffect(() => {
    filterCampaigns()
  }, [campaigns, filters])

  const fetchCampaigns = async () => {
    try {
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      
      if (data.success) {
        setCampaigns(data.campaigns)
      } else {
        setError(data.message)
      }
    } catch (err) {
      console.error('Failed to fetch campaigns:', err)
      setError('Failed to fetch campaigns')
    } finally {
      setLoading(false)
    }
  }

  const filterCampaigns = () => {
    let filtered = [...campaigns]

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        campaign.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        campaign.temple?.name?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(campaign => campaign.category === filters.category)
    }

    // Status filter
    if (filters.status) {
      if (filters.status === 'active') {
        filtered = filtered.filter(campaign => campaign.status === 'active')
      } else if (filters.status === 'completed') {
        filtered = filtered.filter(campaign => campaign.status === 'completed')
      } else if (filters.status === 'urgent') {
        filtered = filtered.filter(campaign => campaign.daysLeft <= 7 && campaign.daysLeft > 0)
      }
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'popular':
        filtered.sort((a, b) => (b.donorCount || 0) - (a.donorCount || 0))
        break
      case 'progress':
        filtered.sort((a, b) => (b.progress || 0) - (a.progress || 0))
        break
      case 'goal':
        filtered.sort((a, b) => (b.goalAmount || 0) - (a.goalAmount || 0))
        break
      default:
        break
    }

    setFilteredCampaigns(filtered)
  }

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'renovation', label: 'Renovation' },
    { value: 'construction', label: 'Construction' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'festival', label: 'Festival' },
    { value: 'education', label: 'Education' }
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'urgent', label: 'Urgent (≤7 days)' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'progress', label: 'Highest Progress' },
    { value: 'goal', label: 'Highest Goal' }
  ]

  if (loading) {
    return (
      <>
        <Head>
          <title>Campaigns - Temple Crowdfunding</title>
          <meta name="description" content="Browse all temple crowdfunding campaigns" />
        </Head>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading campaigns...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Campaigns - Temple Crowdfunding</title>
        </Head>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <div className="text-red-600 text-xl mb-4">❌ Error loading campaigns</div>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchCampaigns}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Campaigns - Temple Crowdfunding</title>
        <meta name="description" content="Browse all temple crowdfunding campaigns and find the perfect cause to support" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                🏛️ Temple Campaigns
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover and support temple restoration projects across India
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl font-bold mb-2">{campaigns.length}</div>
                  <div className="text-orange-200">Active Campaigns</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl font-bold mb-2">
                    ₹{campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-orange-200">Total Raised</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <div className="text-3xl font-bold mb-2">
                    {campaigns.reduce((sum, c) => sum + (c.donorCount || 0), 0)}
                  </div>
                  <div className="text-orange-200">Total Donors</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>

                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>

                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {sortOptions.map(sort => (
                    <option key={sort.value} value={sort.value}>{sort.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-gray-600">
              Showing {filteredCampaigns.length} of {campaigns.length} campaigns
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="container mx-auto px-4 py-8">
          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No campaigns found</h3>
              <p className="text-gray-600 mb-8">
                {filters.search || filters.category || filters.status 
                  ? 'Try adjusting your filters to see more campaigns.'
                  : 'No campaigns are available at the moment.'}
              </p>
              {(filters.search || filters.category || filters.status) && (
                <button
                  onClick={() => setFilters({ category: '', status: '', sortBy: 'newest', search: '' })}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        {session && (
          <div className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to start your own campaign?
              </h3>
              <p className="text-gray-600 mb-8">
                Create a campaign for your temple and connect with devotees worldwide
              </p>
              <Link
                href="/campaigns/create"
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ➕ Create Campaign
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
