import React, { useState, useEffect, useRef } from 'react';
import './ChatCommon.css';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([{ sender: 'ai', text: "Hi, Jerry!" }]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;

    return () => {
      recognitionRef.current.abort();
    };
  }, []);

  const handleSpeech = () => {
    recognitionRef.current.start();

    recognitionRef.current.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setMessages(prev => [...prev, { sender: 'user', text }]);

      // Simulate AI reply (optional)
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: "Got it! 😊" }]);
      }, 800);
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