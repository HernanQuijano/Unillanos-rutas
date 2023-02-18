import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import LoginForm from './Components/login'
import Contactenos from './Components/contactenos'
import {BrowserRouter, Route, Routes, Link, createBrowserRouter, RouterProvider} from "react-router-dom";

if(!navigator.geolocation){
  alert('Tu navegador no tiene opción de Geolocalización');
  throw new Error('Tu navegador no tiene opción de Geolocalización')
}

const router = createBrowserRouter([
  {
    path: "/",
    element:<App />
  },
  {
    path: "/contactenos",
    element:<Contactenos />
  },
  {
    path: "/admin",
    element:<LoginForm />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

