import React from 'react';
import AppRouter from './AppRouter';
import { AssessmentProvider } from './context/AssessmentContext.jsx';

function App() {
  return (
    <AssessmentProvider>
      <AppRouter />
    </AssessmentProvider>
  );
}

export default App;
