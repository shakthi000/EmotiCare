import React, { useState } from 'react';
import './ChatCommon.css';
import axios from 'axios';

const TextToSpeech = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ sender: 'ai', text: "" }]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
  if (input.trim()) {
    const userMessage = input;
    setMessages([...messages, { sender: 'user', text: userMessage }]);
    setInput('');

    const res = await axios.post('http://localhost:5000/api/chat/therapist', { message: userMessage });
    const aiResponse = res.data.reply;

    setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    speak(aiResponse);
  }
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
