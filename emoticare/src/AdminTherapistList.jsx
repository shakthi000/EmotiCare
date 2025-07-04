import React, { useState } from 'react';
import './AdminPages.css';
import backArrow from './assets/back-arrow.png';
import plusIcon from './assets/plus-icon.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const initialTherapists = [];

const AdminTherapistList = () => {
  const [search, setSearch] = useState('');
  const [therapists, setTherapists] = useState(initialTherapists);
  const navigate = useNavigate();

  useEffect(() => {
  fetch("http://localhost:5000/api/admin/therapists")
    .then(res => res.json())
    .then(data => setTherapists(data));
}, []);


  const handleAdd = async () => {
  const name = prompt('Enter therapist name:');
  const role = prompt('Enter therapist role:');
  if (name && role) {
    await fetch("http://localhost:5000/api/admin/therapists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role })
    });
    setTherapists(prev => [...prev, { name, role }]);
  }
};

  const filtered = therapists.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" />
      </button>

      <br /> <br />

      <div className="admin-header">
        <h2 className="admin-title">Therapists</h2>
      </div>

      <div className="search-add-bar" style={{ display: 'flex', alignItems: 'center',flexDirection: 'row', justifyContent: 'space-between' }}>
        <input
          className="admin-search"
          type="text"
          placeholder="Search Therapist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleAdd} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer',width: '40px', height: '40px' }}>
          <img src={plusIcon} alt="Add" />
        </button>
      </div>

        <h2 className="admin-title">All Users</h2>
      <div className="admin-user-list">
        {filtered.map((t, index) => (
          <div className="admin-user-card" key={index}>
            <div className="avatar-circle">{t.name[0]}</div>
            <div>
              <p className="user-name">{t.name}</p>
              <p className="user-role">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="admin-nav">
        <button style={{cursor:"pointer"}}>🏠 <br /> Dashboard</button>
        <button className='active' onClick={() => navigate('/admin/therapists')} style={{cursor:"pointer"}}> 👩‍⚕️ <br /> Therapist</button>
        <button onClick={() => navigate('/admin/patients')} style={{cursor:"pointer"}}> 👩 <br /> Patients</button>
      </div>
    </div>
  );
};

export default AdminTherapistList;
