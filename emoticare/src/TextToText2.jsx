import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you pass therapistName in route
import { io } from "socket.io-client";
import "./ChatCommon.css";
import axios from 'axios';

const socket = io("http://localhost:5000");

const TextToText2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { therapistName } = useParams(); // or hardcode if always same
  const userName = sessionStorage.getItem("user_id") || "shakthi"; // <- real patient name
  const room = `room-${userName.toLowerCase()}`;


  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
axios.get("http://localhost:5000/api/chat/history", {
  params: { user_id, room }
})
.then(res => {
  const hist = res.data.therapist_chat || [];
  const formatted = hist.map(([sender, text]) => ({ from: sender, text }));
  setMessages(prev => [...formatted, ...prev]);
});

  // 🔁 Emit join
  socket.emit("join", { room, username: "PATIENT" });

  // 🔔 Add "joined" message once
  setMessages((prev) => [
    ...prev,
    { from: "system", text: `You joined the room: ${room}` },
  ]);

  // 🎧 Listen to new messages
  socket.on("message", (msg) => {
    console.log("💬 Received:", msg); // for debugging
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
    sender: "PATIENT",
    text: input,
  });
  setInput("");
};

  return (
    <div className="chat-container">
      <div className="chat-header">Talk to {therapistName}</div>

      <div className="chat-body">
        {messages.map((msg, i) => {
          const sender = msg.from || msg.sender || "unknown";  // fallback
          return (
            <div key={i} className={`chat-bubble ${sender.toLowerCase()}`}>
              {msg.text}
            </div>
          );
        })}
      </div>


      <div className="chat-input">
        <input
          type="text"
          placeholder="Send a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default TextToText2;