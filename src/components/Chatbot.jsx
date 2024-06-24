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
    if (pregunta1(message)) {
      return;
    } else if (pregunta2(message)){
      return;
    } else if (pregunta3(message)){
      return;
    } else if (pregunta4(message)){
      return;
    } else if (pregunta5(message)){
      return;
    } else if (pregunta6(message)){
      return;
    } else if (pregunta7(message)){
      return;
    } else if (pregunta8(message)){
      return;
    } else if (pregunta9(message)){
      return;
    } else if (pregunta10(message)){
      return;
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

  // 1. ¿Cuántas personas murieron en la semana “m” en el país “X” por el COVID 19?
  const pregunta1 = (message) =>{
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
      return true;
    }else{
      return false;
    }
  }

  // 2. ¿Cuántas personas murieron en total en todas las semanas del país “X”?
  const pregunta2 = (message) =>{
    const regex = /en total en todas las semanas del país ([\w\s]+)/i;
    const match = message.match(regex);
    
    if (match) {
      const country = match[1].trim();
        let totalMuertes = 0;
    
        for (const semana in data) {
            if (data[semana][country]) {
                totalMuertes += data[semana][country];
            }
        }
      
      let botResponseText;
      if (totalMuertes) {
        botResponseText = `En total murieron ${totalMuertes} personas en todas las semanas del país ${country}`;
      } else {
        botResponseText = 'No se encontraron datos para la semana o el país especificado.';
      }
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 2000);
      return true;
    } else {
      return false;
    }
  }

  // 3. ¿Cuántas personas murieron en total en el 2023?
  const pregunta3 = (message) =>{
    const regex = /personas murieron en total en el (\d+)/i;
    const match = message.match(regex);
    
    if (match) {
      const anno = match[1].trim();
      console.log('ano: ',anno)
      let totalMuertes = 0;
      for (const semana in data) {
          for (const pais in data[semana]) {
              totalMuertes += data[semana][pais];
          }
      }

      let botResponseText;
      if (totalMuertes && anno === "2023") {
        botResponseText = `En total murieron ${totalMuertes} personas en el 2023`;
      } else {
        botResponseText = 'No se encontraron datos para el año especificado';
      }
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 2000);
      return true
    } else {
      return false;
    }
  }

  // 4. ¿Cuántas personas murieron en total en todas las semanas de los países “A”, “B” y “C”
  const pregunta4 = (message) => {
    const regex = /en total en todas las semanas de los países (.+?)(?: y ([\w\sáéíóúüñ]+))?$/i;
    const match = message.match(regex);
    
    if (match) {
      const country = match[1].split(',').map(pais => pais.trim());
      if (match[2]) {
        country.push(match[2].trim());
      }
      console.log(country)
      const allCountryExist = country.every(pais => {
        for (const semana in data) {
          if (data[semana][pais]) {
            return true;
          }
        }
        return false;
      });
  
      let botResponseText;
      if (!allCountryExist) {
        botResponseText = 'No se encontraron datos para uno o más de los países especificados.';
      } else {
          let totalMuertes = 0;
          for (const semana in data) {
            for (const pais of country) {
              if (data[semana][pais]) {
                totalMuertes += data[semana][pais];
              }
            }
          }
        
        if (totalMuertes) {
          const ultimoPais = country.pop();
          botResponseText = `En total murieron ${totalMuertes} personas en todas las semanas de los países ${country.join(', ')} y ${ultimoPais}`;
        } else {
          botResponseText = 'No se encontraron datos para los países especificados.';
        }
      }
  
      setTimeout(() => {
        const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 2000);
  
      return true;
    } else {
      return false;
    }
  };

  // 5. ¿Cuál fue la semana en la que murieron más personas en el país “X”?
  const pregunta5 = (message) => {
    const regex = /la semana en la que murieron más personas en el país ([\w\s]+)/i;
    const match = message.match(regex);

    if (match) {
        const pais = match[1].trim();
        let maxMuertes = 0;
        let semanaMax = '';

        for (const semana in data) {
            if (data[semana][pais] && data[semana][pais] > maxMuertes) {
                maxMuertes = data[semana][pais];
                semanaMax = semana;
            }
        }

        let botResponseText;
        if (maxMuertes > 0) {
            botResponseText = `La semana en la que murieron más personas en ${pais} fue ${semanaMax}, con ${maxMuertes} muertes.`;
        } else {
            botResponseText = `No se encontraron datos de muertes para ${pais}.`;
        }

        setTimeout(() => {
            const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, botResponse]);
        }, 2000);

        return true;
    } else {
        return false;
    }
};


// 6. ¿En qué país hubo “n” muertes en una semana?
const pregunta6 = (message) => {
  const regex = /en qué país hubo (\d+) muertes en una semana\?/i;
  const match = message.match(regex);
  
  if (match) {
    const muertes = parseInt(match[1], 10);
    const paisesConMuertes = new Set();  // Usamos un Set para evitar duplicados

    for (const semana in data) {
      for (const pais in data[semana]) {
        if (data[semana][pais] === muertes) {
          paisesConMuertes.add(pais);
        }
      }
    }

    let botResponseText;
    if (paisesConMuertes.size > 0) {
      botResponseText = `En los siguientes países hubo exactamente ${muertes} muertes: ${[...paisesConMuertes].join(', ')}`;
    } else {
      botResponseText = `No se encontraron países con exactamente ${muertes} muertes.`;
    }

    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 2000);

    return true;
  } else {
    return false;
  }
};

