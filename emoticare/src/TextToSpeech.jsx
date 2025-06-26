import React, { useState } from 'react';
import './ChatCommon.css';

const TextToSpeech = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ sender: 'ai', text: "Hi, Jerry" }]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        const response = "You said: " + input;
        setMessages(prev => [...prev, { sender: 'ai', text: response }]);
        speak(response);
      }, 400);
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
