import React from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from './assets/back-arrow.png'; // Update path as needed
import './AdminReports.css';
import { useState, useEffect } from 'react';

const AdminReports = () => {
  const navigate = useNavigate();

  const [report, setReport] = useState({});
useEffect(() => {
  fetch("http://localhost:5000/api/admin/reports")
    .then(res => res.json())
    .then(data => setReport(data));
}, []);

  return (
    <div className="admin-reports-container">
      <button className="back-button" onClick={() => navigate('/dashboard/admin')}>
        <img src={backArrow} alt="Back" className="back-icon" />
      </button>

      <h2 className="reports-title">Reports</h2>

      <section className="section">
        <h3 className="section-heading">Quick Actions</h3>
        <p className="subheading">Department Overview</p>

        <div className="overview-cards">
          <div className="overview-item">
            <p className="overview-label">Total Therapists</p>
            <p className="overview-value">{report.therapists}</p>
          </div>
          <div className="overview-item">
            <p className="overview-label">Total Patients</p>
            <p className="overview-value">{report.patients}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h3 className="section-heading">Performance Reports</h3>
        <p className="subheading">Customer Satisfaction</p>
        <p className="satisfaction-value">{report.satisfaction}</p>
        <p className="subtext">Last 3 Months {report.growth}</p>

        <div className="line-chart">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,25 C10,20 20,22 30,18 C40,20 50,17 60,28 C70,40 80,15 90,22 C100,25 100,25 100,25"
              stroke="#975dbd"
              fill="none"
              strokeWidth="2"
            />
          </svg>
          <div className="chart-labels">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminReports;
