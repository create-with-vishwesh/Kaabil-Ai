import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/auth.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/interests');
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <HamburgerMenu />
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p className="premium-subtitle">Sign in to continue your career journey</p>
        </div>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group premium-input">
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="email"
              id="email"
              required
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="input-group premium-input">
            <i className="fas fa-lock input-icon"></i>
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" className="auth-btn premium-btn" disabled={loading}>
            <i className="fas fa-arrow-right"></i> {loading ? 'Signing in...' : 'Continue'}
          </button>
        </form>

        <div className="auth-footer premium-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
}
