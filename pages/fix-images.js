import React, { useState } from 'react';

export default function FixTempleImages() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFixImages = async () => {
    setLoading(true);
    setResult('Updating images...');
    
    try {
      const response = await fetch('/api/fix-temple-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignTitle: 'Ganesha Temple Restoration',
          newImages: [
            'https://images.unsplash.com/photo-1549046041-e5303bc3b62d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1575406208080-a0c85c10c0d0?w=800&h=600&fit=crop'
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setResult('✅ Images updated successfully!');
      } else {
        setResult('❌ Failed to update images');
      }
      
    } catch (error) {
      setResult('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Fix Temple Images</h1>
      <p>Click the button to update temple images with better positioning.</p>
      
      <button 
        onClick={handleFixImages}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#ff6b35',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Fixing...' : 'Fix Temple Images'}
      </button>
      
      {result && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          {result}
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <a href="/" style={{ color: '#ff6b35', textDecoration: 'none', fontSize: '18px' }}>
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
}