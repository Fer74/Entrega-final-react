import React from 'react';
import { useState } from 'react';
import Gallery from './Gallery.jsx';
import Carrito from '../Paginas/carrito.jsx';
import GalleryDetalle from '../Paginas/Productos.jsx';

export default function Body() {

  return (
    <main>
      <h2 id="encabezado">Bienvenidos </h2>
      <Gallery />
      
     
    </main>
  );
}
