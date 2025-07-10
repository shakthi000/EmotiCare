import React, { useState, useEffect } from 'react';
import './ChatCommon.css';
import axios from 'axios';

const TextToSpeech = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('user_id') || 'guest';

  useEffect(() => {
    const stored = localStorage.getItem(`ai_chat_${userId}`);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`ai_chat_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    const res = await axios.post('http://localhost:5000/api/chat/therapist', { message: input });
    const aiMessage = { sender: 'ai', text: res.data.reply };

    setMessages(prev => [...prev, aiMessage]);
    speak(res.data.reply);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Text to Speech <span className="chat-status">Ready</span></div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default TextToSpeech;