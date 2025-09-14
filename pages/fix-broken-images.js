import React, { useState } from 'react';

export default function FixBrokenImages() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const fixImages = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/fix-broken-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      setResult(data);
      
    } catch (error) {
      setResult({
        success: false,
        message: 'Error: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Fix Broken Temple Images</h1>
      <p>The current image URLs are returning 404 errors. Click below to update all campaigns with working temple images.</p>
      
      <button 
        onClick={fixImages}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '30px'
        }}
      >
        {loading ? 'Fixing Broken URLs...' : 'Fix All Broken Image URLs'}
      </button>
      
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: result.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
          borderRadius: '5px',
          textAlign: 'left'
        }}>
          <h3>{result.success ? 'Success!' : 'Error'}</h3>
          <p><strong>{result.message}</strong></p>
          
          {result.success && result.updates && (
            <div style={{ marginTop: '15px' }}>
              <h4>Updated Campaigns:</h4>
              {result.updates.map((update, index) => (
                <div key={index} style={{ 
                  marginBottom: '10px', 
                  padding: '8px', 
                  backgroundColor: 'white', 
                  borderRadius: '3px' 
                }}>
                  <strong>{update.title}</strong><br />
                  <small>Temple: {update.temple}</small><br />
                  <small style={{ color: '#28a745' }}>Status: Images updated with working URLs</small>
                </div>
              ))}
            </div>
          )}
          
          {result.success && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a 
                href="/" 
                style={{ 
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  margin: '5px'
                }}
              >
                View Homepage
              </a>
            </div>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <p style={{ fontSize: '14px', color: '#666' }}>
          Test these reliable placeholder URLs:<br />
          <a href="https://via.placeholder.com/800x600/FF6B35/FFFFFF?text=Ganesha+Temple+Restoration" target="_blank">Ganesha Temple Placeholder</a><br />
          <a href="https://via.placeholder.com/800x600/E53935/FFFFFF?text=Hanuman+Temple+Kitchen" target="_blank">Hanuman Temple Placeholder</a><br />
          <a href="https://via.placeholder.com/800x600/43A047/FFFFFF?text=Prayer+Hall+Construction" target="_blank">Prayer Hall Placeholder</a>
        </p>
      </div>
    </div>
  );
}