import React, { useState } from 'react';

export default function TestImages() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateImages = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/working-images', {
        method: 'POST'
      });
      
      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Fix Images with Working URLs</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <p>Test these image URLs first:</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
          <img src="https://picsum.photos/200/150?random=1" alt="Test 1" style={{ border: '2px solid #ccc' }} />
          <img src="https://picsum.photos/200/150?random=2" alt="Test 2" style={{ border: '2px solid #ccc' }} />
          <img src="https://picsum.photos/200/150?random=3" alt="Test 3" style={{ border: '2px solid #ccc' }} />
        </div>
        <p>If you can see these 3 images above, the service works.</p>
      </div>
      
      <button 
        onClick={updateImages}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Updating...' : 'Update All Campaign Images'}
      </button>
      
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          borderRadius: '5px'
        }}>
          <h3>{result.success ? 'Success!' : 'Error'}</h3>
          <p>{result.message}</p>
          
          {result.success && (
            <a 
              href="/" 
              style={{ 
                display: 'inline-block',
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px'
              }}
            >
              View Homepage
            </a>
          )}
        </div>
      )}
    </div>
  );
}