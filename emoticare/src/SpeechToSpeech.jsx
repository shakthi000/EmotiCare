import React, { useState, useEffect, useRef } from 'react';
import './ChatCommon.css';
import axios from 'axios';

const SpeechToSpeech = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);
  const userId = localStorage.getItem('user_id') || 'guest';

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;

    return () => {
      recognitionRef.current.abort();
    };
  }, []);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`ai_chat_${userId}`);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [userId]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(`ai_chat_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);

  const fetchReply = async (message) => {
    const res = await axios.post('http://localhost:5000/api/chat/therapist', { message });
    return res.data.reply;
  };

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      recognitionRef.current.start();

      recognitionRef.current.onresult = async (event) => {
        const userText = event.results[0][0].transcript;
        const userMsg = { sender: 'user', text: userText };
        setMessages(prev => [...prev, userMsg]);

        const reply = await fetchReply(userText);
        const aiMsg = { sender: 'ai', text: reply };
        setMessages(prev => [...prev, aiMsg]);

        const utter = new SpeechSynthesisUtterance(reply);
        window.speechSynthesis.speak(utter);
        setRecording(false);
      };

      recognitionRef.current.onerror = (err) => {
        console.error('Speech recognition error:', err);
        setRecording(false);
      };
    } else {
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="ai5-container">
      <div className="chat-header">
        <span className="chat-title">Speech to Speech</span>
        <span className="chat-status">{recording ? 'Listening...' : 'Ready'}</span>
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
