import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MostrarInformacion from './components/MostrarInformacion';
import Chatbot from './components/Chatbot';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/mostrarInfo" element={<Register/>}/>
        <Route path="/chatbot" element={<Register/>}/>
      </Routes>
    </Router>
  )
}
