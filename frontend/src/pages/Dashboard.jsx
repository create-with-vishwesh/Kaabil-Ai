import { Link } from 'react-router-dom';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/dashboard.css';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <HamburgerMenu />

      {/* Header */}
      <div className="dashboard-header">
        <h1><i className="fas fa-chart-line"></i> Your Career Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Career Match</h3>
            <div className="stat-value" style={{ color: '#4ade80' }}>85%</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '85%', background: 'linear-gradient(90deg, #4ade80 0%, #22d3ee 100%)' }}></div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Profile Completion</h3>
            <div className="stat-value" style={{ color: '#60a5fa' }}>60%</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '60%', background: 'linear-gradient(90deg, #60a5fa 0%, #818cf8 100%)' }}></div>
            </div>
          </div>
          <div className="stat-card">
            <h3>Skills Developed</h3>
            <div className="stat-value" style={{ color: '#f472b6' }}>7/12</div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '58%', background: 'linear-gradient(90deg, #f472b6 0%, #f87171 100%)' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        {/* Chart placeholder */}
        <div className="chart-container">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem', color: '#f3f4f6' }}>
            Career Progress
          </h2>
          <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
            <p><i className="fas fa-chart-area" style={{ marginRight: '0.5rem' }}></i>Chart will render here</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="achievements-section">
          <h2><i className="fas fa-trophy" style={{ marginRight: '0.5rem', color: '#fbbf24' }}></i> Your Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card completed">
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#4ade80', marginBottom: '1rem' }}></i>
              <h4>Profile Starter</h4>
              <p>Complete basic profile</p>
            </div>
            <div className="achievement-card completed">
              <i className="fas fa-check-circle" style={{ fontSize: '2rem', color: '#4ade80', marginBottom: '1rem' }}></i>
              <h4>Career Explorer</h4>
              <p>Take the career quiz</p>
            </div>
            <div className="achievement-card locked">
              <i className="fas fa-lock" style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '1rem' }}></i>
              <h4>Skill Master</h4>
              <p>Develop 5 skills</p>
            </div>
            <div className="achievement-card locked">
              <i className="fas fa-lock" style={{ fontSize: '2rem', color: '#9ca3af', marginBottom: '1rem' }}></i>
              <h4>Career Champion</h4>
              <p>Reach 90% match</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="recommendations-section">
          <h2><i className="fas fa-lightbulb" style={{ marginRight: '0.5rem', color: '#fbbf24' }}></i> Recommendations</h2>
          <div className="recommendation-card">
            <h3>Complete your profile</h3>
            <p>Add more details to get better career matches</p>
            <Link to="/profile" className="cta-btn primary">Go to Profile</Link>
          </div>
          <div className="recommendation-card">
            <h3>Take skills assessment</h3>
            <p>Identify your strongest skills</p>
            <Link to="/quiz" className="cta-btn secondary">Start Assessment</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
