import React, { useState } from 'react';
import './ChatCommon.css';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([{ sender: 'ai', text: "Hi, Jerry" }]);

  const handleSpeech = () => {
    // simulate speech to text
    const simulatedText = "Here's your day?";
    setTranscript(simulatedText);
    setMessages(prev => [...prev, { sender: 'user', text: simulatedText }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'ai', text: "Noted!" }]);
    }, 600);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Speech to Text <span className="chat-status">Ready</span></div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <button onClick={handleSpeech} className="voice-btn">Press and Speak 🎤</button>
      </div>
    </div>
  );
};

export default SpeechToText;
