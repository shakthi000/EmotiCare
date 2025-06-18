import React, { useState } from 'react';
import './AStep11.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';
import sadGirl from '../../assets/sadGirl.png';

const AStep11 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();
  const [inputValue, setInputValue] = useState('');
  const tags = answers[9] || [];

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && tags.length < 10 && !tags.includes(trimmed)) {
      const updated = [...tags, trimmed];
      saveAnswer(9, updated);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    const updated = tags.filter((tag) => tag !== tagToRemove);
    saveAnswer(9, updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="step10-container">
      <button className="step10-back-button" onClick={() => navigate('/assessment/step10')}>
        <img src={backArrow} alt="Back" className="step10-back-icon" />
      </button>

      <div className="step10-card">
        <div className="step10-header-row">
          <h3 className="step10-heading">Assessment</h3>
          <span className="step10-count">11 of 14</span>
        </div>

        <h2 className="step10-question">Do you have other mental health symptoms?</h2>
        <img src={sadGirl} alt="Sad Girl" className="step10-image" />

        <div className="step10-input-box">
          <input
            type="text"
            placeholder="Type a word and press Enter..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={tags.length >= 10}
          />
        </div>

        <div className="step10-tag-container">
          {tags.map((tag, idx) => (
            <div className="step10-tag" key={idx}>
              {tag}
              <span className="remove-tag" onClick={() => removeTag(tag)}>×</span>
            </div>
          ))}
        </div>

        <div className="step10-meta">
          <p className="step10-most-common">
            Most Common:
            <span className="pill">Depressed</span>
            <span className="pill pill-light">Angry</span>
          </p>
          <span className="step10-counter">{tags.length}/10</span>
        </div>

        <button
          className="step10-next-button"
          onClick={() => navigate('/assessment/step12')}
          disabled={tags.length === 0}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep11;
