import React, { createContext, useContext, useState } from 'react';

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const [answers, setAnswers] = useState(Array(14).fill(null));
  const [aiMode, setAiMode] = useState(null); // 👈 NEW: to store interaction mode

  const saveAnswer = (stepIndex, value) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[stepIndex] = value;
      return updated;
    });
  };

  const resetAnswers = () => setAnswers(Array(14).fill(null));

  return (
    <AssessmentContext.Provider value={{ answers, saveAnswer, resetAnswers, aiMode, setAiMode }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => useContext(AssessmentContext);
