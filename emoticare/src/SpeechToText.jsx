import React, { useState, useEffect, useRef } from 'react';
import './ChatCommon.css';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);
  const userId = localStorage.getItem('user_id') || 'guest';

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;

    return () => recognitionRef.current.abort();
  }, []);

  // Load history
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

  const handleSpeech = () => {
    recognitionRef.current.start();

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      const userMsg = { sender: 'user', text };
      const aiMsg = { sender: 'ai', text: "Got it! 😊" };

      setMessages(prev => [...prev, userMsg, aiMsg]);
    };

    recognitionRef.current.onerror = (e) => {
      console.error("Recognition error:", e);
    };
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Speech to Text <span className="chat-status">Ready</span>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <button onClick={handleSpeech} className="voice-btn">🎤 Speak Now</button>
      </div>
    </div>
  );
};

export default SpeechToText;
