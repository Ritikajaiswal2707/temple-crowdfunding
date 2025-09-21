import React, { useState } from 'react';

export default function SimpleFix() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const clearImages = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/simple-fix', {
        method: 'POST'
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
    <div style={{ 
      padding: '50px', 
      textAlign: 'center', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Simple Fix - Remove All Images</h1>
      <p>This will remove all broken external images and use CSS gradient backgrounds instead. Clean and guaranteed to work.</p>
      
      <button 
        onClick={clearImages}
        disabled={loading}
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '30px'
        }}
      >
        {loading ? 'Clearing Images...' : 'Clear All Images - Use CSS Backgrounds'}
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
          <p>{result.message}</p>
          
          {result.success && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p>Your homepage will now show clean gradient backgrounds instead of broken images.</p>
              <a 
                href="/" 
                style={{ 
                  display: 'inline-block',
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px'
                }}
              >
                View Clean Homepage
              </a>
            </div>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '30px', fontSize: '14px', color: '#666' }}>
        <p>This approach eliminates all external image dependencies and gives you a clean, professional look using only CSS.</p>
      </div>
    </div>
  );
}