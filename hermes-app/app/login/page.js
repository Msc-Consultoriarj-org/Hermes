'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage({ text: 'E-mail ou senha inválidos.', type: 'error' });
    } else {
      setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
      // TODO: Redirect to dashboard
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto', padding: '24px', border: '1px solid #eaeaea', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Login - Sistema Hermes</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#005A92',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
      {message.text && (
        <p style={{ marginTop: '24px', color: message.type === 'success' ? '#28a745' : '#dc3545' }}>
          {message.text}
        </p>
      )}
    </div>
  );
}
