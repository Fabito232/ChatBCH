import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Chatbot.css';
import { leerExcel } from './leerExcel';
import { procesarDatos } from '../data/procesarDatos';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hola! Soy un chatbot. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [data, setData] = useState({});
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await leerExcel('/base_de_conocimiento/Mortalidad_por_Semana_del_Covid_19.xlsx');
        if (jsonData) {
          const { processedData } = procesarDatos(jsonData);
          setData(processedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMessage = { id: messages.length + 1, text: newMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    processUserMessage(newMessage);
    setNewMessage('');
  };

  const processUserMessage = (message) => {
    const regex = /semana (\d+) en el país de ([\w\s]+) por el Covid 19/i;
    const match = message.match(regex);

    if (match) {
      const week = `semana ${match[1]}`;
      const country = match[2].trim();

      let botResponseText;
      if (data[week] && data[week][country]) {
        botResponseText = `En el año 2023 en la ${week}, murieron ${data[week][country]} personas en el país de ${country} por el Covid 19.`;
      } else {
        botResponseText = 'No se encontraron datos para la semana o el país especificado.';
      }
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 2000);
    } else {
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, text: 'No entendí la pregunta. Por favor, asegúrate de que esté en el formato correcto.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
     }, 2000);
    }

    setTimeout(() => {
      const botResponse = { id: messages.length + 3, text: 'Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]); 
    }, 4000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSubmit(e);
    }
  };

  return (
    <div className='chat-container-main'>
    <div className="chat-container">
      <div className="chat-header">Chat BCH</div>
      <div className="chat-body">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`message ${message.sender || 'unknown'}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            {message.text}
          </motion.div>
        ))}
        <div ref={chatEndRef} />
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
    </div>
  );
};

export default Chatbot;