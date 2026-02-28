import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from '../components/common/HamburgerMenu';
import './styles/quiz.css';

const DEFAULT_QUESTIONS = [
  {
    question: 'Which work environment do you prefer?',
    options: ['Structured and organized', 'Creative and flexible', 'Fast-paced and dynamic', 'Independent and quiet'],
  },
  {
    question: 'What type of tasks energize you?',
    options: ['Solving complex problems', 'Helping others directly', 'Creating new ideas', 'Working with data'],
  },
  {
    question: 'How do you prefer to solve problems?',
    options: ['Through logical analysis', 'By collaborating with others', 'Using creative approaches', 'Following established procedures'],
  },
  {
    question: 'What motivates you most in work?',
    options: ['Financial rewards', 'Helping others', 'Creative expression', 'Solving complex challenges'],
  },
  {
    question: 'Which skills would you like to develop?',
    options: ['Technical skills', 'Communication skills', 'Leadership skills', 'Creative skills'],
  },
  {
    question: 'How do you handle stress?',
    options: ['Plan and organize', 'Talk to colleagues', 'Take creative breaks', 'Focus on solutions'],
  },
  {
    question: "What's your ideal work schedule?",
    options: ['Fixed 9-5 schedule', 'Flexible hours', 'Project-based deadlines', 'Remote with occasional meetings'],
  },
];

export default function Quiz() {
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  const totalQuestions = questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentIndex];

  const selectOption = (optionIndex) => {
    setSelectedOptions((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem('quizAnswers', JSON.stringify(selectedOptions));
      navigate('/results');
    }
  };

  return (
    <div className="quiz-page">
      <HamburgerMenu />
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>Career Assessment</h1>
          <p>Answer these questions to help us find your ideal career path</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        <div className="question-container">
          <h2 className="question-text">
            Question {currentIndex + 1}/{totalQuestions}: {currentQuestion.question}
          </h2>
          <div className="options-grid">
            {currentQuestion.options.map((option, idx) => (
              <div
                key={idx}
                className={`option-card${selectedOptions[currentIndex] === idx ? ' selected' : ''}`}
                onClick={() => selectOption(idx)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-footer">
          <button className="quiz-btn" onClick={handleNext}>
            {currentIndex < totalQuestions - 1 ? (
              <>Next Question <i className="fas fa-arrow-right"></i></>
            ) : (
              <>See Results <i className="fas fa-check"></i></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
