import React, { useState } from 'react';
import './TherapistChatPage.css';
import { useParams } from 'react-router-dom';

const TherapistChatPage = () => {
  const { patientName } = useParams();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'patient', text: `Hi, I'm ${patientName}.` }
  ]);

  // Patient-like AI response simulation
  const getPatientResponse = (therapistInput) => {
    const text = therapistInput.toLowerCase();
    if (text.includes('how are you') || text.includes('feeling')) {
      return "I'm feeling a bit anxious today.";
    }
    if (text.includes('stress')) {
      return "Yes, I've been feeling stressed because of work lately.";
    }
    if (text.includes('happy') || text.includes('good')) {
      return "I'm glad to hear that. I try to focus on the positives.";
    }
    if (text.includes('coping') || text.includes('strategies')) {
      return "I usually go for a walk or listen to music to cope.";
    }
    if (text.includes('alone') || text.includes('lonely')) {
      return "Sometimes I do feel lonely, especially on weekends.";
    }
    if (text.includes('help')) {
      return "I think talking about my feelings like this is already helping.";
    }
    if (text.includes('thank')) {
      return "Thank you for listening and supporting me.";
    }
    return "It's sometimes hard to put my feelings into words, but I'm trying.";
  };

  const sendMessage = () => {
    if (input.trim()) {
      const therapistMsg = { from: 'therapist', text: input };
      setMessages((prev) => [...prev, therapistMsg]);
      const patientReply = getPatientResponse(input);
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: 'patient', text: patientReply }]);
      }, 800);
      setInput('');
    }
  };

  return (
    <div className="thera-chat-container">
      <div className="chat-header">
        <h3>{patientName}</h3>
        <button className="call-button">CALL</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input-box">
        <input
          type="text"
          placeholder="Send a message as therapist ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default TherapistChatPage;