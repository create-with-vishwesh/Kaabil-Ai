import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

export default function HamburgerMenu() {
  const [active, setActive] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={`hamburger-menu${active ? ' active' : ''}`} ref={menuRef}>
      <div className="menu-icon" onClick={() => setActive(!active)}>
        <i className="fas fa-bars"></i>
      </div>
      <div className="site-title">Career Compass</div>
      <div className="menu-content">
        <div className="user-profile">
          <div className="profile-pic">
            <i className="fas fa-user"></i>
          </div>
          <div className="profile-info">
            <h4>Guest User</h4>
            <p>Complete your profile</p>
          </div>
        </div>
        <div className="progress-steps">
          <h4>Your Progress</h4>
          <div className="step">
            <div className="step-number active">1</div>
            <div className="step-info">
              <p>Profile Setup</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-info">
              <p>Career Quiz</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-info">
              <p>Get Results</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-links">
          <Link to="/advisor"><i className="fas fa-robot"></i> Career Advisor</Link>
          <Link to="/dashboard"><i className="fas fa-chart-line"></i> Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
