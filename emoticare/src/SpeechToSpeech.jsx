import React, { useState } from 'react';
import './ChatCommon.css';
import { useNavigate } from 'react-router-dom';

const SpeechToSpeech = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([{ sender: 'AI', text: "Hi Jerry, how's your day?" }]);
  const [recording, setRecording] = useState(false);

  const toggleRecording = () => {
    setRecording(prev => !prev);
    if (!recording) {
      // Simulate response after 2s
      setTimeout(() => {
        const userSpeech = "Hi AI, my day is going great!";
        const aiReply = "That's lovely to hear!";
        setMessages(prev => [...prev, { sender: 'User', text: userSpeech }, { sender: 'AI', text: aiReply }]);
      }, 2000);
    }
  };

  return (
    <div className="ai5-container">
        <div className="chat-header">
            <span className="chat-title">Speech to Speech</span>
            <span className="chat-status">Ready</span>
        </div>
      <div className="chat-bubbles">
        {messages.map((msg, idx) => (
          <div key={idx} className={`bubble ${msg.sender.toLowerCase()}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="mic-footer">
        <button onClick={toggleRecording} className={`mic-button ${recording ? 'active' : ''}`}>
          {recording ? '🎤 Listening...' : '🎙 Tap to Speak'}
        </button>

        <div className="toggle-panel">
          <p>Device Sound is On</p>
          <p>Device Recording is On</p>
        </div>
      </div>
    </div>
  );
};

export default SpeechToSpeech;
