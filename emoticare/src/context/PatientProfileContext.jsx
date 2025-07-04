import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const PatientProfileContext = createContext();

export const PatientProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;
    try {
      const res = await axios.get("http://localhost:5000/api/patient/profile", {
        params: { user_id },
      });
      setProfile(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch profile", err);
    }
  };

  const updateProfile = async (newProfile) => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;
    try {
      await axios.post("http://localhost:5000/api/patient/profile", {
        user_id,
        profile: newProfile,
      });
      setProfile(newProfile);
    } catch (err) {
      console.error("❌ Failed to update profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <PatientProfileContext.Provider value={{ profile, setProfile: updateProfile, fetchProfile }}>
      {children}
    </PatientProfileContext.Provider>
  );
};

export const usePatientProfile = () => useContext(PatientProfileContext);
