import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/profile.css';

export default function Profile() {
  const { user } = useAuth();

  const [fullname, setFullname] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [degree, setDegree] = useState('');
  const [field, setField] = useState('');
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Profile saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="profile-page">
      <HamburgerMenu />

      <div className="profile-hero">
        <h1 className="hero-title">Your Professional Profile</h1>
        <p className="hero-subtitle">Complete your information to unlock personalized career recommendations</p>
      </div>

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-heading">
            <h1>Complete Your Profile</h1>
            <div className="profile-progress">
              <span>Profile Completion: 40%</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
          <p>Help us personalize your career recommendations</p>
        </div>

        {message && (
          <p style={{ color: '#4ade80', textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>{message}</p>
        )}

        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2><i className="fas fa-user"></i> Basic Information</h2>
            <div className="input-group">
              <input type="text" id="fullname" required placeholder=" " value={fullname} onChange={(e) => setFullname(e.target.value)} />
              <label htmlFor="fullname">Full Name</label>
            </div>
            <div className="input-group">
              <input type="email" id="email" required placeholder=" " value={email} onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Email Address</label>
            </div>
          </div>

          <div className="form-section">
            <h2><i className="fas fa-graduation-cap"></i> Education</h2>
            <div className="input-group">
              <input type="text" id="degree" required placeholder=" " value={degree} onChange={(e) => setDegree(e.target.value)} />
              <label htmlFor="degree">Highest Degree</label>
            </div>
            <div className="input-group">
              <input type="text" id="field" required placeholder=" " value={field} onChange={(e) => setField(e.target.value)} />
              <label htmlFor="field">Field of Study</label>
            </div>
          </div>

          <div className="form-section">
            <h2><i className="fas fa-briefcase"></i> Experience</h2>
            <div className="input-group">
              <input type="number" id="experience" required placeholder=" " value={experience} onChange={(e) => setExperience(e.target.value)} />
              <label htmlFor="experience">Years of Experience</label>
            </div>
            <div className="input-group">
              <textarea id="skills" required placeholder=" " value={skills} onChange={(e) => setSkills(e.target.value)}></textarea>
              <label htmlFor="skills">Key Skills</label>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="profile-btn">
              Save Profile <i className="fas fa-save"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
