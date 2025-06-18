import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing from src directly since your files are not in a /pages folder
import EmotiCare from "./EmotiCare";
import EmotiCareIntro from "./EmotiCareIntro";
import EmotiCareWelcome from "./EmotiCareWelcome";
import SignInAs from "./SignInAs"; // Make sure the filename is `SignUp.jsx` (capital U!)
import SignUp from "./SignUp";
import SignInAdmin from "./SignInAdmin";
import SignInPatient from "./SignInPatient";
import SignInTherapist from "./SignInTherapist";
import NewSignUp from "./NewSignUp"; // Ensure this is the correct file name
import ForgotPasswordModal from "./ForgotPasswordModal"; // Ensure this is the correct file name
import AStep1 from "./components/PatientAssessment/AStep1";
import AStep2 from "./components/PatientAssessment/AStep2";
import AStep3 from "./components/PatientAssessment/AStep3"; // Uncomment if you have this component
import AStep4 from "./components/PatientAssessment/AStep4"; // Uncomment if you have this component
import AStep5 from "./components/PatientAssessment/AStep5"; // Uncomment if you have this component
import AStep6 from "./components/PatientAssessment/AStep6"; // Uncomment if you have this component
import AStep7 from "./components/PatientAssessment/AStep7"; // Uncomment if you have this component
import AStep8 from "./components/PatientAssessment/AStep8"; // Uncomment if you have this component
import AStep9 from "./components/PatientAssessment/AStep9"; // Uncomment if you have this component
import AStep10 from "./components/PatientAssessment/AStep10"; // Uncomment if you have this component
import AStep11 from "./components/PatientAssessment/AStep11"; // Uncomment if you have this component
// Ensure all components are imported correctly

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmotiCare />} />
        <Route path="/intro" element={<EmotiCareIntro />} />
        <Route path="/welcome" element={<EmotiCareWelcome />} />
        <Route path="/signinas" element={<SignInAs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin/patient" element={<SignInPatient />} />
        <Route path="/signin/therapist" element={<SignInTherapist />} />
        <Route path="/signin/admin" element={<SignInAdmin />} />
        <Route path="/new-signup" element={<NewSignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordModal />} />
        <Route path="/assessment/step1" element={<AStep1 step={1} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step2" element={<AStep2 step={2} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step3" element={<AStep3 step={3} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step4" element={<AStep4 step={4} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step5" element={<AStep5 step={5} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step6" element={<AStep6 step={6} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step7" element={<AStep7 step={7} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step8" element={<AStep8 step={8} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step9" element={<AStep9 step={9} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step10" element={<AStep10 step={10} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step11" element={<AStep11 step={11} answer="" onSave={() => {}} onNext={() => {}} />} />
        {/* Add more routes as needed */} 
      </Routes>
    </Router>
  );
};

export default AppRouter;
