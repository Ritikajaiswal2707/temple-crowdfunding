import ProgressRing from './ProgressRing'

// Supports two usages:
// 1) <CampaignCard campaign={campaign} />
// 2) Legacy: pass individual props
const CampaignCard = ({ 
  campaign,
  id,
  title, 
  location, 
  description, 
  raised, 
  goal, 
  percentage, 
  donors, 
  status,
  icon,
  color = 'orange',
  gradientFrom,
  gradientTo
}) => {
  const data = campaign || {}
  const resolvedTitle = data.title || title
  const resolvedDescription = data.description || description
  const resolvedRaised = (data.raisedAmount !== undefined ? data.raisedAmount : raised) || 0
  const resolvedGoal = (data.goalAmount !== undefined ? data.goalAmount : goal) || 0
  const resolvedPercentage = (data.progress !== undefined ? data.progress : percentage) || (resolvedGoal ? Math.round((resolvedRaised / resolvedGoal) * 100) : 0)
  const resolvedDonors = (data.donorCount !== undefined ? data.donorCount : donors) || 0
  const resolvedStatus = data.status || status || 'active'
  const resolvedLocation = (data.temple && (data.temple.location?.city || data.temple.name)) || location || ''
  const resolvedImage = Array.isArray(data.images) && data.images.length > 0 ? data.images[0] : null

  const formatAmount = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(0)}K`
    }
    return `₹${amount.toLocaleString()}`
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      urgent: 'bg-red-500 text-white',
      new: 'bg-yellow-500 text-white',
      completed: 'bg-green-500 text-white',
      active: 'bg-blue-500 text-white'
    }
    
    const textMap = {
      urgent: 'Urgent',
      new: 'New',
      completed: `${percentage}% Complete`,
      active: 'Active'
    }

    return {
      className: statusMap[status] || statusMap.active,
      text: textMap[status] || textMap.active
    }
  }

  const getButtonColor = (color) => {
    const colorMap = {
      orange: 'btn-primary',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
      blue: 'bg-blue-500 hover:bg-blue-600'
    }
    return colorMap[color] || 'btn-primary'
  }

  const getBorderColor = (color) => {
    const colorMap = {
      orange: 'border-orange-500 text-orange-500 hover:bg-orange-50',
      green: 'border-green-500 text-green-500 hover:bg-green-50',
      purple: 'border-purple-500 text-purple-500 hover:bg-purple-50',
      blue: 'border-blue-500 text-blue-500 hover:bg-blue-50'
    }
    return colorMap[color] || colorMap.orange
  }

  const statusBadge = getStatusBadge(resolvedStatus)
  const fallbackTemple = 'https://source.unsplash.com/800x600/?temple,india'

  return (
    <div className="temple-card rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-500 campaign-card opacity-0">
      {/* Temple Image */}
      <div className={`relative h-56 md:h-60 lg:h-64 overflow-hidden rounded-t-3xl`}>
        <img
          src={resolvedImage || fallbackTemple}
          alt={resolvedTitle}
          className="w-full h-full object-cover object-center"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = fallbackTemple
          }}
        />
        <div className={`absolute top-4 right-4 ${statusBadge.className} px-3 py-1 rounded-full text-sm font-semibold`}>
          {statusBadge.text}
        </div>
      </div>
      
      <div className="p-8">
        {/* Location */}
        <div className="flex items-center mb-3">
          <span className="text-orange-500 text-xl">📍</span>
          <span className="text-gray-500 ml-2 font-medium">{resolvedLocation}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{resolvedTitle}</h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-3">{resolvedDescription}</p>
        
        {/* Progress Section */}
        <div className="flex items-center justify-between mb-6">
          <ProgressRing percentage={resolvedPercentage} color={color} />
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">
              {formatAmount(resolvedRaised)}
            </div>
            <div className="text-gray-500 text-sm">
              of {formatAmount(resolvedGoal)} goal
            </div>
            <div className={`text-sm font-semibold ${color === 'orange' ? 'text-orange-500' : `text-${color}-500`}`}>
              {resolvedDonors.toLocaleString()} donors
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <button className={`w-full ${getButtonColor(color)} text-white py-3 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300`}>
            🙏 Donate Now
          </button>
          <button className={`w-full border-2 ${getBorderColor(color)} py-3 rounded-xl font-semibold transition-all`}>
            📖 Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard