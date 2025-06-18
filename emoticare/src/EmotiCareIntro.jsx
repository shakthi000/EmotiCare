import React, { useState } from 'react';
import './EmotiCareIntro.css';
import { useNavigate } from 'react-router-dom';

import step1 from './assets/step1.png';
import step2 from './assets/step2.png';
import step3 from './assets/step3.png';

const EmotiCareIntro = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/signinas');
    }
  };

  const stepData = [
    {
      number: 'Step One',
      image: step1,
      text: 'Personalize Your Mental Health State With AI'
    },
    {
      number: 'Step Two',
      image: step2,
      text: 'Intelligent Mood Tracking & AI Emotion Insights'
    },
    {
      number: 'Step Three',
      image: step3,
      text: 'Mindful Resources That Makes You Happy'
    }
  ];

  const { number, image, text } = stepData[currentStep - 1];

  return (
    <div
      className="intro-container"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="overlay">

        <div key={currentStep} className="step-content step-transition">
          <h2 className="step-number">{number}</h2>
          <h1 className="step-title">{text}</h1>
        </div>

        <div className="button-row">
          <button className="circle-button" onClick={nextStep}>
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmotiCareIntro;
