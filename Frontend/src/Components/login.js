import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import '../styles/App.css';
import BASE_URL from '../constants/constants';
import logo_unillanos from "../images/Logo_Unillanos.png";
import axios from 'axios';

const LoginForm = () => {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/admin', { data:{
        usuario:'usuario',
        contraseña:'contraseña' }});
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      setError('');
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      setError('Usuario o contraseña inválido.');
    }
  };

  if (loggedIn) {
    navigate(`${BASE_URL}/admin`);
  }

  return (
  <>
  <Link to="/">Regresar</Link>
  <div className="form-signin w-100 m-auto" id="login">
    <form className="form-signin" onSubmit={handleLogin}>
    <h2>RUTAS</h2>
    <img className="mb-4" src={logo_unillanos} alt="" width="250" height="57" />
    <h1 className="h3 mb-3 fw-normal">Iniciar Sesión</h1>
      <div className="form-floating">
        <label htmlFor="usuario">Usuario:</label>
        <input className="form-control" placeholder="Usuario Admin" type="text" id="usuario" value={usuario} onChange={(event) => setUsuario(event.target.value)} required />
      </div>
      <div className="form-floating">
        <label for="floatingPassword" htmlFor="contraseña">Contraseña:</label>
        <input className="form-control" placeholder="Password" type="password" id="contraseña" value={contraseña} onChange={(event) => setContraseña(event.target.value)} required />
      </div>
      <div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar sesión</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  </div>
  </>
  );
};

export default LoginForm;
