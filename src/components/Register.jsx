import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
   //Logica
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
          <button type="submit" className="w-full px-4 py-2 bg-custom-blue-light rounded-md text-white hover:bg- focus:outline-none focus:bg-blue-400">Registrarse</button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-white">¿Ya tienes una cuenta? <a href="/" className="text-custom-blue-light hover:underline">Inicia sesión</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;