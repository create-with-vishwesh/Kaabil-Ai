import { Link } from 'react-router-dom';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/landing.css';

export default function Landing() {
  return (
    <div className="landing-page">
      <HamburgerMenu />
      <div className="content-wrapper">
        <div className="text-content">
          <h1>Discover Your Perfect Career Path</h1>
          <div className="premium-image-container">
            <img src="/Photo.png" alt="Premium Career Guidance" className="premium-image" />
          </div>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-btn primary">
              <i className="fas fa-rocket"></i> Get Started
            </Link>
            <Link to="/login" className="cta-btn secondary">
              <i className="fas fa-sign-in-alt"></i> I Have an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
