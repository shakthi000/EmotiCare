import React from 'react';
import './PatientAnalytics.css';
import { useNavigate } from 'react-router-dom';
import backArrow from './assets/back-arrow.png'; // Make sure the image path is correct
import graphImage from './assets/mood-graph.png'; // Replace with your graph image path
import Footer from './Footer';

const moods = ['😞', '😐', '🙂', '😔', '😞', '😖', '😢'];
const days = ['Sat', 'Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Today'];

const PatientAnalytics = () => {
  const navigate = useNavigate();

  return (
    <div className="analytics-container">
      <div className="analytics-header-row">
        <button className="analytics-back-button" onClick={() => navigate('/dashboard/patient')} style={{ background: 'none', border: 'none', cursor: 'pointer'}}>
          <img src={backArrow} alt="Back" className="analytics-back-icon" />
        </button>
        <h4 className="analytics-title" style={{fontSize:"20px"}}>Analytics</h4>
        <span className="analytics-status-badge">Low</span>
      </div>

      <h2 className="analytics-subheading" style={{fontSize:"30px"}}>Checkout your recent performance 🤩</h2>

      <div className="weekly-report">
        <h4 style={{fontSize:"30px",color:"#975dbd",marginBottom:"50px"}}>Weekly Report</h4>
        <div className="mood-days">
          {days.map((day, idx) => (
            <div key={day} className="day-mood" style={{fontSize:"20px",color:"#975dbd"}}>
              <span>{moods[idx]}</span>
              <small style={{color:"#975dbd",fontWeight:"600",fontSize:"18px"}}>{day}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="monthly-report">
        <h4>Monthly Report</h4>
        <div className="graph-box">
          <img src={graphImage} alt="Mood graph"/>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientAnalytics;
