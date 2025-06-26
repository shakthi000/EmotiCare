import React from 'react';
import AppRouter from './AppRouter';
import { AssessmentProvider } from './context/AssessmentContext.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import { PatientProfileProvider } from './context/PatientProfileContext.jsx';

function App() {
  return (
    <AssessmentProvider>
      <SettingsProvider>
        <PatientProfileProvider>
      <AppRouter />
        </PatientProfileProvider>
      </SettingsProvider>
    </AssessmentProvider>
  );
}

export default App;
