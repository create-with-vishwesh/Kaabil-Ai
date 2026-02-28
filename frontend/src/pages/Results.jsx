import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/results.css';

const CAREER_RESULTS = [
  {
    title: 'Software Developer',
    description: 'Design, develop, and test software applications.',
    match: 92,
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data to uncover insights.',
    match: 85,
  },
  {
    title: 'UX Designer',
    description: 'Create intuitive digital experiences for users.',
    match: 78,
  },
];

export default function Results() {
  const navigate = useNavigate();

  return (
    <div className="results-page">
      <HamburgerMenu />
      <div className="results-container">
        <div className="results-header">
          <h1>Your Career Matches</h1>
          <p>Based on your interests and assessment</p>
        </div>

        <div className="career-results">
          {CAREER_RESULTS.map((career, idx) => (
            <div key={idx} className="career-card">
              <h3 className="career-title">{career.title}</h3>
              <p className="career-description">{career.description}</p>
              <span className="match-percentage">{career.match}% Match</span>
            </div>
          ))}
        </div>

        <div className="results-footer">
          <button className="results-btn" onClick={() => navigate('/profile')}>
            <i className="fas fa-user"></i> Complete Your Profile
          </button>
        </div>

        <div className="resume-tips">
          <h2>Resume Suggestions</h2>
          <div className="tips-container">
            <div className="tip-card">
              <i className="fas fa-file-alt"></i>
              <h3>Highlight Relevant Skills</h3>
              <p>Emphasize the skills that match your career recommendations.</p>
            </div>
            <div className="tip-card">
              <i className="fas fa-bullseye"></i>
              <h3>Quantify Achievements</h3>
              <p>Use numbers to demonstrate your impact in previous roles.</p>
            </div>
            <div className="tip-card">
              <i className="fas fa-pen-fancy"></i>
              <h3>Tailor Your Resume</h3>
              <p>Customize your resume for each job application.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
