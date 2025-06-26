// AStep13.jsx
import React, { useState, useEffect } from 'react';
import './AStep13.css';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../assets/back-arrow.png';
import aiSoundIcon from '../../assets/ai-sound-circle.png';
import { useAssessment } from '../../context/AssessmentContext';

const AStep13 = () => {
  const navigate = useNavigate();
  const { saveAnswer } = useAssessment();
  const [recordedText, setRecordedText] = useState('');
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
        setRecordedText(transcript);
        saveAnswer(12, transcript); // Step 13 = index 12
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech Recognition Error:", event.error);
        setIsRecording(false);
      };
    } else {
      alert('Voice recognition not supported in this browser.');
    }
  }, []);

  const handleStartListening = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  return (
    <div className="step13-container">
      <button className="step13-back-button" onClick={() => navigate('/assessment/step12')}>
        <img src={backArrow} alt="Back" className="step13-back-icon" />
      </button>

      <div className="step13-card">
        <div className="step13-header-row">
          <h3 className="step13-heading">Assessment</h3>
          <span className="step13-count">13 of 14</span>
        </div>

        <h2 className="step13-question">AI Sound Analysis</h2>
        <p className="step13-instruction" style={{color:"#975dbd"}}>Please say the following words below. Don't <br />worry, we don't steal your voice data.</p>

        <img src={aiSoundIcon} alt="AI Listening" className="step13-illustration" />

        <p className="step13-instruction" style={{color:"#975dbd",fontSize:"30px"}}>Hello EMOTICARE AI <br />Therapist, <br />I need your help.</p>

        <button className="step13-next-button" onClick={handleStartListening} disabled={isRecording} style={{marginBottom: "20px"}}>
          {isRecording ? 'Listening...' : 'Start Speaking 🎙'}
        </button>

        {recordedText && <p className="step13-transcript">🗣 {recordedText}</p>}
        <button
          className="step13-next-button"
          onClick={() => navigate('/assessment/step14')}
          disabled={!recordedText}
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default AStep13;
