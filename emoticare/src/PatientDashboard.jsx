import React from 'react';
import './PatientDashboard.css';
import profilePic from './assets/profile.png'; // Ensure the path is correct
import therapistArt from './assets/therapist-art.png'; // Ensure the path is correct
import Footer from './Footer'; // Ensure the Footer component is correctly imported
import {useNavigate} from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={profilePic} alt="User" className="user-avatar" style={{cursor:"pointer"}} onClick={()=>navigate('/account/patient')}/>
        <div>
          <p className="welcome" style={{color:"#975dbd"}}>Welcome, Jerry</p>
          <span className="badge">Golden</span>
        </div>
      </div>

      <h2 className="title" style={{fontSize:"30px"}}>EMOTICARE AI Therapists is with you!</h2>

      <div className="weekly-highlights">
        <h4>What makes your week? <span className="view-more">View More...</span></h4>
        <ul>
          <li>19 Apr: Completed SEEM3510 Asm 4 <span>😞</span></li>
          <li>17 Apr: Completed Final Year Project <span>😞</span></li>
          <li>14 Apr: Working on SEEM3510 Asm 4 <span>😞</span></li>
        </ul>
      </div>

      <div className="schedule-section">
        <h4>Schedule for the week ...</h4>
        <div className="schedule-card">
          <div>
            <p className="time">Today, 4:30 pm</p>
            <p className="meeting">Meetings with Dr. Chan</p>
            <p className="location">At EMOTICARE Medical Center</p>
          </div>
          <img src={therapistArt} alt="Therapist" className="schedule-img" style={{height:"100%",width:"220px",borderRadius:"10%"}}/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
