import React from 'react';
import Nav from './Nav';
import { Routes, Route } from 'react-router-dom';
import Contacto from '../Paginas/Contacto.jsx';
import Body from './Body.jsx';
import ProductosDetalle from '../Paginas/Productos.jsx';
import Carrito from '../Paginas/carrito.jsx';
import Productos from './Gallery.jsx';

export default function Header() {
  return (
    <header >
      <h1 id ="encabezado">
        
      
       Mi Tienda OnLine -Con React
      </h1>
      <Nav />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/Carrito" element={<Carrito />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/Productos/:id" element={<ProductosDetalle />} />
      </Routes>
    </header>
  );
}