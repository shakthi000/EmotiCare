import React from 'react';
import './AStep6.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext.jsx';
import backArrow from '../../assets/back-arrow.png';
import profHelp from '../../assets/profhelp.png'; // <-- Add your image here
import axios from 'axios';

const AStep6 = () => {
  const navigate = useNavigate();
  const { answers, saveAnswer } = useAssessment();
  const answer = answers[5]; // index 5 for Q6

  const handleSelect = async (value) => {
  saveAnswer(5, value);
  try {
    const user_id = localStorage.getItem("user_id");
    await axios.post("http://localhost:5000/api/step6", {
      user_id,
      sought_help: value
    });
  } catch (err) {
    alert("❌ Error saving Step 6");
  }
};


  return (
    <div className="step6-container">
      <button className="step6-back-button" onClick={() => navigate('/assessment/step5')}>
        <img src={backArrow} alt="Back" className="step6-back-icon" />
      </button>

      <div className="step6-card">
        <div className="step6-header-row">
          <h3 className="step6-heading">Assessment</h3>
          <span className="step6-count">6 of 14</span>
        </div>

        <h2 className="step6-question">Have you sought professional help before?</h2>

        <img src={profHelp} alt="profhelp" className="step6-illustration" />


        <div className="step6-options">
          <button
            className={`step6-btn ${answer === 'Yes' ? 'selected' : ''}`}
            onClick={() => handleSelect('Yes')}
          >
            Yes
          </button>

          <button
            className={`step6-btn ${answer === 'No' ? 'selected' : ''}`}
            onClick={() => handleSelect('No')}
          >
            No
          </button>
        </div>

        <button
          className="step6-next-button"
          onClick={() => navigate('/assessment/step7')}
          disabled={!answer}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep6;
