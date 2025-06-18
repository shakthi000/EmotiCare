import React from 'react';
import './AStep7.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';

const AStep7 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();

  const answer = answers[6]; // Index 6 = Step 7

  const handleSelect = (value) => {
    saveAnswer(6, value);
  };

  return (
    <div className="step7-container">
      <button className="step7-back-button" onClick={() => navigate('/assessment/step6')}>
        <img src={backArrow} alt="Back" className="step7-back-icon" />
      </button>

      <div className="step7-card">
        <div className="step7-header-row">
          <h3 className="step7-heading">Assessment</h3>
          <span className="step7-count">7 of 14</span>
        </div>

        <h2 className="step7-question">
          Are you experiencing any <br /> physical distress?
        </h2>

        <div className="step7-options">
          <button
            className={`step7-option ${answer === 'Yes' ? 'selected' : ''}`}
            onClick={() => handleSelect('Yes')}
          >
            <div className="step7-icon-circle" style={{padding:"0 0 0 5px",width:"20px",borderRadius:"50%",border:"1px solid rgb(204, 202, 207)",color:"#975dbd"}}>✔</div>
            <div className="step7-option-content">
              <strong>Yes, one or multiple</strong>
              <span className="step7-subtext" style={{color:"#975dbd"}}>
                I'm experiencing physical pain in different places on my body
              </span>
            </div>
          </button>

          <button
            className={`step7-option ${answer === 'No' ? 'selected' : ''}`}
            onClick={() => handleSelect('No')}
          >
            <div className="step7-icon-circle" style={{padding:"0 0 0 5px",width:"20px",borderRadius:"50%",border:"1px solid rgb(204, 202, 207)",color:"#975dbd"}}>✖</div>
            <div className="step7-option-content">
              <strong>No Physical Pain at All</strong>
              <span className="step7-subtext" style={{color:"#975dbd"}}>
                I'm not experiencing any physical pain in my body at all 🙂
              </span>
            </div>
          </button>
        </div>

        <button
          className="step7-next-button"
          onClick={() => navigate('/assessment/step8')}
          disabled={!answer}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep7;
