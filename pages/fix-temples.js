import { useState } from 'react';

export default function FixTemples() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fixTempleData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-proper-temples', {
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
        <h1 className="text-3xl font-bold text-center mb-8">Fix Temple Images</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">
              This will replace the current data with authentic Hindu temple campaigns:
            </p>
            <div className="text-left bg-orange-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-orange-800 mb-2">Will Create:</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>🏛️ <strong>Shri Ganesh Mandir</strong> (Mumbai) - Restoration Project</li>
                <li>🏛️ <strong>Hanuman Ji Mandir</strong> (Jaipur) - Kitchen Modernization</li>
                <li>🏛️ <strong>Lakshmi Narayan Temple</strong> (Varanasi) - Community Hall Construction</li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={fixTempleData}
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '🔄 Creating Authentic Temple Data...' : '🏛️ Replace with Proper Hindu Temples'}
          </button>
          
          {result && (
            <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <h3 className="font-bold mb-2">
                {result.success ? '✅ Success!' : '❌ Error'}
              </h3>
              <p className="mb-3">{result.message}</p>
              
              {result.success && result.data && (
                <>
                  <div className="text-sm space-y-3">
                    {result.data.map((item, index) => (
                      <div key={index} className="border-l-4 border-orange-500 pl-3 bg-white p-3 rounded">
                        <p className="font-bold">🏛️ {item.temple.name}</p>
                        <p className="text-xs text-gray-600">📍 {item.temple.city} • {item.temple.deity}</p>
                        <p className="text-sm mt-1"><strong>Campaign:</strong> {item.campaign.title}</p>
                        <p className="text-xs">
                          📊 {item.campaign.progress}% • 
                          💰 ₹{item.campaign.raised.toLocaleString()} / ₹{item.campaign.goal.toLocaleString()} • 
                          👥 {item.campaign.donors} donors
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded text-center">
                    <p className="text-sm text-blue-700 font-medium">
                      🎉 Now visit your homepage to see authentic Hindu temple campaigns!
                    </p>
                    <a 
                      href="/" 
                      className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      View Homepage
                    </a>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
