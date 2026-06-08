import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Check if session already exists
  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    const savedUser = sessionStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const endpoint = isRegistering ? 'register' : 'login';
    const url = `http://localhost:5001/api/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: masterPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten.');
        return;
      }

      if (isRegistering) {
        setMessage('Registrierung erfolgreich! Bitte logge dich ein.');
        setIsRegistering(false);
        setMasterPassword('');
      } else {
        setToken(data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (err) {
      setError('Verbindung zum Server fehlgeschlagen. Läuft das Backend auf Port 5001?');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    setUsername('');
    setMasterPassword('');
    setError('');
    setMessage('');
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setMessage('');
  };

  if (isLoggedIn && user) {
    return (
      <div className="glass-card dashboard">
        <h1>SecurePass</h1>
        <div className="dashboard-header">
          <div className="user-avatar">
            {user.username.substring(0, 2).toUpperCase()}
          </div>
          <h2>Willkommen, {user.username}!</h2>
          <span className="session-badge">Session Aktiv</span>
        </div>

        <div className="dashboard-content">
          <div className="info-box">
            <p><strong>Dein JWT-Token:</strong></p>
            <div className="token-display">
              <code>{token}</code>
            </div>
            <p className="hint">Dieses Token wird zur Authentifizierung zukünftiger API-Anfragen verwendet.</p>
          </div>

          <div className="placeholder-box">
            <div className="placeholder-icon">🔒</div>
            <h3>Passwort-Einträge</h3>
            <p>Die CRUD-Verwaltung für deine Passwörter folgt in Block 03.</p>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Abmelden
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card">
      <h1>SecurePass</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        {isRegistering ? 'Neues Konto erstellen' : 'Sicher anmelden'}
      </p>

      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Benutzername</label>
          <input
            id="username"
            type="text"
            placeholder="z.B. marvin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="master">Master-Passwort</label>
          <input
            id="master"
            type="password"
            placeholder="••••••••••••"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {isRegistering ? 'Registrieren' : 'Anmelden'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>
          {isRegistering ? 'Bereits ein Konto?' : 'Noch kein Konto?'}
        </span>{' '}
        <button
          onClick={toggleMode}
          style={{
            display: 'inline',
            background: 'none',
            border: 'none',
            color: 'var(--accent)',
            padding: 0,
            width: 'auto',
            margin: 0,
            cursor: 'pointer',
            fontSize: 'inherit'
          }}
        >
          {isRegistering ? 'Jetzt einloggen' : 'Hier registrieren'}
        </button>
      </div>
    </div>
  );
}

export default App;
