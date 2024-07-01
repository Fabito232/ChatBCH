import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, where, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Login.css';

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Consultar si existe algún usuario con el correo electrónico ingresado
      const usersRef = collection(db, 'usuarios');
      const q = query(usersRef, where('email', '==', userData.username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Si existe al menos un usuario con ese correo, avanzar
        navigate('/chatbot');
      } else {
        // Si no existe un usuario con ese correo, mostrar un mensaje de error
        alert('El correo electrónico ingresado no existe. Por favor, regístrate primero.');
      }
    } catch (error) {
      console.error('Error al procesar el inicio de sesión:', error);
      alert('Error al procesar el inicio de sesión. Por favor, intenta nuevamente más tarde.');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-custom-blue-sky">
      <div className="relative z-10 bg-custom-dark bg-opacity-95 rounded-3xl p-8 shadow-lg w-auto md:w-96">
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 bg-cover rounded-full bg-logo"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name='username'
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Dirección de correo electrónico"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name='password'
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Contraseña"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 bg-ff9376 rounded-md text-white hover:bg-f6d586 focus:bg-e9ae8c focus:outline-none">Iniciar sesión</button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-white">¿No tienes una cuenta? <a href="register" className="text-ff9376 hover-underline">Regístrate</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;