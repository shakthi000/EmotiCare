import React, { useState } from 'react';
import './ChatCommon.css';

const TextToText2 = () => {
  const [messages, setMessages] = useState([{ sender: 'ai', text: "Hi, Jerry" }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: "How's your day?" }]);
      }, 500);
    }
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'ai', text: "What's going on lately?" }]);
      }, 500);
    }
}


  return (
    <div className="chat-container">
      <div className="chat-header">Text to Text <span className="chat-status">Ready</span></div>

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

export default TextToText2;
