import React from 'react';
import './TherapistSettingsPage.css';
import { useNavigate } from 'react-router-dom';
import { useSettings } from './context/SettingsContext';
import backArrow from './assets/back-arrow.png';
import EditProfilePageSettings from './EditProfilePageSettings';

const TherapistSettingsPage = () => {
  const navigate = useNavigate();
  const {
    theme, setTheme,
    language, setLanguage,
    fontSize, setFontSize,
    volume, setVolume,
    highRes, setHighRes
  } = useSettings();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      navigate('/signinas');
    }
  };

  return (
    <div className={`settings-container ${theme}`}>
      <EditProfilePageSettings />
      <button
        className="settings-back-button"
        onClick={() => navigate('/dashboard/therapist')}
      >
        <img src={backArrow} alt="Back" className="settings-back-icon" />
      </button>
      <br /> <br /> <br />

      <div className="settings-header">
        <h2>Other Settings</h2>
        <div className="settings-header-buttons">
          <button className="small purple">Help ?</button>
          <button className="small purple" onClick={handleLogout} style={{cursor:"pointer"}}>Log out</button>
        </div>
      </div>

      <div className="settings-section">
        <p className="label">Color Theme</p>
        <div className="theme-toggle">
          <button
            className={theme === 'light' ? 'active' : ''}
            onClick={() => setTheme('light')}
          >
            Light Mode
          </button>
          <button
            className={theme === 'dark' ? 'active' : ''}
            onClick={() => setTheme('dark')}
          >
            Dark Mode
          </button>
        </div>
      </div>

      <div className="settings-section">
        <p className="label">Language</p>
        <div className="language-options">
          {['Eng'].map((lang) => (
            <span
              key={lang}
              onClick={() => setLanguage(lang)}
              className={language === lang ? 'selected-lang' : ''}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <p className="label">Font Size</p>
        <div className="font-options">
          {['small', 'medium', 'large'].map((size) => (
            <span
              key={size}
              onClick={() => setFontSize(size)}
              className={fontSize === size ? 'selected-font' : ''}
            >
              {size === 'small' ? 'Aa' : size === 'medium' ? <b>Aa</b> : <strong>Aa</strong>}
            </span>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <p className="label">AI Sound Volume</p>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          className="slider"
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>

      <div className="settings-section">
        <p className="label">High Resolution AI</p>
        <p className="subtext"># This increases your battery consumption</p>
        <div className="toggle-group">
          <button
            className={highRes ? 'toggle selected' : 'toggle'}
            onClick={() => setHighRes(true)}
          >
            On
          </button>
          <button
            className={!highRes ? 'toggle selected' : 'toggle'}
            onClick={() => setHighRes(false)}
          >
            Off
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapistSettingsPage;
