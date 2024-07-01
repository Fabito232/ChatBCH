import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, where, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Register.css';
const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar si ya existe un usuario con el mismo username
      const usuariosRef = collection(db, 'usuarios');
      const usuarioQuery = query(usuariosRef, where('username', '==', userData.username));
      const querySnapshot = await getDocs(usuarioQuery);

      if (!querySnapshot.empty) {
        alert('Ya existe un usuario con ese nombre de usuario.');
        return;
      }

      // Guardar usuario en Firestore
      const newUser = {
        userName: userData.username,
        email: userData.email,
        password: userData.password // Aquí se guarda la contraseña hasheada
      };

      const docRef = await addDoc(usuariosRef, newUser);

      // Redirigir a la página deseada después del registro exitoso
      navigate('/chatbot');
    } catch (error) {
      console.error('Error al procesar el registro: ', error);
      alert('Hubo un error al procesar el registro. Por favor, inténtalo de nuevo.');
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
    <div className="relative min-h-screen flex items-center justify-center bg-custom-blue-sky bg-opacity-80 bg-cover">
      <div className="relative z-10 bg-custom-dark bg-opacity-90 rounded-3xl p-8 shadow-lg w-auto md:w-96">
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 bg-cover rounded-full bg-logo"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Usuario"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Correo Electrónico"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Contraseña"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Confirmar Contraseña"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 bg-ff9376 rounded-md text-white hover:bg-f6d586 focus:outline-none focus:bg-e9ae8c">Registrarse</button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-white">¿Ya tienes una cuenta? <a href="/" className="text-ff9376 hover-underline">Inicia sesión</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;