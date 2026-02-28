import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/auth.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password);
      navigate('/interests');
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <HamburgerMenu />
      <div className="auth-container glass-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join Career Compass to discover your ideal path</p>
        </div>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              id="signup-name"
              required
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="signup-name">Full Name</label>
          </div>

          <div className="input-group">
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="email"
              id="signup-email"
              required
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="signup-email">Email</label>
          </div>

          <div className="input-group">
            <i className="fas fa-lock input-icon"></i>
            <input
              type="password"
              id="signup-password"
              required
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="signup-password">Password</label>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            <i className="fas fa-user-plus"></i> {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
