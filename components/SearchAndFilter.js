import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const SearchAndFilter = ({ 
  onSearch, 
  onFilter, 
  placeholder = "Search campaigns...",
  showFilters = true,
  className = ""
}) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    sortBy: 'newest',
    minAmount: '',
    maxAmount: '',
    location: ''
  })
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Update URL when filters change
  useEffect(() => {
    const query = { ...router.query }
    
    if (searchTerm) query.search = searchTerm
    else delete query.search
    
    if (filters.category) query.category = filters.category
    else delete query.category
    
    if (filters.status) query.status = filters.status
    else delete query.status
    
    if (filters.sortBy && filters.sortBy !== 'newest') query.sort = filters.sortBy
    else delete query.sort
    
    if (filters.minAmount) query.minAmount = filters.minAmount
    else delete query.minAmount
    
    if (filters.maxAmount) query.maxAmount = filters.maxAmount
    else delete query.maxAmount
    
    if (filters.location) query.location = filters.location
    else delete query.location

    router.push({
      pathname: router.pathname,
      query
    }, undefined, { shallow: true })
  }, [searchTerm, filters, router])

  // Initialize filters from URL
  useEffect(() => {
    const { search, category, status, sort, minAmount, maxAmount, location } = router.query
    
    if (search) setSearchTerm(search)
    if (category) setFilters(prev => ({ ...prev, category }))
    if (status) setFilters(prev => ({ ...prev, status }))
    if (sort) setFilters(prev => ({ ...prev, sortBy: sort }))
    if (minAmount) setFilters(prev => ({ ...prev, minAmount }))
    if (maxAmount) setFilters(prev => ({ ...prev, maxAmount }))
    if (location) setFilters(prev => ({ ...prev, location }))
  }, [router.query])

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter?.(newFilters)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      category: '',
      status: '',
      sortBy: 'newest',
      minAmount: '',
      maxAmount: '',
      location: ''
    })
    onSearch?.('')
    onFilter?.({})
  }

  const hasActiveFilters = searchTerm || 
    filters.category || 
    filters.status || 
    filters.sortBy !== 'newest' ||
    filters.minAmount ||
    filters.maxAmount ||
    filters.location

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'renovation', label: 'Renovation' },
    { value: 'construction', label: 'Construction' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'festival', label: 'Festival' },
    { value: 'education', label: 'Education' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'landscaping', label: 'Landscaping' }
  ]

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'urgent', label: 'Urgent (≤7 days)' },
    { value: 'ending_soon', label: 'Ending Soon' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'progress', label: 'Highest Progress' },
    { value: 'goal_high', label: 'Highest Goal' },
    { value: 'goal_low', label: 'Lowest Goal' },
    { value: 'ending_soon', label: 'Ending Soon' }
  ]

  const locations = [
    { value: '', label: 'All Locations' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'pune', label: 'Pune' },
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'jaipur', label: 'Jaipur' },
    { value: 'other', label: 'Other' }
  ]

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              type="submit"
              className="mr-2 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </form>

      {/* Basic Filters */}
      {showFilters && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {sortOptions.map(sort => (
                  <option key={sort.value} value={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
            </button>
            
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Amount Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                    placeholder="0"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Max Amount Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                    placeholder="No limit"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                {/* Quick Filter Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Filters
                  </label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleFilterChange('status', 'urgent')}
                      className="block w-full text-left px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      🔥 Urgent Campaigns
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleFilterChange('minAmount', '100000')
                        handleFilterChange('maxAmount', '500000')
                      }}
                      className="block w-full text-left px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      💰 ₹1L - ₹5L Range
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Active Filters:</span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-1 text-orange-600 hover:text-orange-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.category && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Category: {categories.find(c => c.value === filters.category)?.label}
                      <button
                        onClick={() => handleFilterChange('category', '')}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.status && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Status: {statusOptions.find(s => s.value === filters.status)?.label}
                      <button
                        onClick={() => handleFilterChange('status', '')}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {filters.location && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Location: {locations.find(l => l.value === filters.location)?.label}
                      <button
                        onClick={() => handleFilterChange('location', '')}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter
