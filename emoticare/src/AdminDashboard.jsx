import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPages.css';
import backArrow from './assets/back-arrow.png'; // Ensure the path is correct

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
        {/* Back Button */}
        <button className="settings-back-button" onClick={() => navigate('/signin/admin')}>
            <img src={backArrow} alt="Back" className="settings-back-icon" />
        </button>
        <br /><br />
      <h2 className="admin-title">Dashboard</h2>

      <div className="admin-stats">
        <div className="admin-card">
          <p>Total Patients</p>
          <h3>125</h3>
          <span className="positive">+10%</span>
        </div>
        <br />
        <div className="admin-card">
          <p>Active Patients</p>
          <h3>85</h3>
          <span className="negative">-5%</span>
        </div>
        <br />
        <div className="admin-card">
          <p>New Patients</p>
          <h3>30</h3>
          <span className="positive">+15%</span>
        </div>
      </div>
        <br /> <br />
        <h2 className="admin-title">Reports & Settings</h2>
      <div className="admin-links">
        <button onClick={() => navigate('/admin/reports')}>📈 Reports</button>
        <button onClick={() => navigate('/admin/settings')}>⚙️ Settings</button>
      </div>

      <div className="admin-nav">
        <button className='active' style={{cursor:"pointer"}}>🏠 <br /> Dashboard</button>
        <button onClick={() => navigate('/admin/therapists')} style={{cursor:"pointer"}}> 👩‍⚕️ <br /> Therapist</button>
        <button onClick={() => navigate('/admin/patients')} style={{cursor:"pointer"}}> 👩 <br /> Patients</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
