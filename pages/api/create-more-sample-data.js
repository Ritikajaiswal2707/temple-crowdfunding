import { useState } from 'react';

export default function CreateMoreTemples() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const createMoreData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-more-sample-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create More Temple Data</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Click the button below to create more realistic temple data:
            <br />• Shri Ganesh Temple (Pune) - Restoration project
            <br />• Hanuman Mandir (Jaipur) - Kitchen upgrade
            <br />• Lakshmi Narayan Temple (Varanasi) - Community hall construction
          </p>
          
          <button
            onClick={createMoreData}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Temple Data...' : 'Create More Temples & Campaigns'}
          </button>
          
          {result && (
            <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <h3 className="font-bold mb-2">
                {result.success ? '✅ Success!' : '❌ Error'}
              </h3>
              <p className="mb-2">{result.message}</p>
              
              {result.success && result.data && (
                <div className="text-sm space-y-2">
                  {result.data.map((item, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-3">
                      <p><strong>🏛️ {item.temple.name}</strong> in {item.temple.city}</p>
                      <p>Deity: {item.temple.deity}</p>
                      <p><strong>Campaign:</strong> {item.campaign.title}</p>
                      <p>Progress: {item.campaign.progress}% (₹{item.campaign.raised.toLocaleString()} / ₹{item.campaign.goal.toLocaleString()})</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
