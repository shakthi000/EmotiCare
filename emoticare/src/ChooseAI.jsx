import React from 'react';
import './ChooseAI.css';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from './context/AssessmentContext'; // 👈 Import the context
import backArrow from './assets/back-arrow.png';

import speechImg1 from './assets/ai-speech-1.png';
import speechImg2 from './assets/ai-speech-2.png';
import textImg1 from './assets/ai-text-1.png';
import textImg2 from './assets/ai-text-2.png';

const options = [
  {
    label: 'You:Speech\nAI:Speech',
    img: speechImg1,
    mode: 'speech-speech',
    route: '/chat/ai1',
  },
  {
    label: 'You:Speech\nAI:Text',
    img: speechImg2,
    mode: 'speech-text',
    route: '/chat/ai2',
  },
  {
    label: 'You:Text\nAI:Text',
    img: textImg1,
    mode: 'text-text',
    route: '/chat/ai3',
  },
  {
    label: 'You:Text\nAI:Speech',
    img: textImg2,
    mode: 'text-speech',
    route: '/chat/ai4',
  },
  {
    label: 'You:Text\nTherapist:Text',
    img: speechImg1,
    mode: 'text-therapist',
    route: '/chat/ai5',
  }
];

const ChooseAI = () => {
  const navigate = useNavigate();
  const { setAiMode } = useAssessment(); // 👈 Use the context to save AI mode

  const handleSelect = (option) => {
    setAiMode(option.mode); // ✅ Save the selected interaction mode
    navigate(option.route); // or wherever the chat screen starts
  };

  return (
    <div className="chooseai-container">
      <button className="chooseai-back-button" onClick={() => navigate('/dashboard/patient')}>
        <img src={backArrow} alt="Back" className="chooseai-back-icon" />
      </button>

      <div className="chooseai-header">
        <h3 className="chooseai-title" style={{fontSize:"18px"}}>AI Therapist Chat</h3>
        <span className="network-status">Network OK</span>
      </div>

      <h2 className="chooseai-question" style={{fontSize:"30px"}}>How would you like to interact with the AI?</h2>

      <div className="chooseai-options">
        {options.map((opt, index) => (
          <button key={index} className="chooseai-card" onClick={() => handleSelect(opt)}>
            <div className="chooseai-label" style={{fontSize:"20px"}}>
              {opt.label.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
            <img src={opt.img} alt="Option" className="chooseai-img" style={{height:"100%",width:"200px"}} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseAI;
