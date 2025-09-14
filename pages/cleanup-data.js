import { useState } from 'react';

export default function CleanupData() {
  const [debugResult, setDebugResult] = useState(null);
  const [cleanResult, setCleanResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const debugCurrentData = async () => {
    try {
      const response = await fetch('/api/debug-campaigns');
      const data = await response.json();
      setDebugResult(data);
    } catch (error) {
      setDebugResult({ success: false, message: error.message });
    }
  };

  const forceCleanData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/force-clean-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setCleanResult(data);
      
      // Auto-refresh debug data after cleanup
      if (data.success) {
        setTimeout(debugCurrentData, 1000);
      }
    } catch (error) {
      setCleanResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Database Cleanup & Fix</h1>
        
        {/* Debug Current Data */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">1. Check Current Database</h2>
          <button
            onClick={debugCurrentData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Check What's in Database
          </button>
          
          {debugResult && (
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <h3 className="font-bold mb-2">Current Campaigns:</h3>
              {debugResult.success ? (
                <div className="space-y-2">
                  <p>Total: {debugResult.totalCampaigns}</p>
                  {debugResult.campaigns.map((campaign, index) => (
                    <div key={index} className="text-sm border-l-4 border-blue-500 pl-3">
                      <p><strong>{campaign.title}</strong></p>
                      <p>Temple: {campaign.temple}</p>
                      <p>Images: {campaign.images?.length || 0} images</p>
                      <p className="text-xs text-gray-500">Created: {new Date(campaign.createdAt).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-600">{debugResult.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Force Clean */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">2. Clean & Create Fresh Data</h2>
          <div className="bg-red-50 p-4 rounded mb-4">
            <p className="text-red-800 text-sm">
              ⚠️ This will DELETE all existing temples and campaigns and create fresh Hindu temple data with proper images.
            </p>
          </div>
          
          <button
            onClick={forceCleanData}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded disabled:opacity-50"
          >
            {loading ? '🔄 Cleaning & Creating...' : '🧹 Force Clean & Create Hindu Temples'}
          </button>
          
          {cleanResult && (
            <div className={`mt-4 p-4 rounded ${cleanResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <h3 className="font-bold mb-2">
                {cleanResult.success ? '✅ Success!' : '❌ Error'}
              </h3>
              <p>{cleanResult.message}</p>
              
              {cleanResult.success && cleanResult.created && (
                <div className="mt-2 space-y-2">
                  {cleanResult.created.map((item, index) => (
                    <div key={index} className="text-sm">
                      <strong>{item.temple}</strong> - {item.campaign} ({item.progress}%)
                    </div>
                  ))}
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded text-center">
                    <p className="text-blue-700 font-medium mb-2">
                      🎉 Fresh Hindu temple data created! Now check your homepage:
                    </p>
                    <a 
                      href="/" 
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      View Homepage
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}