import { useState } from 'react'
import './App.css'
import Footer from './Components/footer.jsx'
import Header from './Components/Header.jsx'
import {Routes, Route} from 'react-router-dom'
import Carrito from './Paginas/carrito.jsx'

import Body from './Components/Body.jsx'
import Nav from './Components/Nav.jsx'
import ProductosDetalle from './Paginas/Productos.jsx'
import Compras from './Paginas/Compras.jsx'
import Ingresar from './Paginas/ingresar.jsx'
import Gallery from './Components/Gallery.jsx'
import Admin from './Paginas/Admin.jsx'
import RutaProtegida from './Components/RutaProtegida'

function App() {
  return (
    <>
     <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Body />} />  
        <Route path="/Productos" element={<Gallery />} />
        <Route path="/Productos/:id" element={<ProductosDetalle/>} /> 
        
        <Route path="/ingresar" element={<Ingresar />} />
        
        {/* Rutas protegidas - requieren autenticación */}
        <Route 
          path="/Compras" 
          element={
            <RutaProtegida>
              <Compras />
            </RutaProtegida>
          } 
        />
        
        <Route 
          path="/admin" 
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          } 
        />
      </Routes>
     <Footer />
    </>
  )
}

export default App