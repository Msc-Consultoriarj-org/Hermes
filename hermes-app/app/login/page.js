'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import styles from './login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setMessage(error?.message || 'Email ou senha inválidos.');
      setLoading(false);
    } else {
      setMessage('Login bem-sucedido! Redirecionando...');
      router.push('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login - Sistema Hermes</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className={styles.button}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
