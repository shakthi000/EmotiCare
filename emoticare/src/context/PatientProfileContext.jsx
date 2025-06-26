// src/context/PatientProfileContext.js
import React, { createContext, useContext, useState } from 'react';

const PatientProfileContext = createContext();

export const PatientProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    firstName: 'Jerry',
    lastName: 'Smith',
    username: '@Jerry',
    email: 'Jerry209@gmail.com',
    phone: '+91 9147012345',
    birth: '',
    gender: ''
  });

  return (
    <PatientProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </PatientProfileContext.Provider>
  );
};

export const usePatientProfile = () => useContext(PatientProfileContext);
