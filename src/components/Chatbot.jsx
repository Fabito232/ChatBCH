import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola! Soy un chatbot. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null); 

  useEffect(() => {
    
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const userMessage = { id: messages.length + 1, text: newMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]); 
    setNewMessage('');
    
    // Simulacion
    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: 'Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]); 
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat BCH</div>
      <div className="chat-body">
        {messages.map((message) => (
          <motion.div 
            key={message.id} 
            className={`message ${message.sender}`}
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 50 }} 
            transition={{ duration: 0.5 }}
          >
            {message.text}
          </motion.div>
        ))}
        <div ref={chatEndRef} /> {}
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Escribe un mensaje..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button className="send-button" onClick={handleMessageSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;

