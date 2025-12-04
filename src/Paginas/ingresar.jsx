import React, { useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { useAuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Ingresar() {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const [recordar, setRecordar] = useState(false);
  
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const usuarioLogueado = login(usuario, contrasenia);
    
    if (usuarioLogueado) {
      console.log('Login exitoso!');
      
      // Obtener la ruta previa si existe
      const rutaPrevia = localStorage.getItem('rutaPrevia');
      localStorage.removeItem('rutaPrevia');
      
      if (usuarioLogueado.rol === 'admin') {
        navigate('/admin');
      } else if (rutaPrevia && rutaPrevia !== '/ingresar') {
        // Si había una ruta guardada, ir ahí
        navigate(rutaPrevia);
      } else {
        // Si no, ir a productos
        navigate('/Productos');
      }
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card style={{ width: '400px' }} className="shadow p-4">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        
        <Alert variant="info" className="mb-3">
          <small>Debes iniciar sesión para completar tu compra</small>
        </Alert>
        
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label">Nombre de usuario</label>
            <input 
              type="text" 
              className="form-control" 
              id="inputUsername" 
              placeholder="Ingresa tu nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <small className="form-text text-muted">
              admin (gestión) | maria (catálogo)
            </small>
          </div>
          
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              id="inputPassword"
              placeholder="Ingresa tu contraseña"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
            />
            <small className="form-text text-muted">
              Contraseña: 1234
            </small>
          </div>
          
          <div className="mb-3 form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="rememberCheck"
              checked={recordar}
              onChange={(e) => setRecordar(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberCheck">
              Recordarme
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary w-100">
            Ingresar
          </button>
        </form>
      </Card>
    </Container>
  );
}

export default Ingresar;