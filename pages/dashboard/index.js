import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import ProgressRing from '../../components/ui/ProgressRing'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalDonations: 0,
    campaignsCreated: 0,
    totalRaised: 0,
    recentDonations: [],
    myCampaigns: [],
    totalDonors: 0,
    averageDonation: 0
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      router.push('/auth/signin')
      return
    }
    fetchUserStats()
  }, [session, status, router])

  const fetchUserStats = async () => {
    try {
      const [statsResponse, campaignsResponse] = await Promise.all([
        fetch('/api/user/stats'),
        fetch('/api/campaigns/my')
      ])
      
      const statsData = await statsResponse.json()
      const campaignsData = await campaignsResponse.json()
      
      if (statsData.success) {
        setStats(prev => ({
          ...prev,
          ...statsData.stats,
          myCampaigns: campaignsData.success ? campaignsData.campaigns : []
        }))
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Head>
        <title>Dashboard - Temple Crowdfunding</title>
        <meta name="description" content="Your temple crowdfunding dashboard" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {session.user.name}! 🙏
                </h1>
                <p className="text-gray-600">
                  Here's an overview of your temple crowdfunding activities
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  href="/campaigns/create"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ➕ Create Campaign
                </Link>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: '📊 Overview', icon: '📊' },
                  { id: 'campaigns', label: '🏛️ My Campaigns', icon: '🏛️' },
                  { id: 'donations', label: '💰 Donations', icon: '💰' },
                  { id: 'analytics', label: '📈 Analytics', icon: '📈' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Donations</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalDonations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Campaigns Created</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.campaignsCreated}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <span className="text-2xl">📈</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Raised</p>
                      <p className="text-2xl font-bold text-gray-900">{formatAmount(stats.totalRaised)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Donors</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalDonors}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">🚀 Quick Actions</h2>
                  <div className="space-y-4">
                    <Link
                      href="/campaigns/create"
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-4 px-6 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 text-left flex items-center shadow-lg hover:shadow-xl"
                    >
                      <span className="text-2xl mr-3">➕</span>
                      <div>
                        <div className="font-semibold">Create New Campaign</div>
                        <div className="text-sm opacity-90">Start a new temple project</div>
                      </div>
                    </Link>
                    <Link
                      href="/campaigns"
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-left flex items-center shadow-lg hover:shadow-xl"
                    >
                      <span className="text-2xl mr-3">🔍</span>
                      <div>
                        <div className="font-semibold">Browse Campaigns</div>
                        <div className="text-sm opacity-90">Discover temple projects</div>
                      </div>
                    </Link>
                    <Link
                      href="/dashboard/campaigns"
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-left flex items-center shadow-lg hover:shadow-xl"
                    >
                      <span className="text-2xl mr-3">📊</span>
                      <div>
                        <div className="font-semibold">Manage Campaigns</div>
                        <div className="text-sm opacity-90">View and edit your campaigns</div>
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">📋 Recent Activity</h2>
                  {stats.recentDonations.length > 0 ? (
                    <div className="space-y-4">
                      {stats.recentDonations.slice(0, 5).map((donation, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-orange-600">💰</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{donation.campaignTitle}</p>
                              <p className="text-sm text-gray-600">{donation.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{formatAmount(donation.amount)}</p>
                            <p className="text-xs text-gray-500">Donation</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📝</div>
                      <p className="text-gray-500">No recent activity</p>
                      <p className="text-sm text-gray-400 mt-2">Start by creating a campaign or making a donation</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'campaigns' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">🏛️ My Campaigns</h2>
                <Link
                  href="/campaigns/create"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  ➕ New Campaign
                </Link>
              </div>
              
              {stats.myCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stats.myCampaigns.map((campaign) => (
                    <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-gray-800 text-lg">{campaign.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>
                      
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
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600 mb-4">
                        <span>Raised: {formatAmount(campaign.raisedAmount || 0)}</span>
                        <span>Goal: {formatAmount(campaign.goalAmount || 0)}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/campaigns/${campaign.id}`}
                          className="flex-1 bg-orange-500 text-white text-center py-2 px-3 rounded-lg text-sm hover:bg-orange-600 transition-colors"
                        >
                          View
                        </Link>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No campaigns yet</h3>
                  <p className="text-gray-600 mb-6">Start your first temple crowdfunding campaign</p>
                  <Link
                    href="/campaigns/create"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Create Your First Campaign
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">💰 Donation History</h2>
              {stats.recentDonations.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-green-600 text-xl">💰</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{donation.campaignTitle}</p>
                          <p className="text-sm text-gray-600">{donation.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">{formatAmount(donation.amount)}</p>
                        <p className="text-xs text-gray-500">Donation</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💝</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No donations yet</h3>
                  <p className="text-gray-600 mb-6">Start supporting temple projects</p>
                  <Link
                    href="/campaigns"
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Browse Campaigns
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">📊 Performance Overview</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Average Donation</span>
                    <span className="font-bold text-lg">{formatAmount(stats.averageDonation)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Donors</span>
                    <span className="font-bold text-lg">{stats.totalDonors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Campaign Success Rate</span>
                    <span className="font-bold text-lg">
                      {stats.campaignsCreated > 0 
                        ? Math.round((stats.myCampaigns.filter(c => c.status === 'completed').length / stats.campaignsCreated) * 100)
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">🎯 Goals & Achievements</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-orange-800">Monthly Goal</span>
                      <span className="text-orange-600 font-bold">₹50,000</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((stats.totalRaised / 50000) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-orange-600 mt-1">
                      {Math.round((stats.totalRaised / 50000) * 100)}% of monthly goal
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-green-800">Campaigns Target</span>
                      <span className="text-green-600 font-bold">5</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((stats.campaignsCreated / 5) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                      {stats.campaignsCreated} of 5 campaigns created
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}