import React from 'react';
import './AStep5.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext.jsx';
import backArrow from '../../assets/back-arrow.png';

const moods = [
  { emoji: '😫', label: 'Very Sad' },
  { emoji: '😔', label: 'Down' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Okay' },
  { emoji: '😄', label: 'Great' }
];

const AStep5 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();
  const selectedMood = answers[4];

  const handleSelect = (mood) => {
    saveAnswer(4, mood.label);
  };

  return (
    <div className="step5-container">
      <button className="step5-back-button" onClick={() => navigate('/assessment/step4')}>
        <img src={backArrow} alt="Back" className="step5-back-icon" />
      </button>

      <div className="step5-card">
        <div className="step5-header-row">
          <h3 className="step5-heading">Assessment</h3>
          <span className="step5-count">5 of 14</span>
        </div>

        <h2 className="step5-question">How would you describe your mood?</h2>

        {selectedMood && <p className="step5-selected-label">I feel {selectedMood}.</p>}

        <div className="step5-emoji-display">
          {selectedMood && (
            <span className="big-emoji">
              {moods.find(m => m.label === selectedMood)?.emoji}
            </span>
          )}
        </div>

        <div className="step5-arc">
          {moods.map((mood, index) => (
            <button
              key={index}
              className={`arc-emoji ${selectedMood === mood.label ? 'selected' : ''}`}
              onClick={() => handleSelect(mood)}
            >
              {mood.emoji}
            </button>
          ))}
        </div>

        <button
          className="step5-next-button"
          onClick={() => navigate('/assessment/step6')}
          disabled={!selectedMood}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep5;
