import { useState, useEffect, createContext, useContext } from 'react'

// Notification Context
const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info', // success, error, warning, info
      title: '',
      message: '',
      duration: 5000,
      ...notification
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, newNotification.duration)

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Predefined notification types
  const notify = {
    success: (title, message, options = {}) => 
      addNotification({ type: 'success', title, message, ...options }),
    
    error: (title, message, options = {}) => 
      addNotification({ type: 'error', title, message, ...options }),
    
    warning: (title, message, options = {}) => 
      addNotification({ type: 'warning', title, message, ...options }),
    
    info: (title, message, options = {}) => 
      addNotification({ type: 'info', title, message, ...options })
  }

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    notify
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

// Notification Container Component
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

// Individual Notification Component
const NotificationItem = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const handleRemove = () => {
    setIsLeaving(true)
    setTimeout(onRemove, 300) // Wait for exit animation
  }

  const getNotificationStyles = () => {
    const baseStyles = "relative p-4 rounded-lg shadow-lg border-l-4 transform transition-all duration-300 ease-in-out"
    
    if (isLeaving) {
      return `${baseStyles} translate-x-full opacity-0`
    }
    
    if (isVisible) {
      return `${baseStyles} translate-x-0 opacity-100`
    }
    
    return `${baseStyles} translate-x-full opacity-0`
  }

  const getTypeStyles = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-500 text-blue-800'
    }
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'info':
      default:
        return 'ℹ️'
    }
  }

  return (
    <div className={`${getNotificationStyles()} ${getTypeStyles()}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          <span className="text-lg">{getIcon()}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          {notification.title && (
            <h4 className="text-sm font-medium mb-1">
              {notification.title}
            </h4>
          )}
          <p className="text-sm opacity-90">
            {notification.message}
          </p>
        </div>
        
        <div className="flex-shrink-0 ml-3">
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-10 rounded-b-lg overflow-hidden">
        <div 
          className="h-full bg-current opacity-30 transition-all ease-linear"
          style={{ 
            width: '100%',
            animation: `shrink ${notification.duration}ms linear forwards`
          }}
        />
      </div>
    </div>
  )
}

// Hook for common notification patterns
export const useNotificationHelpers = () => {
  const { notify } = useNotifications()

  return {
    // Campaign notifications
    campaignCreated: (title) => 
      notify.success('Campaign Created!', `"${title}" has been created successfully.`),
    
    campaignUpdated: (title) => 
      notify.success('Campaign Updated', `"${title}" has been updated successfully.`),
    
    campaignDeleted: (title) => 
      notify.info('Campaign Deleted', `"${title}" has been deleted.`),
    
    // Donation notifications
    donationSuccess: (amount, campaignTitle) => 
      notify.success('Donation Successful!', `Thank you for donating ₹${amount} to "${campaignTitle}".`),
    
    donationFailed: (error) => 
      notify.error('Donation Failed', error || 'Your donation could not be processed. Please try again.'),
    
    // User notifications
    loginSuccess: (name) => 
      notify.success('Welcome Back!', `Hello ${name}, you've been logged in successfully.`),
    
    logoutSuccess: () => 
      notify.info('Logged Out', 'You have been logged out successfully.'),
    
    // Error notifications
    networkError: () => 
      notify.error('Network Error', 'Please check your internet connection and try again.'),
    
    validationError: (message) => 
      notify.error('Validation Error', message),
    
    // General notifications
    saveSuccess: (item) => 
      notify.success('Saved!', `${item} has been saved successfully.`),
    
    deleteConfirm: (item, onConfirm) => 
      notify.warning('Confirm Delete', `Are you sure you want to delete ${item}?`, {
        duration: 0, // Don't auto-remove
        actions: [
          { label: 'Delete', onClick: onConfirm, style: 'bg-red-500 text-white' },
          { label: 'Cancel', onClick: () => {} }
        ]
      })
  }
}

// CSS for progress bar animation
const progressBarStyles = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`

// Add styles to document head
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = progressBarStyles
  document.head.appendChild(style)
}

export default NotificationProvider
