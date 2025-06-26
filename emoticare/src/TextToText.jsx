import React, { useState } from 'react';
import './ChatCommon.css';

const TextToText = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);

    // Simulate AI response
    setTimeout(() => {
      const reply = { sender: 'ai', text: "Hello!" };
      setMessages(prev => [...prev, reply]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        Text-to-Text Chat
        <span className="network-status">🟢</span>
      </div>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type here..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default TextToText;
