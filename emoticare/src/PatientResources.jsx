import React from 'react';
import './PatientResources.css';
import mindfulness1 from './assets/mindfulness1.png';
import medication1 from './assets/medication1.png';
import backArrow from './assets/back-arrow.png'; // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const PatientResources = () => {
    const navigate = useNavigate();
  return (
    <div className="resources-container">
        <div className="resources-header-row">
      <button className="resources-back-button" onClick={() => navigate('/dashboard/patient')} style={{ background: 'none', border: 'none', cursor: 'pointer'}}>    
        <img src={backArrow} alt="Back" className="resources-back-icon" />
      </button>
      <br /> <br /> <br />
      </div>
      <div className="resources-header">
        <h3 className="resources-title" style={{fontSize:"20px"}}>Resources</h3>
        <span className="verified-badge">Verified</span>
      </div>

      <h2 className="resources-subheading" style={{fontSize:"30px"}}>Here’re the resources tailored for you 😊</h2>

      <section className="resources-section">
        <h3 className="resources-category" style={{fontSize:"30px"}}>Mindfulness ✨</h3>
        <div className="resources-scroll">
          <div className="resource-card" style={{width:"30%",height:"100%",cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <p style={{fontSize:"18px"}}>Mindfulness Course for beginners</p>
            <img src={mindfulness1} alt="Mindfulness" className="resource-img" style={{width:"200px",height:"200px"}}/>
            <span className="resource-icon">♂</span>
          </div>
          <div className="resource-card faded">
            <p>Mindfulness Level 2</p>
            <span className="resource-icon">♂</span>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <h3 className="resources-category" style={{fontSize:"30px"}}>Medication ✨</h3>
        <div className="resources-scroll">
          <div className="resource-card" style={{width:"30%",height:"100%",cursor:"pointer",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <p style={{fontSize:"18px"}}>Medication Info Session</p>
            <img src={medication1} alt="Medication" className="resource-img" style={{width:"300px",height:"170px"}} />
            <span className="resource-icon">♀</span>
          </div>
          <div className="resource-card faded">
            <p>Advanced Medication Guide</p>
            <span className="resource-icon">♂</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PatientResources;
