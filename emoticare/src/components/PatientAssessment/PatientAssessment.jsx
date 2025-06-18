import React, { useState } from 'react';
import AssessmentStep1 from './AStep1';
import AssessmentStep2 from './AStep2';

const steps = {
  1: AssessmentStep1,
  2: AssessmentStep2
};

const TOTAL_STEPS = 14;

const PatientAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const saveAnswer = (step, value) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  };

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const StepComponent = steps[currentStep];

  return (
    <div className="assessment-container">
      <StepComponent
        step={currentStep}
        answer={answers[currentStep]}
        onSave={(value) => saveAnswer(currentStep, value)}
        onNext={goNext}
        onBack={goBack}
      />
    </div>
  );
};

export default PatientAssessment;
