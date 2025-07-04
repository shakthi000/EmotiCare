import React, { useEffect, useState } from 'react';
import './TherapistAnalytics.css';
import { useNavigate, useParams } from 'react-router-dom';
import backArrow from './assets/back-arrow.png';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const days = ['Sat','Sun','Mon','Tues','Weds','Thurs','Today'];

const TherapistAnalytics = () => {
  const navigate = useNavigate();
  const { patientName } = useParams();

  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/therapist/analytics?name=${patientName}`);
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error loading analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [patientName]);

  if (loading) return <p style={{ padding: '20px' }}>Loading analytics...</p>;
  if (!analytics || analytics.error) return <p style={{ padding: '20px' }}>No analytics found.</p>;

  const chartData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
      label: 'Mood Score',
      data: analytics.monthly_mood_scores,
      borderColor: '#975dbd',
      backgroundColor: '#f0e6ff',
      tension: 0.4
    }]
  };

  const chartOptions = {
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1 },
        title: {
          display: true,
          text: 'Mood (1 = Very Sad, 5 = Great)'
        }
      }
    }
  };

  return (
    <div className="thera-analytics-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <img src={backArrow} alt="Back" />
      </button>

      <div className="analytics-header">
        <h3 style={{color:"#975dbd"}}>Analytics</h3>
        <span className="badge">{analytics.stress_level >= 4 ? 'High' : 'Low'}</span>
      </div>

      <h2 className="performance-text">Report of {patientName}</h2>

      <div className="weekly-mood">
        <h4 style={{color:"#975dbd"}}>Weekly Mood</h4>
        <div className="mood-week">
          {analytics.mood_week.map((mood, i) => (
            <div key={i} className="mood-day">
              <span>{mood || '😶'}</span>
              <p>{days[i]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="monthly-section">
        <h4 style={{color:"#975dbd"}}>Monthly Report</h4>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <footer className="bottom-nav">
        <button onClick={() => navigate(`/therapist/analytics/${patientName}`)} >❤ <br /> Analytics</button>
        <button onClick={() => navigate(`/therapist/chat/${patientName}`)}>💬 <br /> Chat</button>
        <button onClick={() => navigate('/therapist/settings')}>🏴 <br /> Settings</button>
      </footer>
    </div>
  );
};

export default TherapistAnalytics;
