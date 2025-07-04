import React, { useState } from 'react';
import './AdminPages.css';
import backArrow from './assets/back-arrow.png';
import plusIcon from './assets/plus-icon.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const initialPatients = [];

const AdminPatientList = () => {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState(initialPatients);
  const navigate = useNavigate();

  useEffect(() => {
  fetch("http://localhost:5000/api/admin/patients")
    .then(res => res.json())
    .then(data => setPatients(data));
}, []);

  const handleAdd = async () => {
  const name = prompt('Enter new patient name:');
  if (name) {
    await fetch("http://localhost:5000/api/admin/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    setPatients(prev => [...prev, name]);
  }
};

  const filtered = patients.filter(p =>
    p.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" />
      </button>

        <br /> <br />
      <div className="admin-header">
        <h2 className="admin-title">Patients</h2>
      </div>

      <div className="search-add-bar" style={{ display: 'flex', alignItems: 'center',flexDirection: 'row', justifyContent: 'space-between' }}>
        <input
          className="admin-search"
          type="text"
          placeholder="Search Patients"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleAdd} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer',width: '40px', height: '40px' }}>
          <img src={plusIcon} alt="Add" />
        </button>
      </div>

      <h2 className="admin-title">All Users</h2>

      <div className="admin-user-list">
        {filtered.map((name, i) => (
          <div className="admin-user-card" key={i}>
            <div className="avatar-circle">{name[0]}</div>
            <div>
              <p className="user-name">{name}</p>
              <p className="user-role">Patient</p>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-nav">
        <button style={{cursor:"pointer"}}>🏠 <br /> Dashboard</button>
        <button onClick={() => navigate('/admin/therapists')} style={{cursor:"pointer"}}> 👩‍⚕️ <br /> Therapist</button>
        <button className="active" onClick={() => navigate('/admin/patients')} style={{cursor:"pointer"}}> 👩 <br /> Patients</button>
      </div>
    </div>
  );
};

export default AdminPatientList;
