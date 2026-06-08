import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Später: Login API Call
    console.log("Login versuch:", username);
    alert("Backend Integration folgt in Block 02/03");
  };

  const toggleMode = () => setIsRegistering(!isRegistering);

  return (
    <div className="glass-card">
      <h1>SecurePass</h1>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
        {isRegistering ? 'Neues Konto erstellen' : 'Sicher anmelden'}
      </p>

      <form onSubmit={handleLogin}>
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
