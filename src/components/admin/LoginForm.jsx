'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const setupToken = new URLSearchParams(window.location.search).get('setup') || '';
      const response = await fetch('/api/cms/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, setupToken }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Sign in failed.');
      window.location.assign('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.');
    } finally {
      setLoading(false);
    }
  }

  const setupMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('setup');

  return (
    <div className="admin-login-shell">
      <form className="admin-login-card" onSubmit={submit}>
        <Image src="/mendy-studios-logo-white.svg" alt="Mendy Studios" width={190} height={70} priority />
        <div>
          <p className="admin-kicker">Back Office</p>
          <h1>{setupMode ? 'Create Super Admin' : 'Website Management'}</h1>
          <p className="admin-muted">{setupMode ? 'Choose the email address and password you want to use for Mendy Studios back-office access. This setup link works once.' : 'Sign in to manage content, images, SEO, enquiries and every editable website detail.'}</p>
        </div>
        <label>
          <span>Email address</span>
          <input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label>
          <span>Password</span>
          <input type="password" minLength={8} autoComplete={setupMode ? 'new-password' : 'current-password'} required value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        {error ? <div className="admin-alert error">{error}</div> : null}
        <button className="admin-primary-button" type="submit" disabled={loading}>{loading ? (setupMode ? 'Creating account…' : 'Signing in…') : (setupMode ? 'Create Super Admin' : 'Sign in')}</button>
        <a className="admin-text-link" href="/">← Return to website</a>
      </form>
    </div>
  );
}
