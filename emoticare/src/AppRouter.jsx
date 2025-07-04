import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PatientAccountPage from "./PatientAccountPage";
import PatientProfilePage from "./PatientProfilePage";
import PatientDashboard from "./PatientDashboard";
import PatientAnalytics from "./PatientAnalytics";
import PatientResources from "./PatientResources";
import ChooseAI from "./ChooseAI";
import SettingsPage from "./SettingsPage";

import TherapistPatientList from "./TherapistPatientList";
import TherapistAnalytics from "./TherapistAnalytics";
import TherapistChatPage from "./TherapistChatPage";
import TherapistSettingsPage from "./TherapistSettingsPage";

import AdminDashboard from "./AdminDashboard";
import AdminTherapistList from "./AdminTherapistList";
import AdminPatientList from "./AdminPatientList";
import AdminReports from "./AdminReports";
import AdminSettings from "./AdminSettings";

import EmotiCare from "./EmotiCare";
import EmotiCareIntro from "./EmotiCareIntro";
import EmotiCareWelcome from "./EmotiCareWelcome";
import SignInAs from "./SignInAs"; 
import SignUp from "./SignUp";
import SignInAdmin from "./SignInAdmin";
import SignInPatient from "./SignInPatient";
import SignInTherapist from "./SignInTherapist";
import NewSignUp from "./NewSignUp"; 
import ForgotPasswordModal from "./ForgotPasswordModal"; 
import AStep1 from "./components/PatientAssessment/AStep1";
import AStep2 from "./components/PatientAssessment/AStep2";
import AStep3 from "./components/PatientAssessment/AStep3"; 
import AStep4 from "./components/PatientAssessment/AStep4"; 
import AStep5 from "./components/PatientAssessment/AStep5"; 
import AStep6 from "./components/PatientAssessment/AStep6"; 
import AStep7 from "./components/PatientAssessment/AStep7"; 
import AStep8 from "./components/PatientAssessment/AStep8";
import AStep9 from "./components/PatientAssessment/AStep9"; 
import AStep10 from "./components/PatientAssessment/AStep10"; 
import AStep11 from "./components/PatientAssessment/AStep11"; 
import AStep12 from "./components/PatientAssessment/AStep12"; 
import AStep13 from "./components/PatientAssessment/AStep13"; 
import AStep14 from "./components/PatientAssessment/AStep14"; 
import TextToText from "./TextToText";
import SpeechToText from "./SpeechToText";
import SpeechToSpeech from "./SpeechToSpeech";
import TextToSpeech from "./TextToSpeech";
import TextToText2 from "./TextToText2";


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
        <Route path="/assessment/step12" element={<AStep12 step={12} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step13" element={<AStep13 step={13} answer="" onSave={() => {}} onNext={() => {}} />} />
        <Route path="/assessment/step14" element={<AStep14 />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/account/patient" element={<PatientAccountPage />} />
        <Route path="/profile/patient" element={<PatientProfilePage />} />
        <Route path="/chooseai/patient" element={<ChooseAI />} />
        <Route path="/chat/ai1" element={<SpeechToSpeech />} />
        <Route path="/chat/ai2" element={<SpeechToText />} />
        <Route path="/chat/ai3" element={<TextToText />} />
        <Route path="/chat/ai4" element={<TextToSpeech/>} />
        <Route path="/chat/ai5" element={<TextToText2 />} />
        <Route path="/analytics/patient" element={<PatientAnalytics />} />
        <Route path="/resources/patient" element={<PatientResources />} />
        <Route path="/settings/patient" element={<SettingsPage />} />

        <Route path="/dashboard/therapist" element={<TherapistPatientList />} />
        <Route path="/therapist/analytics/:patientName" element={<TherapistAnalytics />} />
        <Route path="/therapist/chat/:patientName" element={<TherapistChatPage />} />
        <Route path="/therapist/settings" element={<TherapistSettingsPage />} />

        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/admin/therapists" element={<AdminTherapistList />} />
        <Route path="/admin/patients" element={<AdminPatientList />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