// 7. ¿Cuántas personas murieron en total de la semana “A” a la semana “B”?
const pregunta7 = (message) => {
  const regex = /murieron en total de la semana (\d+) a la semana (\d+)/i;
  const match = message.match(regex);

  if (match) {
      const semanaInicial = parseInt(match[1]);
      const semanaFinal = parseInt(match[2]);

      let totalMuertes = 0;

      for (let semana = semanaInicial; semana <= semanaFinal; semana++) {
          const semanaKey = `semana ${semana}`;
          for (const pais in data[semanaKey]) {
              totalMuertes += data[semanaKey][pais];
          }
      }

      let botResponseText;
      if (totalMuertes > 0) {
          botResponseText = `En total murieron ${totalMuertes} personas de la semana ${semanaInicial} a la semana ${semanaFinal}.`;
      } else {
          botResponseText = `No se encontraron datos para las semanas especificadas.`;
      }

      setTimeout(() => {
          const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 2000);

      return true;
  } else {
      return false;
  }
};

// 8. ¿Cuántas personas murieron en total en el país “X” de la semana “A” a la semana “B”?
const pregunta8 = (message) => {
  const regex = /murieron en total en el país ([\w\s]+) de la semana (\d+) a la semana (\d+)/i;
  const match = message.match(regex);

  if (match) {
      const pais = match[1].trim();
      const semanaInicial = parseInt(match[2]);
      const semanaFinal = parseInt(match[3]);

      let totalMuertes = 0;

      for (let semana = semanaInicial; semana <= semanaFinal; semana++) {
          const semanaKey = `semana ${semana}`;
          if (data[semanaKey][pais]) {
              totalMuertes += data[semanaKey][pais];
          }
      }

      let botResponseText;
      if (totalMuertes > 0) {
          botResponseText = `En total murieron ${totalMuertes} personas en ${pais} de la semana ${semanaInicial} a la semana ${semanaFinal}.`;
      } else {
          botResponseText = `No se encontraron datos para las semanas o el país especificado.`;
      }

      setTimeout(() => {
          const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
          setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 2000);

      return true;
  } else {
      return false;
  }
};

// 9. ¿Cuál fue la semana en la que menos personas murieron en el país “X”?
const pregunta9 = (message) => {
  const regex = /cuál fue la semana en la que menos personas murieron en el país (.+?)\?/i;
  const match = message.match(regex);

  if (match) {
    const pais = match[1].trim();
    let minMuertes = 0;
    let semanaMinMuertes = null;

    for (const semana in data) {
      if (data[semana][pais] !== undefined && data[semana][pais] < minMuertes) {
        minMuertes = data[semana][pais];
        semanaMinMuertes = semana;
      }
    }

    let botResponseText;
    if (semanaMinMuertes !== null) {
      botResponseText = `La semana en la que menos personas murieron en ${pais} fue la semana ${semanaMinMuertes} con ${minMuertes} muertes.`;
    } else {
      botResponseText = `No se encontraron datos para el país especificado: ${pais}.`;
    }

    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 2000);

    return true;
  } else {
    return false;
  }
};


//10. ¿Cuál fue el país con más muertes en el 2023?
const pregunta10 = (message) => {
  const regex = /cuál fue el país con más muertes en el (\d+)\?/i;
  const match = message.match(regex);
  const anno = match[1];
  if (match) {
    let totalMuertesPorPais = {};

    for (const semana in data) {
      for (const pais in data[semana]) {
        if (!totalMuertesPorPais[pais]) {
          totalMuertesPorPais[pais] = 0;
        }
        totalMuertesPorPais[pais] += data[semana][pais];
      }
    }

    let maxMuertes = -1;
    let paisMaxMuertes = null;

    for (const pais in totalMuertesPorPais) {
      if (totalMuertesPorPais[pais] > maxMuertes) {
        maxMuertes = totalMuertesPorPais[pais];
        paisMaxMuertes = pais;
      }
    }

    let botResponseText;
    if (paisMaxMuertes !== null && anno === "2023") {
      botResponseText = `El país con más muertes en el 2023 fue ${paisMaxMuertes} con ${maxMuertes} muertes.`;
    } else {
      botResponseText = `No se encontraron datos suficientes para determinar el país con más muertes en el año especificado.`;
    }

    setTimeout(() => {
      const botResponse = { id: messages.length + 2, text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 2000);

    return true;
  } else {
    return false;
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

// 1. ¿Cuántas personas murieron en la semana “m” en el país “X” por el COVID 19? = True
// 2. ¿Cuántas personas murieron en total en todas las semanas del país “X”?
// 3. ¿Cuántas personas murieron en total en el 2023?
// 4. ¿Cuántas personas murieron en total en todas las semanas de los países 
// de “A”, “B” y “C”?
// 5. ¿Cuál fue la semana en la que murieron más personas en el país “X”?
// 6. ¿En qué país hubo “n” muertes en una semana?
// 7. ¿Cuántas personas murieron en total de la semana “A” a la semana “B”?
// 8. ¿Cuántas personas murieron en total en el país “X” de la semana “A” a la 
// semana “B”?
// 9. ¿Cuál fue la semana en la que menos personas murieron en el país “X”?
//10. ¿Cuál fue el país con más muertes en el 2023?
