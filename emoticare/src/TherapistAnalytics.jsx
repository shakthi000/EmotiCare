// TherapistAnalytics.jsx
import React from 'react';
import './TherapistAnalytics.css';
import { useNavigate, useParams } from 'react-router-dom';
import backArrow from './assets/back-arrow.png';
import moodGraph from './assets/mood-graph.png';

const TherapistAnalytics = () => {
  const navigate = useNavigate();
  const { patientName } = useParams();

  return (
    <div className="thera-analytics-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" style={{cursor:"pointer"}} />
      </button>

      <div className="analytics-header">
        <h3 style={{color:"#975dbd"}}>Analytics</h3>
        <span className="badge">Low</span>
      </div>

      <h2 className="performance-text" style={{fontSize:"30px"}}>Checkout your recent performance 🤩</h2>

      <div className="weekly-mood">
        <h4 style={{color:"#975dbd",fontSize:"30px"}}>Weekly Report</h4>
        <div className="mood-week" style={{width:"100%",backgroundColor:"#fff",borderRadius:"10px",padding:"20px",boxShadow:"0 4px 8px rgba(0,0,0,0.1)"}}>
          {['Sat','Sun','Mon','Tues','Weds','Thurs','Today'].map((day, i) => (
            <div key={i} className="mood-day">
              <span>😞</span>
              <p>{day}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="monthly-section">
        <h4 style={{color:"#975dbd",fontSize:"30px"}}>Monthly Report</h4>
        <img src={moodGraph} alt="Mood Graph" className="graph" />
      </div>

      <footer className="bottom-nav">
        <button onClick={() => navigate(`/therapist/analytics/${patientName}`)}>❤</button>
        <button onClick={() => navigate(`/therapist/chat/${patientName}`)}>💬</button>
        <button onClick={() => navigate('/therapist/settings')}>🏴</button>
      </footer>
    </div>
  );
};

export default TherapistAnalytics;
