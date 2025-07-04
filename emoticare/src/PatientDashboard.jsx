import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientDashboard.css';
import profilePic from './assets/profile-icon.png';
import therapistArt from './assets/therapist-art.png';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) return;

      try {
        const res = await axios.get("http://localhost:5000/api/patient-dashboard", {
          params: { user_id }
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard:", err);
      }
    };

    fetchDashboard();
  }, []);

  if (!userData) return <p>Loading Dashboard...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <img src={profilePic} alt="User" className="user-avatar" style={{cursor:"pointer"}} onClick={() => navigate('/account/patient')} />
        <div>
          <p className="welcome" style={{color:"#975dbd"}}>Welcome, {userData.name}</p>
          <span className="badge">{userData.tier}</span>
        </div>
      </div>

      <h2 className="title" style={{fontSize:"30px"}}>EMOTICARE AI Therapists is with you!</h2>

      <div className="weekly-highlights">
        <h4>What makes your week? <span className="view-more">View More...</span></h4>
        <ul>
          {userData.highlights.map((item, idx) => (
            <li key={idx}>{item.date}: {item.desc} <span>{item.emoji}</span></li>
          ))}
        </ul>
      </div>

      <div className="schedule-section">
        <h4>Schedule for the week ...</h4>
        <div className="schedule-card">
          <div>
            <p className="time">{userData.schedule.time}</p>
            <p className="meeting">{userData.schedule.meeting}</p>
            <p className="location">{userData.schedule.location}</p>
          </div>
          <img src={therapistArt} alt="Therapist" className="schedule-img" style={{height:"100%",width:"220px",borderRadius:"10%"}}/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
