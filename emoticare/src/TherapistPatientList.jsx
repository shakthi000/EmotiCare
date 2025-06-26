// TherapistPatientList.jsx
import React from 'react';
import './TherapistPatientList.css';
import { useNavigate } from 'react-router-dom';
import backArrow from './assets/back-arrow.png';
import user1 from './assets/ai-speech-1.png';
import user2 from './assets/ai-speech-2.png';
import user3 from './assets/ai-text-1.png';
import user4 from './assets/ai-text-2.png';

const patients = [
  { name: 'SANJAY', img: user1 },
  { name: 'VIGNESH', img: user2 },
  { name: 'YUVASRI', img: user3 },
  { name: 'SHAKTHI', img: user4 },
];

const TherapistPatientList = () => {
  const navigate = useNavigate();

  return (
    <div className="thera-list-container">
      <button className="back-btn" onClick={() => navigate('/signinas')}>
        <img src={backArrow} alt="Back" />
      </button>

      <div className="list-header">
        <h3 style={{color:"#975dbd"}}>Patient List</h3>
        <span className="net-status">Network OK</span>
      </div>

      <h2 className="select-text">Select Patient To Treat</h2>

      <div className="patient-cards">
        {patients.map((p, idx) => (
          <button key={idx} className="patient-card" onClick={() => navigate(`/therapist/analytics/${p.name}`)}>
            <span>{p.name}</span>
            <img src={p.img} alt={p.name} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default TherapistPatientList;
