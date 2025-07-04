import React, { useState } from 'react';
import './ChatCommon.css';
import axios from 'axios';

const TextToText = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
  if (!input.trim()) return;

  const newMsg = { sender: 'user', text: input };
  setMessages((prev) => [...prev, newMsg]);

  const res = await axios.post('http://localhost:5000/api/chat/therapist', { message: input });
  const reply = { sender: 'ai', text: res.data.reply };

  setMessages((prev) => [...prev, reply]);
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
