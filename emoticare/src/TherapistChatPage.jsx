import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./TherapistChatPage.css";
import axios from 'axios';

const socket = io("http://localhost:5000"); // Socket connection

const TherapistChatPage = () => {
  const { patientName } = useParams(); // Get from URL
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const room = `room-${patientName.toLowerCase()}`;

  useEffect(() => {
  const room = `room-${patientName.toLowerCase()}`;
  axios.get("http://localhost:5000/api/chat/history", {
    params: { room }
  }).then(res => {
    const hist = res.data.therapist_chat || [];
    const formatted = hist.map(([sender, text]) => ({ from: sender, text }));
    setMessages(prev => [...formatted, ...prev]);
  });

  socket.emit("join", { room, username: "THERAPIST" });

  socket.on("message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("message");
  };
}, [room]);

  const sendMessage = () => {
    if (!input.trim()) return;
    socket.emit("send_message", {
      room,
      sender: "THERAPIST",
      text: input,
    });
    setInput("");
  };

  return (
    <div className="thera-chat-container">
      <div className="chat-header">
        <h3>{patientName}</h3>
        <button className="call-button">CALL</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.from.toLowerCase()}`}>
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
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default TherapistChatPage;
