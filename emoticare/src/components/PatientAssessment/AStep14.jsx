// AStep14.jsx
import React, { useState, useEffect } from 'react';
import './AStep14.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '../../context/AssessmentContext';
import backArrow from '../../assets/back-arrow.png';

const AStep14 = () => {
  const navigate = useNavigate();
  const { saveAnswer } = useAssessment();
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  let recognition;

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev + ' ' + transcript).trim());
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsRecording(false);
      };
    }
  }, []);

  const handleVoiceInput = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const handleSaveAndNext = () => {
    saveAnswer(13, input); // Step 14 = index 13
    navigate('/dashboard/patient');
  };

  return (
    <div className="step14-container">
      <button className="step14-back-button" onClick={() => navigate('/assessment/step13')}>
        <img src={backArrow} alt="Back" className="step14-back-icon" />
      </button>

      <div className="step14-card">
        <div className="step14-header-row">
          <h3 className="step14-heading">Assessment</h3>
          <span className="step14-count">14 of 14</span>
        </div>

        <h2 className="step14-question">Expression Analysis</h2>
        <p className="step14-description">
          Feel free to tell us anything about you.<br />
          EMOTICARE AI Therapist is listening 👂
        </p>

        <textarea
          className="step14-textarea"
          placeholder="Type your thoughts"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={250}
        />
        <div className="step14-charcount">{input.length}/250</div>

        <button className="step14-voice-button" onClick={handleVoiceInput} disabled={isRecording}>
          {isRecording ? 'Listening...' : '🎙 Use Voice Instead'}
        </button>

        <button
          className="step14-next-button"
          onClick={handleSaveAndNext}
          disabled={input.trim() === ''}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep14;
