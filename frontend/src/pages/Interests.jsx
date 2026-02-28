import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/interests.css';

const INTERESTS = [
  { id: 'web-dev', name: 'Web Development', icon: 'fa-code' },
  { id: 'data-science', name: 'Data Science', icon: 'fa-database' },
  { id: 'design', name: 'Design', icon: 'fa-paint-brush' },
  { id: 'marketing', name: 'Marketing', icon: 'fa-bullhorn' },
  { id: 'business', name: 'Business', icon: 'fa-briefcase' },
  { id: 'writing', name: 'Writing', icon: 'fa-pen' },
  { id: 'photography', name: 'Photography', icon: 'fa-camera' },
  { id: 'finance', name: 'Finance', icon: 'fa-chart-line' },
  { id: 'health', name: 'Health', icon: 'fa-heart' },
  { id: 'education', name: 'Education', icon: 'fa-graduation-cap' },
  { id: 'engineering', name: 'Engineering', icon: 'fa-cogs' },
  { id: 'music', name: 'Music', icon: 'fa-music' },
];

export default function Interests() {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const toggleInterest = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    localStorage.setItem('userInterests', JSON.stringify(selected));
    navigate('/quiz');
  };

  return (
    <div className="interests-page">
      <HamburgerMenu />
      <div className="interests-container">
        <div className="interests-header">
          <h1>What interests you?</h1>
          <p>Select at least 3 career fields to personalize your experience</p>
        </div>

        <div className="interests-grid">
          {INTERESTS.map((interest) => (
            <div
              key={interest.id}
              className={`interest-card${selected.includes(interest.id) ? ' selected' : ''}`}
              onClick={() => toggleInterest(interest.id)}
            >
              <i className={`fas ${interest.icon}`}></i>
              <span>{interest.name}</span>
            </div>
          ))}
        </div>

        <div className="interests-footer">
          <button
            className="interests-btn"
            disabled={selected.length < 3}
            onClick={handleContinue}
          >
            Continue <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
