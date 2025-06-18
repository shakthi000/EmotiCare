import React, { createContext, useContext, useState } from 'react';

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const [answers, setAnswers] = useState(Array(14).fill(null)); // 14 steps

  const saveAnswer = (stepIndex, value) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[stepIndex] = value;
      return updated;
    });
  };

  const resetAnswer = (stepIndex) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[stepIndex] = null;
      return updated;
    });
  };

  const resetAnswers = () => setAnswers(Array(14).fill(null)); // full reset

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        saveAnswer,
        resetAnswer,    // ✅ Add this line
        resetAnswers
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => useContext(AssessmentContext);
