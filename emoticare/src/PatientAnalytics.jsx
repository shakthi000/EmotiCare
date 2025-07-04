import React, { useEffect, useState } from 'react';
import './PatientAnalytics.css';
import { useNavigate } from 'react-router-dom';
import backArrow from './assets/back-arrow.png';
import Footer from './Footer';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const days = ['Sat', 'Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Today'];

const PatientAnalytics = () => {
  const navigate = useNavigate();
  const [moods, setMoods] = useState([]);
  const [monthlyScores, setMonthlyScores] = useState([]);
  const [stressLevel, setStressLevel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const user_id = localStorage.getItem('user_id');
      try {
        const res = await axios.get(`http://localhost:5000/api/patient/analytics?user_id=${user_id}`);
        setMoods(res.data.mood_week || []);
        setMonthlyScores(res.data.monthly_mood_scores || []);
        setStressLevel(res.data.stress_level || 3);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Mood Score',
        data: monthlyScores,
        borderColor: '#975dbd',
        backgroundColor: '#975dbd',
        fill: false,
        tension: 0.3,
        pointRadius: 5
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        stepSize: 1,
        title: {
          display: true,
          text: 'Mood (1 - Sad → 5 - Happy)'
        }
      }
    }
  };

  if (loading) return <p style={{ padding: '20px', color: '#975dbd' }}>Loading analytics...</p>;

  return (
    <div className="analytics-container">
      <div className="analytics-header-row">
        <button className="analytics-back-button" onClick={() => navigate('/dashboard/patient')}>
          <img src={backArrow} alt="Back" className="analytics-back-icon" />
        </button>
        <h4 className="analytics-title">Analytics</h4>
        <span className="analytics-status-badge">
          {stressLevel >= 4 ? 'High' : 'Low'}
        </span>
      </div>

      <h2 className="analytics-subheading">
        Your performance looks {stressLevel <= 2 ? 'stable' : 'stressful'} 😌
      </h2>

      <div className="weekly-report">
        <h4 style={{ fontSize: "28px", color: "#975dbd" }}>Weekly Mood</h4>
        <div className="mood-days">
          {moods.length === 0 ? (
            <p style={{ color: '#aaa' }}>No mood data yet</p>
          ) : (
            days.map((day, i) => (
              <div key={day} className="day-mood">
                <span>{moods[i] || '😶'}</span>
                <small>{day}</small>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="monthly-report">
        <h4 style={{ fontSize: "28px", color: "#975dbd" }}>Monthly Mood Summary</h4>
        <div className="graph-box" style={{ margin: '30px 0' }}>
          {monthlyScores.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <p style={{ color: '#999' }}>No data yet to generate graph.</p>
          )}
        </div>
        <p>Stress Level: <strong>{stressLevel} / 5</strong></p>
      </div>

      <Footer />
    </div>
  );
};

export default PatientAnalytics;