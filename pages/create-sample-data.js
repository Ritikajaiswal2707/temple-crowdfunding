import { useState } from 'react';

export default function CreateSampleData() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const createSampleData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-sample-data', {
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Create Sample Data</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-6">
            Click the button below to create sample data for testing:
            <br />• Sample Temple Admin User
            <br />• Sample Temple
            <br />• Sample Campaign
          </p>
          
          <button
            onClick={createSampleData}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Sample Data...' : 'Create Sample Data'}
          </button>
          
          {result && (
            <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <h3 className="font-bold mb-2">
                {result.success ? '✅ Success!' : '❌ Error'}
              </h3>
              <p className="mb-2">{result.message}</p>
              
              {result.success && result.data && (
                <div className="text-sm">
                  <p><strong>User:</strong> {result.data.user.name} (ID: {result.data.user.id})</p>
                  <p><strong>Temple:</strong> {result.data.temple.name} (ID: {result.data.temple.id})</p>
                  <p><strong>Campaign:</strong> {result.data.campaign.title} (ID: {result.data.campaign.id})</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}