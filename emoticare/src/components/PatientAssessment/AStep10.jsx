import React, { useEffect, useState } from 'react';
import './AStep10.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';
import heartHands from '../../assets/heart-hands.png';
import axios from 'axios';

const AStep10 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer, resetAnswer } = useAssessment(); // ✅ use from context
  const [inputValue, setInputValue] = useState('');
  const tags = answers[9] || [];

 useEffect(() => {
  if (answers[9]?.length > 0) {
    resetAnswer(9); // Reset once only if stale tags exist
  }
}, []);

  const addTag = async () => {
  const trimmed = inputValue.trim();
  if (trimmed && tags.length < 10 && !tags.includes(trimmed)) {
    const updated = [...tags, trimmed];
    saveAnswer(9, updated);
    setInputValue('');

    const user_id = localStorage.getItem("user_id");
    try {
      await axios.post("http://localhost:5000/api/step10", {
        user_id,
        tags: updated
      });
    } catch (err) {
      alert("❌ Failed to save Step 10");
    }
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
      <button className="step10-back-button" onClick={() => navigate('/assessment/step9')}>
        <img src={backArrow} alt="Back" className="step10-back-icon" />
      </button>

      <div className="step10-card">
        <div className="step10-header-row">
          <h3 className="step10-heading">Assessment</h3>
          <span className="step10-count">10 of 14</span>
        </div>

        <h2 className="step10-question">How would you describe yourself?</h2>
        <img src={heartHands} alt="Hands Heart" className="step10-image" />

        <div className="step10-input-box">
          <input
            type="text"
            placeholder="Type a word and press Enter..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={tags.length === 10}
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
            <span className="pill">easy feel sad</span>
            <span className="pill pill-light">pessimistic</span>
          </p>
          <span className="step10-counter">{tags.length}/10</span>
        </div>

        <button
          className="step10-next-button"
          onClick={() => navigate('/assessment/step11')}
          disabled={tags.length === 0}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep10;
