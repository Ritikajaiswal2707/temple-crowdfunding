import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function AdminPanel() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCampaigns: 0,
    totalDonations: 0,
    totalRaised: 0,
    pendingCampaigns: 0,
    activeCampaigns: 0
  })
  const [recentCampaigns, setRecentCampaigns] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (status === 'loading') return
    
    // Check if user is admin (in real app, check user role)
    if (!session || session.user.email !== 'admin@templecrowdfunding.com') {
      router.push('/')
      return
    }
    
    fetchAdminData()
  }, [session, status, router])

  const fetchAdminData = async () => {
    try {
      // In a real app, these would be admin-specific API endpoints
      const [campaignsResponse, usersResponse] = await Promise.all([
        fetch('/api/campaigns'),
        fetch('/api/users') // This endpoint would need to be created
      ])
      
      const campaignsData = await campaignsResponse.json()
      
      if (campaignsData.success) {
        const campaigns = campaignsData.campaigns
        setRecentCampaigns(campaigns.slice(0, 5))
        
        setStats(prev => ({
          ...prev,
          totalCampaigns: campaigns.length,
          activeCampaigns: campaigns.filter(c => c.status === 'active').length,
          pendingCampaigns: campaigns.filter(c => c.status === 'pending').length,
          totalRaised: campaigns.reduce((sum, c) => sum + (c.raisedAmount || 0), 0)
        }))
      }
    } catch (error) {
      console.error('Failed to fetch admin data:', error)
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
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user.email !== 'admin@templecrowdfunding.com') {
    return null
  }

  return (
    <>
      <Head>
        <title>Admin Panel - Temple Crowdfunding</title>
        <meta name="description" content="Admin panel for managing temple crowdfunding platform" />
      </Head>

      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  🛡️ Admin Panel
                </h1>
                <p className="text-gray-600">
                  Manage temple crowdfunding platform
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Welcome, {session.user.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'overview', label: '📊 Overview', icon: '📊' },
                  { id: 'campaigns', label: '🏛️ Campaigns', icon: '🏛️' },
                  { id: 'users', label: '👥 Users', icon: '👥' },
                  { id: 'donations', label: '💰 Donations', icon: '💰' },
                  { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
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
                    <div className="p-3 bg-blue-100 rounded-full">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <span className="text-2xl">🏛️</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Raised</p>
                      <p className="text-2xl font-bold text-gray-900">{formatAmount(stats.totalRaised)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Campaigns</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingCampaigns}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">📋 Recent Campaigns</h2>
                  {recentCampaigns.length > 0 ? (
                    <div className="space-y-4">
                      {recentCampaigns.map((campaign) => (
                        <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-orange-600">🏛️</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{campaign.title}</p>
                              <p className="text-sm text-gray-600">{campaign.creator?.name || 'Unknown'}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">{formatAmount(campaign.raisedAmount || 0)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">📝</div>
                      <p className="text-gray-500">No recent campaigns</p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">📊 Platform Analytics</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Campaign Success Rate</span>
                      <span className="font-bold text-lg">
                        {stats.totalCampaigns > 0 
                          ? Math.round((stats.activeCampaigns / stats.totalCampaigns) * 100)
                          : 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Average Campaign Goal</span>
                      <span className="font-bold text-lg">
                        {stats.totalCampaigns > 0 
                          ? formatAmount(stats.totalRaised / stats.totalCampaigns)
                          : formatAmount(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Active Campaigns</span>
                      <span className="font-bold text-lg">{stats.activeCampaigns}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Pending Approval</span>
                      <span className="font-bold text-lg text-yellow-600">{stats.pendingCampaigns}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'campaigns' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">🏛️ Campaign Management</h2>
                <div className="flex space-x-2">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    ✅ Approve All
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                    ❌ Reject All
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Campaign</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Creator</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Raised</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{campaign.title}</p>
                            <p className="text-sm text-gray-600">{campaign.description?.substring(0, 50)}...</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-gray-800">{campaign.creator?.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{campaign.creator?.email || ''}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-gray-800">{formatAmount(campaign.raisedAmount || 0)}</p>
                          <p className="text-sm text-gray-600">Goal: {formatAmount(campaign.goalAmount || 0)}</p>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors">
                              ✅
                            </button>
                            <button className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors">
                              ❌
                            </button>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
                              👁️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">👥 User Management</h2>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">User Management</h3>
                <p className="text-gray-600">User management features coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">💰 Donation Management</h2>
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Donation Tracking</h3>
                <p className="text-gray-600">Donation management features coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">⚙️ Platform Settings</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Platform Configuration</h3>
                  <p className="text-sm text-gray-600">Configure platform-wide settings and preferences</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Payment Settings</h3>
                  <p className="text-sm text-gray-600">Manage payment gateway configurations</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Email Templates</h3>
                  <p className="text-sm text-gray-600">Customize email notifications and templates</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
